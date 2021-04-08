import readingTime from 'reading-time';
import StoryblokClient from 'storyblok-js-client';

const defaultLocale = "en"

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN
})

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch('https://gapi.storyblok.com/v1/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Token: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
      Version: preview || process.env.NODE_ENV === 'development' ? 'draft' : 'published',
    },
    body: JSON.stringify({
      query,
      variables
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPages({ locales }) {
  const blogPages = ['blog/', 'blog/article']
  const data = await fetchAPI(`
    query getPages {
      PageItems {
        items {
          full_slug
        }
      }
    }
  `)
  const story = await data.PageItems
  const pages = story.items.filter(page => !blogPages.includes(page.full_slug)).flatMap(page => {
    const path = page.full_slug === 'home' ? [] : [page.full_slug]
    return locales.map(locale => ({
      locale,
      path
    }))
  })
  return pages
}

export async function getBlogPages({ locales }) {
  const data = await fetchAPI(`
    query getBlogPages {
      ArticleItems {
        items {
          full_slug
        }
      }
      CategoryItems {
        items {
          full_slug
        }
      }
    }
  `)
  const articles = await data.ArticleItems.items
  const articlePages = articles.flatMap(article => {
    const slug = article.full_slug.replace("blog/articles/", "")
    return locales.map(locale => ({
      locale,
      slug
    }))
  })
  const categories = await data.CategoryItems.items
  const categoryPages = categories.flatMap(page => {
    const slug = page.full_slug.replace("categories/", "")
    return locales.map(locale => ({
      locale,
      slug
    }))
  })
  return [...articlePages, ...categoryPages]
}

export async function getPageData(slugArray, { locale, preview }) {
  let slug = slugArray ? slugArray.join("/") : 'home'
  let blogSlug
  if(slugArray?.[1] === 'article-category') {
    slug = 'blog/article'
    blogSlug = slugArray[2]
  }

  let article
  let category
  if(blogSlug) {
    article = await getArticle(blogSlug, {
      locale,
      preview
    })
    if(!article) {
      category = await getCategory(blogSlug, {
        locale,
        preview
      })
      slug = 'blog'
    }
  }
  
  const data = await fetchAPI(`
    query getPageData($slug: ID!) {
      PageItem(id: $slug) {
        id
        slug
        content {
          _uid
          metadata
          body
          navItemsInitialColorLight
          navItemsInitialColorDark
          logoInitialColorLight
          logoInitialColorDark
          headerInitialBackgroundLight
          headerInitialBackgroundDark
          headerLayout
          footerLayout
        }
      }
    }
  `,
  {
    preview,
    variables: {
      slug: locale === defaultLocale ? slug : `${locale}/${slug}`
    }
  })
  const story = data.PageItem
  if(story) {
    if(article) {
      story.content.metadata = article.content.metadata
    }
    story.content.body = await Promise.all(story.content.body.map(async blok => {
      if(blok.component === 'articles') {
        blok.customSelection = await getArticles({ 
          locale, 
          preview, 
          byUuids: blok.customSelection.join(",") ,
          filter: {
            category: {
              in: category?.uuid
            }
          }
        })
        if(blok.categoriesFilter) {
          blok.categories = await getCategories({ locale, preview })
        }
      }
      if(blok.component === 'articleBody') {
        blok.article = article
      }
      if(blok.component === 'featuredArticle') {
        const data = await getArticles({ locale, preview, byUuids: blok.article })
        blok.article = data.items?.[0] || null
      }
      return blok
    }))
  }
  return {
    story
  }
}

export async function getGlobalData({ locale, preview }) {
  const data = await fetchAPI(`
    query getGlobalData($id: ID!) {
      GlobalItem(id: $id) {
        content {
          _uid
          header
          footer
        }
      }
    }
  `,
  {
    preview,
    variables: {
      id: locale === defaultLocale ? 'global' : `${locale}/global`
    }
  })
  const story = data.GlobalItem
  return {
    header: story.content.header[0],
    footer: story.content.footer[0]
  }
}

export async function getArticle(slug, { locale, preview }) {
  const data = await fetchAPI(`
    query getArticle($slug: ID!, $locale: String) {
      ArticleItem(
        id: $slug
      ) {
        slug
        created_at
        published_at
        content {
          locales
          metadata
          title
          description
          coverImage {
            alt
            filename
          }
          content
          category(language: $locale) {
            slug
            content
          }
          author(language: $locale) {
            content
          }
        }
      }
    }
  `,
  {
    preview,
    variables: {
      locale,
      slug: locale === defaultLocale ? `blog/articles/${slug}` : `${locale}/blog/articles/${slug}`
    }
  })
  const story = data.ArticleItem
  if(story) {
    story.publishedDate = story.published_at || story.created_at
    story.content.minReading = Math.ceil(readingTime(Storyblok.richTextResolver.render(story.content.content)).minutes)
  }
  return story
}

export async function getArticles({ locale, preview, searchTerm=null, perPage=25, page=1, filter={}, byUuids }) {
  const data = await fetchAPI(`
    query getArticles(
      $locale: String
      $perPage: Int
      $page: Int
      $searchTerm: String
      $filter: ArticleFilterQuery
      $byUuids: String
    ) {
      ArticleItems(
        starts_with: $locale
        sort_by: "published_at:desc"
        search_term: $searchTerm
        per_page: $perPage
        page: $page
        filter_query_v2: $filter
        by_uuids_ordered: $byUuids
      ) {
        total
        items {
          slug
          created_at
          published_at
          content {
            title
            description
            coverImage {
              alt
              filename
            }
            category(language: $locale) {
              slug
              content
            }
            content
          }
        }
      }
    }
  `,
  {
    preview,
    variables: {
      searchTerm,
      filter: {
        ...filter,
        locales: {
          in_array: [locale]
        }
      },
      perPage,
      page,
      byUuids
    }
  })
  const story = data.ArticleItems
  if (story) {
    story.items.map(article => {
      article.publishedDate = article.published_at || article.created_at
      article.content.minReading = Math.ceil(readingTime(Storyblok.richTextResolver.render(article.content.content)).minutes)
    })
  }
  return story
}

async function getCategory(slug, { locale, preview }) {
  const data = await fetchAPI(`
    query getCategory(
      $slug: ID!
    ) {
      CategoryItem(
        id: $slug
      ) {
        uuid
        slug
        content {
          title
        }
      }
    }
  `,
  {
    preview,
    variables: {
      slug: locale === defaultLocale ? `categories/${slug}` : `${locale}/categories/${slug}`
    }
  })
  const category = data.CategoryItem
  return category
}

async function getCategories({ locale, preview }) {
  const data = await fetchAPI(`
    query getCategories($locale: String) {
      CategoryItems(starts_with: $locale) {
        items {
          slug
          content {
            _uid
            title
          }
        }
      }
    }
  `,
  {
    preview,
    variables: {
      locale: locale === defaultLocale ? null : `${locale}/*`,
    }
  })
  const categories = data.CategoryItems.items
  return categories
}
import Header from './header';
import Footer from './footer';
import Seo from './seo';

export default function Layout({ 
  header, 
  footer, 
  metadata, 
  logoInitialColorLight,
  logoInitialColorDark,
  navItemsInitialColorLight,
  navItemsInitialColorDark,
  headerInitialBackgroundLight, 
  headerInitialBackgroundDark, 
  headerLayout, 
  footerLayout, 
  children 
}) {

  return (
    <>
      <Seo metadata={metadata} />
      <Header
        layout={headerLayout}
        logoInitialColor={{
          light: eval('({' + logoInitialColorLight + '})'),
          dark: eval('({' + logoInitialColorDark + '})')
        }}
        initialBackground={{
          light: eval('({' + headerInitialBackgroundLight + '})'),
          dark: eval('({' + headerInitialBackgroundDark + '})')
        }}
        navItemsInitialColor={{
          light: eval('({' + navItemsInitialColorLight + '})'),
          dark: eval('({' + navItemsInitialColorDark + '})')
        }}
        {...header} 
      />
      <main>
        {children}
      </main>
      <Footer layout={footerLayout} {...footer} />
    </>
  )
}
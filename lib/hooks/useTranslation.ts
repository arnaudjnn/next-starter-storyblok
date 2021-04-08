import { useRouter } from 'next/router';

export const useTranslation = () => {
  const { locale, locales, defaultLocale } = useRouter()
  const lang = locale.split("-")[0]
  const countryCode = locale.split("-")[1] || null;

  const t = require(`content/${lang}/common.json`)

  return { t, locale, locales, defaultLocale, lang, countryCode }
}
import { useRouter } from 'next/router';
import Select from 'components/common/select';

const LangSelect = ({ color="white" }) => {
  const router = useRouter()
  const { locales, locale } = router

  const options = locales.map(lng => ({
    value: lng, label: lng.toUpperCase()
  }))

  function handleChange(lng) {
    router.push(router.asPath, router.asPath, { locale: lng.value })
  }

  return (
    <Select
      isSearchable={false}
      onChange={handleChange}
      defaultValue={router.locale}
      placeholder={locale.toUpperCase()}
      menuPlacement="top"
      options={options}
      variant="link"
      color={color}
      width="80px"
    />
  )
}

export default LangSelect
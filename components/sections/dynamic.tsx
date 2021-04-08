import SbEditable from 'storyblok-react';
 
const DynamicComponent = ({ bloksIndex, blok }) => {
  const Component = bloksIndex[blok.component]

  if(!Component) {
    return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>)
  }

  return (
    <SbEditable content={blok}>
      <Component {...blok} />
    </SbEditable>
  )
}
 
export default DynamicComponent
import './style.css'
const GlitchTitle = ( {text, className} ) => <h1 className={'glitch ' + className} data-text={text}> {text} </h1>
export {GlitchTitle}

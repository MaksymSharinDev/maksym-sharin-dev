import './style.css'
const GlitchTitle =
    ( {text, className = ''} ) =>
        <p className={ 'glitch ' + className}
            data-text={text}>
            {text}
        </p>
export {GlitchTitle}

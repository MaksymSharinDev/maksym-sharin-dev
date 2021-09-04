import './style.css'
import React, {createRef} from "react";
import GlitchyCanvas from "../GlitchyCanvas";

class HackishHud extends React.Component {
    state = { width: 0, height: 0}
    cardRef = createRef()
    componentDidMount = () => {

        class Loop {
            constructor() {
                this._idRAF = -1;
                this._count = 0;
                this._listeners = [];
                this._binds = {};
                this._binds.update = this._update.bind(this);
            }

            _update() {
                let listener = null;
                let i = this._count;
                while (--i >= 0) {
                    listener = this._listeners[i];
                    if (listener) {
                        listener.apply(this, null);
                    }
                }
                this._idRAF = requestAnimationFrame(this._binds.update);
            }

            start() {
                //naming
                this._update();
            }

            stop() {
                cancelAnimationFrame(this._idRAF);
            }

            add(listener) {
                const idx = this._listeners.indexOf(listener);
                if (idx >= 0) {
                    return;
                }
                this._listeners.push(listener);
                this._count++;
            }

            remove(listener) {
                const idx = this._listeners.indexOf(listener);
                if (idx < 0) {
                    return;
                }
                this._listeners.splice(idx, 1);
                this._count--;
            }
        }

        const loop = new Loop();
        loop.start()

        class LetterShuffler {
            constructor(wrapper, letter) {
                this.SHUFFLING_VALUES = [
                    '!', '§', '$', '%',
                    '&', '/', '(', ')',
                    '=', '?', '_', '<',
                    '>', '^', '°', '*',
                    '#', '-', ':', ';', '~',
                ];
                this.id = Math.random()
                this.animate = false;

                this.wrapper = wrapper;
                this.letter = letter;
                this.letterToShown = this.letter;
                this.wrapper.innerHTML = '';
                this.timer = 0;
                this.duration = 45;
                this.scaleTargeted = 2;

                this.show = this.show.bind(this);
                this.update = this.update.bind(this);



                if (/[+\-| ]/.test(letter)) {
                    this.wrapper.classList.add('purple')
                } else {
                    this.duration *= 2.1;
                }
            }

            show(letter = this.letter) {
                this.animate = true;
                this.timer = 0;
                this.letterToShown = letter;
                loop.add(this.update)
            }

            hide() {
                this.show('')
            }

            update() {
                if (this.animate) {
                    this.timer++;
                    if (this.timer < this.duration) {
                        this.wrapper.innerHTML = this.SHUFFLING_VALUES[Math.floor(Math.random() * this.SHUFFLING_VALUES.length)];
                        this.wrapper.style.transform = `scale(${(this.timer / this.duration) * 0.9})`
                    } else {
                        this.wrapper.innerHTML = this.letterToShown;
                        loop.remove(this.update)
                    }
                }
            }
        }

        class WordShuffler {
            constructor(wrapper, words, {duration = 0.3} = {}) {
                this.wrapper = wrapper;
                this.wrapper.innerHTML = '';

                this.timer = 0;
                this.lettersShown = 0;
                this.letterDuration = duration * 60;
                this.lettersShuffler = [];
                this.arrayOfLetters = [...words];
                this.duration = this.letterDuration * this.arrayOfLetters.length;

                this.arrayOfLetters.forEach((letter) => {
                    const letterWrapper = document.createElement('span');
                    this.wrapper.appendChild(letterWrapper);
                    const letterShuffler = new LetterShuffler(letterWrapper, letter, {
                        duration: this.letterDuration,
                    });
                    this.lettersShuffler.push(letterShuffler);
                });

                this.update = this.update.bind(this);
                this.timer = 0;
            }

            show() {
                this.timer = 0;
                this.lettersShown = 0;
                loop.add(this.update);
            }

            update() {
                this.timer += 1;
                if (this.timer > (this.letterDuration * this.lettersShown)) {
                    this.lettersShuffler[this.lettersShown].show();
                    this.lettersShown += 1
                }

                if (this.timer >= this.duration) {
                    loop.remove(this.update)
                }
            }
        }

        class TextShuffler {
            constructor(wrapper, lines) {
                this.i = 0;
                this.lines = [];
                this.durationInterval = 75;
                this.wrapper = wrapper;
                for (let i = 0; i < lines.length; i++) {
                    this.lines.push(this._addLine(lines[i]));
                }
            }

            _addLine(line) {
                const lineElm = document.createElement('p')
                this.wrapper.appendChild(lineElm)
                return new WordShuffler(lineElm, line, {duration: 0.05});
            }

            show() {
                if ( this.i !== undefined){
                    this.i = 0;
                    const interval = setInterval(() => {
                        if ( this.lines[this.i] !== undefined ){
                            this.lines[this.i].show();
                            this.i += 1;

                            if (this.i === this.lines.length) {
                                clearInterval(interval)
                            }
                        }
                    }, this.durationInterval);
                }
            }

            hide() {

            }
        }
        // 18 x 22 =
        const WORDS18x22 = [
            '+  -            -  +',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '|                  |',
            '|                  |',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '+  -            -  +',
        ];

        const WORDS9x11 = [
            '+  -   -  +',
            '           ',
            '           ',
            '           ',
            '           ',
            '|         |',
            '           ',
            '           ',
            '           ',
            '           ',
            '+  -   -  +',
        ];


        const wrapper = this.cardRef.current
        let WORDS
        switch (this.props.size ){
            case 'md': WORDS = WORDS18x22; break;
            case 'sm': WORDS = WORDS9x11; break;
            default: WORDS = WORDS18x22;
        }

        const text = new TextShuffler(wrapper, WORDS)

        text.show()
        setInterval(() => {
            text.show();
        }, 5000);

        this.setState({...this.state,
            width:  this.cardRef.current.clientWidth,
            height: this.cardRef.current.clientHeight
        })
    }
    render = () =>
        <>
            <div className={'hudWrapper'}>
                { this.cardRef.current &&
                    <GlitchyCanvas
                        width={this.state.width}
                        height={this.state.height}/>
                }
                <div className={'hudCard'} ref={this.cardRef}/>

                <div className={'hud-text'}>

                            <p className={'text-center '}>
                                <br/><br/>
                                <span>
                                    {`Javascript Developer `}
                                </span>
                                <br/><a href={'https://www.linkedin.com/in/maksym-sharin/'}> <span>{'-- > Linkedin < --'}</span> </a>
                                <br/><a href={'https://github.com/MaksymSharinDev'}> <span>{'-- >  Github  < --'}</span> </a>
                            </p>

                </div>
            </div>

        </>


}

export default HackishHud

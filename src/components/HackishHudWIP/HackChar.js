import React from "react";

//TODO: wrapper logic is rendered span logic


class HackChar extends React.Component {

    state = {
        id: Math.random(),
        letter: '',
        letterToShown: '',

        animate: false,
        SHUFFLING_VALUES: [
            '!', '§', '$', '%',
            '&', '/', '(', ')',
            '=', '?', '_', '<',
            '>', '^', '°', '*',
            '#', '-', ':', ';', '~',
        ],

    }

    componentDidMount() {
        const loop = this.props.loop

        const letter = this.props.letter;
        const letterToShown = this.letter;

        let timer = 0;
        let duration = 30;

        const isBorder = /[+\-| ]/.test(this.props);
        if (isBorder) duration *= 2.1

        let state = {
            ...this.state,
            loop, letter, letterToShown, duration, timer, isBorder,
        }
        this.setState(state)
        this.props.showHandler(this.show)

    }

    show = (letter = this.state.letter) => {
        let animate = true;
        let timer = 0;
        let letterToShown = letter;

        const state = {animate, timer, letterToShown}
        this.setState(state)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let update = () => {
            if (this.state.animate) {
                const timer = this.state.timer + 1
                if (timer < this.state.duration) {
                    const pickRandomChar = () => Math.floor(Math.random() * this.state.SHUFFLING_VALUES.length)
                    this.setState({
                        ...this.state, timer,
                        letterToShown: this.state.SHUFFLING_VALUES[pickRandomChar()],
                        styleTransformFormula: `scale(${(this.timer / this.duration) * 0.9})`
                    })
                }
            }
        }

        const isAnimating = this.state.animate !== prevState.animate
        if (isAnimating) this.state.loop.add(update)

        const isTiming = this.state.timer !== prevState.timer
        const isAnimationTimeOut = this.state.timer + 1 > this.state.duration
        if (isTiming && isAnimationTimeOut) {
            this.state.loop.remove(update)
        }
    }

    hide = () => {
        this.show('')
    }



    render = () =>
        <span
            className={this.isBorder ? 'purple' : ''}
            style={{transform: this.state.styleTransformFormula}}>
            {this.state.letterToShown || ''}
        </span>
}

export default HackChar

//LetterShuffler is a class initialized in higher order class WordShuffler
//


//Refactor from:
/*
 class LetterShuffler {
    constructor(wrapper, letter, {duration = 30} = {}) {
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
        this.duration = 30;
        this.scaleTargeted = 2;

        this.show = this.show.bind(this);
        this.update = this.update.bind(this);


        // Regex Thank to @milesmanners !
        // https://codepen.io/milesmanners/
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
*/
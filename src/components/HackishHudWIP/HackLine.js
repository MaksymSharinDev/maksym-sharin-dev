import HackChar from "./HackChar";
import React, {createRef} from "react";


class HackLine extends React.Component {

    state = {
        letterDuration : this.props.duration * 60,
        charObjsArr : [],
        duration: null,
        timer: null,

    }

    componentDidMount(){
        let charObjsArr = []
        ;([...this.props.words]).forEach( letter => {
            charObjsArr.push({
                letter: letter,
                duration: this.state.letterDuration,
                show: f => f(),
                update: f => f(),
                ref: createRef()
            })
        });
        let duration = this.state.letterDuration * charObjsArr.length

        let state = {...this.state,
            duration, charObjsArr
        }
        this.setState(state)

        this.props.showHandler( this.show )
    }


    show = () => {
        let timer = 0;
        let lettersShown = 0;
        const state = { timer , lettersShown}
        this.setState( state )
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        let update = () => {
            let timer = this.state.timer + 1;
            if (timer < (this.letterDuration * this.state.lettersShown)) {
                this.state.charObjsArr[this.state.lettersShown].show();
                const lettersShown = this.state.lettersShown + 1
                this.setState( { ...this.state , lettersShown })
            }
        }

        const isTimerChanged = prevState.timer !== this.state.timer
        if (isTimerChanged) {
            const isTimerStart = prevState.timer === null
            if(isTimerStart) this.props.loop.add(update);

            const isTimerEnd = this.state.timer + 1 > this.state.duration
            if (isTimerEnd ) this.props.loop.remove(update)
        }
    }



    render = () =>
        <p>{
            this.state.charObjsArr.map(
                charObj =>
                    <HackChar
                        loop={this.props.loop}
                        letter={charObj.letter}
                        duration={charObj.duration}
                        showHandler={charObj.show}
                        updateHandler={charObj.update}
                    />
            )
        }
        </p>
}

export default HackLine
/*
 class WordShuffler {
            
        }
*/


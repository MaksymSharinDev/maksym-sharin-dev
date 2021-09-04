import './style.css'

import React, {createRef} from 'react'

class GlitchyCanvas extends React.Component {
    state = {}
    canvasRef = createRef()
    parentRef = createRef();
    w;m;c;C;W;H;r;
    diameter;
    a = () => {
        this.w = { innerWidth : this.props.width , innerHeight : this.props.height}
        this.m = Math;
        this.c = this.canvasRef.current
        this.c.style.background = 'black';
        this.C = this.c.getContext("2d");
    }
    b = () => {
        this.W = this.c.width = this.w.innerWidth;
        this.H = this.c.height = this.w.innerHeight;
        this.HW = this.W / 2;
        this.diameter = 20;
    };
    f = t => {
        t /= 3000;
        this.C.clearRect(0, 0, this.W, this.H);
        this.C.globalCompositeOperation = 'lighter';
        for (let k = 0; k < 3; k++) {
            if (k === 0) this.C.fillStyle = '#FF0000';
            if (k === 1) this.C.fillStyle = '#00FF00';
            if (k === 2) this.C.fillStyle = '#0000FF';
            for (let i = 0; i < this.H; i += this.diameter) {
                for (let j = 0; j < this.W / 2; j += this.diameter) {
                    let index = i * this.W + j;
                    this.C.globalAlpha = this.m.tan(index * index - t);
                    this.C.fillRect(
                        this.m.tan(i * j - this.m.sin(index + k / 100) + t) * j + this.HW - this.diameter / 2,
                        i,
                        this.m.tan(index + i / j + t + k / 100) / 2 * this.diameter / 2,
                        this.m.tan(index * index - t) * this.diameter / 2
                    );
                }
            }
        }
        this.r = requestAnimationFrame(this.f);
    };
    componentDidMount() {
        this.a();
        this.b();
        this.f();
    }

    render = () =>
        <div id={'glitchyCanvasWrapper'} ref={this.parentRef}>
            <canvas ref={this.canvasRef} />
        </div>
}


export default GlitchyCanvas
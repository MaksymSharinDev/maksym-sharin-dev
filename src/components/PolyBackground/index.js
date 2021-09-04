// noinspection DuplicatedCode
import React, {createRef} from 'react'
import './style.css'


class PolyBackground extends React.Component {

    refreshDuration = 10000;

    numPointsX;
    numPointsY;
    unitWidth;
    unitHeight;
    points;

    componentDidMount = () => {
        this.onLoad()
    }
    svgRef = createRef()

    onLoad() {
        let svg = this.svgRef.current

        let unitSize = (window.screen.width + window.screen.height) / 20;
        this.numPointsX = Math.ceil(window.screen.width / unitSize) + 1;
        this.numPointsY = Math.ceil(window.screen.height / unitSize) + 1;
        this.unitWidth = Math.ceil(window.screen.width / (this.numPointsX - 1));
        this.unitHeight = Math.ceil(window.screen.height / (this.numPointsY - 1));

        this.points = [];

        for (let y = 0; y < this.numPointsY; y++) {
            for (let x = 0; x < this.numPointsX; x++) {
                this.points.push({
                    x: this.unitWidth * x,
                    y: this.unitHeight * y,
                    originX: this.unitWidth * x,
                    originY: this.unitHeight * y
                });
            }
        }

        this.randomize();

        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].originX !== this.unitWidth * (this.numPointsX - 1) &&
                this.points[i].originY !== this.unitHeight * (this.numPointsY - 1)) {
                let topLeftX = this.points[i].x;
                let topLeftY = this.points[i].y;
                let topRightX = this.points[i + 1].x;
                let topRightY = this.points[i + 1].y;
                let bottomLeftX = this.points[i + this.numPointsX].x;
                let bottomLeftY = this.points[i + this.numPointsX].y;
                let bottomRightX = this.points[i + this.numPointsX + 1].x;
                let bottomRightY = this.points[i + this.numPointsX + 1].y;

                let rando = Math.floor(Math.random() * 2);

                for (let n = 0; n < 2; n++) {
                    let polygon = document.createElementNS(svg.namespaceURI, 'polygon');

                    if (rando === 0) {
                        if (n === 0) {
                            polygon.point1 = i;
                            polygon.point2 = i + this.numPointsX;
                            polygon.point3 = i + this.numPointsX + 1;
                            polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + bottomRightX + ',' + bottomRightY);
                        } else if (n === 1) {
                            polygon.point1 = i;
                            polygon.point2 = i + 1;
                            polygon.point3 = i + this.numPointsX + 1;
                            polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + topRightX + ',' + topRightY + ' ' + bottomRightX + ',' + bottomRightY);
                        }
                    } else if (rando === 1) {
                        if (n === 0) {
                            polygon.point1 = i;
                            polygon.point2 = i + this.numPointsX;
                            polygon.point3 = i + 1;
                            polygon.setAttribute('points', topLeftX + ',' + topLeftY + ' ' + bottomLeftX + ',' + bottomLeftY + ' ' + topRightX + ',' + topRightY);
                        } else if (n === 1) {
                            polygon.point1 = i + this.numPointsX;
                            polygon.point2 = i + 1;
                            polygon.point3 = i + this.numPointsX + 1;
                            polygon.setAttribute('points', bottomLeftX + ',' + bottomLeftY + ' ' + topRightX + ',' + topRightY + ' ' + bottomRightX + ',' + bottomRightY);
                        }
                    }
                    polygon.setAttribute('fill', 'rgba(0,0,0,' + (Math.random() / 3) + ')');
                    let animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    animate.setAttribute('fill', 'freeze');
                    animate.setAttribute('attributeName', 'points');
                    animate.setAttribute('dur', this.refreshDuration + 'ms');
                    animate.setAttribute('calcMode', 'linear');
                    polygon.appendChild(animate);
                    svg.appendChild(polygon);
                }
            }
        }

        this.refresh();
        //refreshInterval = setInterval(function() {refresh();}, refreshDuration);
    }

    randomize() {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].originX !== 0 && this.points[i].originX !== this.unitWidth * (this.numPointsX - 1)) {
                this.points[i].x = this.points[i].originX + Math.random() * this.unitWidth - this.unitWidth / 2;
            }
            if (this.points[i].originY !== 0 && this.points[i].originY !== this.unitHeight * (this.numPointsY - 1)) {
                this.points[i].y = this.points[i].originY + Math.random() * this.unitHeight - this.unitHeight / 2;
            }
        }
    }

    refresh() {
        this.randomize();
        for (let i = 0; i < document.querySelector('#bg svg').childNodes.length; i++) {
            let polygon = document.querySelector('#bg svg').childNodes[i];
            let animate = polygon.childNodes[0];
            if (animate.getAttribute('to')) {
                animate.setAttribute('from', animate.getAttribute('to'));
            }
            animate.setAttribute('to',
                this.points[polygon.point1].x + ','
                + this.points[polygon.point1].y + ' '
                + this.points[polygon.point2].x + ','
                + this.points[polygon.point2].y + ' '
                + this.points[polygon.point3].x + ','
                + this.points[polygon.point3].y)
            animate.beginElement();
        }

    }

    render = () =>
        <div id={'bg'} className={'background-polygons'}>
            <svg ref={this.svgRef}/>
        </div>
}


export default PolyBackground
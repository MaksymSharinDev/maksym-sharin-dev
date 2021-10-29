import './style.css'
import React, {Component} from "react";

import ReactCardCarousel from "react-card-carousel";

class CyberCardsCarousel extends Component {


    render() {
        return (

            <ReactCardCarousel

                style={{
                    position: 'absolute',
                    top: 0
                }}
                alignment='vertical'
                spread='wide'
                disable_box_shadow='true'>
                { this.props.items.map( ( item, i , array) =>
                    <div className={'cyber-card ' + (i===0 ? 'first':'') + (i===array.length-1 ? 'last':'') }
                         style={{width: '600px',}}>
                        <div className={'d-flex align-content-center align-items-center'}
                             style={{fontSize:'20px',
                                width: '100%',
                                 height: '100%'
                             }}>
                           <p className={'m-auto'}>Work In Progress...</p>
                        </div>
                    </div>
                )

                }
            </ReactCardCarousel>
        );
    }
}
//dataArray
export default CyberCardsCarousel
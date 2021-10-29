import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import PolyBackground from "./components/PolyBackground";
import GraphBackground from "./components/GraphBackground";
import HomeSidebar from "./components/HomeSidebar";
import {GlitchTitle} from "./components/GlitchTitle";
import HackishHud from "./components/HackishHud";
import CyberCardsCarousel from "./components/CyberCardCarousel";


function App() {
    return (
        <div className="App">

            <PolyBackground/>
            <GraphBackground/>

            <Container fluid>
                <Row className={'g-0'}>
                    <Col sm={1} md={4} xxl={2}>
                        <HomeSidebar/>
                        <div style={{height: '20vh'}}/>
                    </Col>
                    <Col>
                        <Row className={'g-0'}>
                            <Col xl={12} xxl={7}
                                 style={{maxWidth: '615px'}}
                            >
                                <div className={'d-none d-sm-block d-lg-none'}>
                                    <div style={{height: '100px'}}/>
                                </div>
                                <main className={'d-flex flex-column align-items-left '}>
                                    <div className={'d-none d-sm-block'}>
                                        <GlitchTitle className={'mb-5'} text={'Maksym_Sharin'}/>
                                    </div>
                                    <div className={'d-none d-md-block'}>
                                        <HackishHud size={'md'}/>
                                    </div>
                                    <div className={'d-block d-sm-none'} style={{
                                        maxWidth: '350px'
                                    }}>
                                        <GlitchTitle text={'Maksym '}/>
                                        <div className={'d-flex flex-row justify-content-end mb-3'}>
                                            <GlitchTitle text={'Sharin'}/>
                                        </div>
                                    </div>
                                    <div className={'d-sm-block d-md-none'}>
                                        <HackishHud size={'sm'}/>
                                    </div>

                                </main>
                            </Col>
                            <Col xl={12} xxl={5}>

                                <div className={'d-none d-md-block d-lg-none'} style={{height: '10vh'}}/>
                                <section id={'experience'}>
                                    <h2 className={'text-center'}> My Runtime Logs </h2>
                                    <div style={{height: '5px'}}/>
                                    <CyberCardsCarousel
                                        items={[
                                            {n: 1}, {n: 2}, {n: 3} , {n: 3} , {n: 3}
                                        ]}/>
                                </section>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>


        </div>
    );
}

export default App;

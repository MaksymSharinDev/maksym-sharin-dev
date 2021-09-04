import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import PolyBackground from "./components/PolyBackground";
import GraphBackground from "./components/GraphBackground";
import HomeSidebar from "./components/HomeSidebar";
import {GlitchTitle} from "./components/GlitchTitle";
import HackishHud from "./components/HackishHud";


function App() {
    return (
        <div className="App">

            <PolyBackground/>
            <GraphBackground/>
            <Container fluid>

                <Row className={'g-0'}>
                    <Col md={2}>
                        <HomeSidebar/>
                        <div style={{height: '20vh'}}/>
                    </Col>
                    <Col md={4} className={'px-5'}>
                        <div className={'d-none d-md-block d-lg-block'}>
                            <div style={{height: '15vh'}}/>
                        </div>
                        <main className={'d-flex flex-column align-items-left'}>

                            <GlitchTitle text={'Sharinov'}/>
                            <div className={'d-none d-md-block'}>
                                <HackishHud size={'md'}/>
                            </div>
                            <div className={'d-sm-block d-md-none'}
                                 style={{position: 'relative', left: '-15%'}}
                            >
                                <HackishHud size={'sm'}
                                />
                            </div>

                        </main>

                    </Col>
                </Row>
            </Container>


        </div>
    );
}

export default App;

import React from 'react'

import { Container, Col, Row } from 'react-bootstrap'

import nmf from '../../assets/nmf.png'
import nmf_stats from '../../assets/nmf-stats.png'
import nmf_riptide from '../../assets/nmf-riptide.png'
import riptide_analysis from '../../assets/riptide-analysis.png'

import './Home.css'

const Home = () => {
    return (
        <Container
            fluid
        >
            <Row>
                <h1 id="home-header">
                    Discover song trends in popular playlists on Spotify!
                </h1>
            </Row>

            <Row className="home-image-container">
                <Col style={{textAlign: "center"}}>
                    <img src={nmf} alt="" style={{ width: '600px', height: '400px', marginTop: "2rem" }} />
                </Col>
                <Col style={{textAlign: "center"}}>
                    <img src={nmf_stats} alt="" style={{ width: '600px', height: '400px', marginTop: "2rem", border: '1px solid grey' }} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home
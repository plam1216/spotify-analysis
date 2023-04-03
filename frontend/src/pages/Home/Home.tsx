import React from 'react'

import { Container, Row } from 'react-bootstrap'

import nmf_riptide from '../../assets/nmf-riptide.png'
import riptide_analysis from '../../assets/riptide-analysis.png'

import './Home.css'

const Home = () => {
    return (
        <Container
            fluid
        >
            <Row>
                <h2 id="home-header">
                    Discover song trends in popular playlists on Spotify!
                </h2>
            </Row>

            <Row className="home-image-container">
                <img src={nmf_riptide} alt="" style={{width: '750px', height: '500px'}}/>
                <img src={riptide_analysis} alt="" style={{width: '500px', height: '500px'}}/>
            </Row>
        </Container>
    )
}

export default Home
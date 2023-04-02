import React from 'react'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import spotifyLogo from '../../assets/spotify-logo.png'
import './NavBar.css'

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" id="navbar">
      <Navbar.Brand className="navbar-brand">
        <Nav.Link href="/">
          <img
            src={spotifyLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="spotify-logo"
          />
          <span style={{ marginLeft: '1rem' }}>Spotify Analysis</span>
        </Nav.Link>
      </Navbar.Brand>

      <Nav className="navbar-nav">
        <Nav.Link className="navbar-nav-link" href="/">Home</Nav.Link>
        <Nav.Link className="navbar-nav-link" href="/topplaylists">Top Playlists</Nav.Link>
        {/* <Nav.Link href="search">Search</Nav.Link> */}
      </Nav>
    </Navbar>
  )
}

export default NavBar
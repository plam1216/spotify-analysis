import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'

import NavBar from './Components/NavBar/NavBar';
import Home from './pages/Home/Home';
import PlaylistAnalysis from './pages/PlaylistAnalysis/PlaylistAnalysis';
import TopPlaylists from './pages/TopPlaylists/TopPlaylists';

function App() {
  const [accessToken, setAccessToken] = useState('')

  const getToken = async () => {
    const response = await fetch('http://localhost:4000/api/token', {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
    })

    const data = await response.json()
    setAccessToken(data.accessToken)
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/topplaylists' element={<TopPlaylists token={accessToken} />} />
        <Route path='/topplaylists/:id' element={<PlaylistAnalysis token={accessToken} />} />
      </Routes>
    </div>
  );
}

export default App;

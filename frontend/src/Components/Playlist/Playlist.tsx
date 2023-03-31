import React from 'react'

import './Playlist.css'

interface PlaylistProps {
    id: number
    name: string
    image: string
}

const Playlist = ({ name, image }: PlaylistProps) => {
    return (
        <div>
            <h3>
                {name}
            </h3>
            <img className='playlist-coverart' src={image} />
        </div>
    )
}

export default Playlist
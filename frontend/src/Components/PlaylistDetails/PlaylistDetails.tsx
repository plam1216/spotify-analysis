import React from 'react'

import './PlaylistDetails.css'

interface PlaylistDetailsProps {
    id: number
    name: string
    image: string
}

const PlaylistDetails = ({ id, name, image }: PlaylistDetailsProps) => {
    return (
        <div className="playlistdetails">
            <h3 className="playlistdetails-header">
                {name}
            </h3>
            <img className='playlistdetails-coverart' src={image} />
        </div>
    )
}

export default PlaylistDetails
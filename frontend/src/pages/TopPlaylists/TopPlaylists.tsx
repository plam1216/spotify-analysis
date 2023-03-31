import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Playlist from '../../Components/Playlist/Playlist'
import * as playlistsService from '../../services/playlistsService'
import * as songsService from '../../services/songsServices'

import { Playlists, Song } from '../../types'

interface TopPlaylistsProps {
    token: string
}

const TopPlaylists = ({ token }: TopPlaylistsProps) => {
    const [playlists, setPlaylists] = useState<Playlists[]>([])
    // const [songs, setSongs] = useState<Song[][]>([])

    const spotifyTopPlaylists = [
        "New Music Friday",
        "RapCaviar",
        "Are & Be",
    ]

    // loop through top playlists and create rows with data in Postgres
    const createPlaylistsRows = async () => {
        if (token) {
            for (let i = 0; i < spotifyTopPlaylists.length; i++) {
                await playlistsService.createPlaylist(token, spotifyTopPlaylists[i])
            }
        }
    }

    // get rows and update 'playlists' state with data
    const getPlaylistsRows = async () => {
        const pgPlaylistsData = await playlistsService.getPlaylists()
        setPlaylists(pgPlaylistsData)
    }

    // const deleteSongsRows = async () => {
    //     if (token) {
    //         for (let i = 0; i < playlists.length; i++) {
    //             await songsService.deleteSongsFromPlaylist(playlists[i].id.toString())
    //         }
    //     }
    // }

    // const handleStuff = async () => {
    //     const songsArr = []
    //     for (let i = 0; i < playlists.length; i++) {
    //         const songs = await songsService.getAllSongs(playlists[i].id.toString())
    //         console.log("loop songs", songs)
    //         songsArr.push(songs)
    //     }

    //     setSongs(songsArr)
    // }


    const showAllPlaylists = () => {
        const allPlaylists = playlists.map(playlist => {
            return (
                <Link
                    key={playlist.id}
                    to={`/topplaylists/${playlist.id}`}
                >
                    <Playlist
                        id={playlist.id}
                        name={playlist.name}
                        image={playlist.image}
                    />
                </Link>
            )
        })

        return (
            <>
                {allPlaylists}
            </>
        )
    }

    console.log("playlists", playlists)
    // console.log('songs', songs)

    useEffect(() => {
        createPlaylistsRows()
        getPlaylistsRows()
        // deleteSongsRows()
    }, [])

    return (
        <div>
            <h1>
                TopPlaylists
            </h1>
            {/* <button onClick={handleStuff}>Click Me</button> */}
            <>
                {showAllPlaylists()}
            </>
        </div>
    )
}

export default TopPlaylists
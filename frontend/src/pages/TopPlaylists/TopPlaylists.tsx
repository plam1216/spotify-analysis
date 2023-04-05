import React, { useEffect, useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PlaylistDetails from '../../Components/PlaylistDetails/PlaylistDetails'

import * as playlistsService from '../../services/playlistsService'
import * as songsService from '../../services/songsServices'

import { Playlist } from '../../types'

import loading_spinner from '../../assets/loading-spinner.gif'

import './TopPlaylists.css'

interface TopPlaylistsProps {
    token: string
}

const TopPlaylists = ({ token }: TopPlaylistsProps) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    const spotifyTopPlaylists: string[] = [
        "New Music Friday",
        "RapCaviar",
        "Are & Be",
        "RNB RADAR",
        "Today's Top Hits",
        "Viral 50 - Global",
        "Viral 50 - USA",
        "Top Songs 50 - Global",
        "Top Songs 50 - USA",
    ]

    // loop through top playlists and create rows with data in Postgres
    const createPlaylistsRows = async (): Promise<void> => {
        if (token) {
            for (let i = 0; i < spotifyTopPlaylists.length; i++) {
                await playlistsService.createPlaylist(token, spotifyTopPlaylists[i])
            }
        }
    }

    // get rows and update 'playlists' state with data
    const getPlaylistsRows = async (): Promise<void> => {
        const pgPlaylistsData = await playlistsService.getPlaylists()
        setPlaylists(pgPlaylistsData)
    }

    const deleteSongsRows = async (): Promise<void> => {
        if (token) {
            for (let i = 0; i < playlists.length; i++) {
                await songsService.deleteSongsFromPlaylist(playlists[i].id.toString())
            }
        }
    }

    const showAllPlaylists = (): JSX.Element => {
        const allPlaylists = playlists.map(playlist => {
            return (
                <Col
                    key={playlist.id}
                    className="topplaylists-col"
                >
                    <Link
                        to={`/topplaylists/${playlist.id}`}
                        className="topplaylists-link"
                    >
                        <PlaylistDetails
                            id={playlist.id}
                            name={playlist.name}
                            image={playlist.image}
                        />
                    </Link>
                </Col>
            )
        })

        return (
            <>
                {allPlaylists}
            </>
        )
    }


    const loaded = (): JSX.Element => {
        return (
            <>
                <Row>
                    <h1 className="topplaylists-header">
                        Top Playlists
                    </h1>
                </Row>

                <Row>
                    {showAllPlaylists()}
                </Row >
            </>
        )
    }

    const loading = (): JSX.Element => {
        return (
            <div className="topplaylists-loading">
                <h2 className="topplaylists-header"> Gathering Playlist Data </h2>
                <div className="topplaylists-loading-img-container">
                    <img src={loading_spinner} alt="loading-spinner" />
                </div>
            </div>
        )
    }

    useEffect(() => {
        const getPlaylists = async (): Promise<void> => {
            await createPlaylistsRows()
            await getPlaylistsRows()
            await deleteSongsRows()
        }

        getPlaylists()
    }, [])

    // console.log("playlists", playlists)

    return (
        <Container
            fluid
            className="topplaylists"
        >
            {playlists ? loaded() : loading()}
        </Container>
    )
}

export default TopPlaylists
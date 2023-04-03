import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';

import * as playlistsService from '../../services/playlistsService'
import * as songsService from '../../services/songsServices'

import { calculateAvgDanceability } from '../../hooks/calculateAvgDanceability'
import { calculateAvgDurationMS } from '../../hooks/calculateAvgDurationMS'
import { calculateAvgEnergy } from '../../hooks/calculateAvgEnergy'
import { calculateAvgLoudness } from '../../hooks/calculateAvgLoudness'
import { calculateAvgTempo } from '../../hooks/calculateAvgTempo'
import { convertMSToMinutes } from '../../hooks/convertMSToMinutes'
import { convertSongMode } from '../../hooks/convertSongMode'
import { convertSongKey } from '../../hooks/convertSongKey'
import { getMostCommonKey } from '../../hooks/getMostCommonKey'
import { getMostCommonMode } from '../../hooks/getMostCommonMode'
import { getMostCommonScale } from '../../hooks/getMostCommonScale'

import { Song, Playlist } from '../../types'

import loading_spinner from '../../assets/loading-spinner.gif'

import './PlaylistAnalysis.css'


interface PlaylistAnalysisProps {
    token: string
}

const PlaylistAnalysis = ({ token }: PlaylistAnalysisProps) => {
    const { id } = useParams<{ id: string }>()

    const [playlist, setPlaylist] = useState<Playlist>()
    const [songs, setSongs] = useState<Song[]>([])


    const getPlaylistData = async (): Promise<void> => {
        if (id) {
            const { playlistData } = await playlistsService.getOnePlaylist(id)

            await songsService.addSongsToPlaylist(token, playlistData.id.toString(), playlistData.name)

            setPlaylist(playlistData)
        }
    }

    const getSongsRows = async (): Promise<void> => {
        if (id) {
            const songsData = await songsService.getAllSongs(id)
            setSongs(songsData)
        }
    }

    const showPlaylistAnalysis = (): JSX.Element => {
        return (
            <Table
                responsive bordered size="sm"
                className="playlist-analysis-table"
            >
                <thead className="playlist-analysis-table-header">
                    <tr className="playlist-analysis-table-header-tr">
                        <th>DANCEABILITY</th>
                        <th>DURATION_MS (MIN)</th>
                        <th>ENERGY</th>
                        <th>TEMPO (BPM)</th>
                        <th>LOUDNESS (DB)</th>
                        {/* <th>Key</th> */}
                        {/* <th>Mode</th> */}
                        <th>SCALE</th>
                    </tr>
                </thead>

                <tbody className="playlist-analysis-table-tbody">
                    <tr>
                        <td>{calculateAvgDanceability(songs)}</td>
                        <td>
                            {calculateAvgDurationMS(songs)} ms
                            ({convertMSToMinutes(parseInt(calculateAvgDurationMS(songs)))} min)
                        </td>
                        <td>{calculateAvgEnergy(songs)}</td>
                        <td>{calculateAvgTempo(songs)}</td>
                        <td>{calculateAvgLoudness(songs)}</td>
                        {/* <td>{getMostCommonKey(songs)}</td> */}
                        {/* <td>{getMostCommonMode(songs)}</td> */}
                        <td>{getMostCommonScale(songs)}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    const showTracklist = (): JSX.Element => {
        const allSongs = songs.map((song) => {
            return (
                <tr
                    key={song.name}
                    className={
                        'playlist-analysis-tracklist-table-tr'
                    }
                >
                    {/* <td className="playlist-analysis-td-odd">{song.id}</td> */}
                    <td className="playlist-analysis-tracklist-table-td-songname">{song.name}</td>
                    <td className="playlist-analysis-tracklist-table-td-artist">{song.artist}</td>
                    <td>{song.danceability}</td>
                    <td className="playlist-analysis-tracklist-table-td-duration">
                        {song.duration_ms}
                        <span style={{ marginLeft: '0.5rem' }}>
                            ({convertMSToMinutes(song.duration_ms)} min)
                        </span>
                    </td>
                    <td>{song.energy}</td>
                    <td>{song.tempo}</td>
                    <td>{song.loudness}</td>
                    <td className="playlist-analysis-tracklist-table-td-scale">{convertSongKey(song.key)} {convertSongMode(song.mode)}</td>
                    {/* <td>{song.spotify_id}</td> */}
                </tr >
            )
        })

        return (
            <Table
                responsive bordered size="sm"
                className="playlist-analysis-tracklist-table"
            >
                <thead>
                    <tr className="playlist-analysis-tracklist-table-header-tr">
                        {/* <th>id</th> */}
                        <th>NAME</th>
                        <th>ARTIST</th>
                        <th>DANCEABILITY</th>
                        <th>DURATION_MS</th>
                        <th>ENERGY</th>
                        <th>TEMPO</th>
                        <th>LOUDNESS</th>
                        <th>SCALE</th>
                        {/* <th>spotify_id</th> */}
                    </tr>
                </thead>

                <tbody>
                    {allSongs}
                </tbody>
            </Table>
        )
    }

    const loaded = (): JSX.Element => {
        return (
            <>
                <h1 className="playlist-analysis-header">{playlist?.name}</h1>
                <h5 className="playlist-analysis-subheader">
                    Danceability, Duration, Energy, Tempo, and Loudness are averages from songs on the playlist. 'Scale' is the most popular scale used in the playlist.
                </h5>
                {showPlaylistAnalysis()}

                <h4 style={{ marginTop: '1rem' }}>TRACKLIST</h4>
                {showTracklist()}
            </>
        )
    }

    const loading = (): JSX.Element => {
        return (
            <div className="playlist-analysis-loading">
                <h2 className="playlist-analysis-header"> Gathering Song Data </h2>
                <div className="playlist-analysis-loading-img-container">
                    <img src={loading_spinner} alt="loading-spinner" />
                </div>
            </div>
        )
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            await getPlaylistData()
            await getSongsRows()
        }

        fetchData()
    }, [])

    // console.log("setSongs", songs)
    // console.log("playlist", playlist)

    return (
        <Container className="playlist-analysis-container">
            {playlist && songs ? loaded() : loading()}
        </Container>
    )
}

export default PlaylistAnalysis
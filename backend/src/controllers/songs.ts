import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
const db = require('../db')

dotenv.config()

const SpotifyWebApi = require('spotify-web-api-node')

const songsRouter = express.Router()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLLIENT_SECRET

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
})

// GET Songs from a Playlist
songsRouter.get('/:id/songs', async (req: Request, res: Response) => {
    try {
        const getAllSongsFromPlaylist = `
            SELECT * FROM songs
            WHERE playlist_id=$1
        `

        const { rows } = await db.query(getAllSongsFromPlaylist, [req.params.id])

        res.status(201).json(rows)
    } catch (error) {
        console.log('Something went wrong!', error);
    }
})

// Add Songs to Playlist
songsRouter.post('/:id', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    const accessToken = authHeader?.split(' ')[1]

    spotifyApi.setAccessToken(accessToken)

    try {
        // playlist foreign key
        const playlistFKId = req.params.id

        // search for playlist
        const playlistData = await spotifyApi.searchPlaylists(req.body.playlistName)

        // get playlist URI
        const playlistDataUri = playlistData.body.playlists.items[0].uri.split(':')[2]

        // get playlist data
        const playlistTracksResponse = await spotifyApi.getPlaylist(playlistDataUri)
        const songsData = playlistTracksResponse.body.tracks.items

        // console.log(songsData.length)

        // iterate through tracks
        for (let i = 0; i < songsData.length; i++) {
            // search for each track's audioFeatures
            const audioFeaturesData = await spotifyApi.getAudioFeaturesForTrack(songsData[i].track.id)

            // console.log(audioFeaturesData)

            // store values needed for table into array for parameterized query
            const audioFeatures = [
                songsData[i].track.name,
                audioFeaturesData.body.danceability,
                audioFeaturesData.body.duration_ms,
                audioFeaturesData.body.energy,
                audioFeaturesData.body.key,
                audioFeaturesData.body.loudness,
                audioFeaturesData.body.tempo,
                audioFeaturesData.body.id,
                playlistFKId,
            ]

            // SQL query: insert song data to 'songs' table
            const insertSongsIntoSongsTable = `
                INSERT INTO songs (name, danceability, duration_ms, energy, key, loudness, tempo, spotify_id, playlist_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `

            // Parameterized Query
            await db.query(insertSongsIntoSongsTable, audioFeatures)
        }

        res.status(201).json(songsData)
    } catch (error) {
        res.status(201).json(error)
    }
})

// Delete Songs from Playlist
songsRouter.delete('/:id/songs', async (req: Request, res: Response) => {
    try {
        const deleteSongsFromPlaylist = `
            DELETE FROM songs
            WHERE playlist_id=$1
            RETURNING *
        `

        const { rows } = await db.query(deleteSongsFromPlaylist, [req.params.id])

        res.status(201).json(rows)
    } catch (error) {
        res.status(400).json(error)
    }
})

export default songsRouter
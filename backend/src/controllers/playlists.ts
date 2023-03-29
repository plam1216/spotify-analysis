import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
const db = require('../db')

dotenv.config()

const SpotifyWebApi = require('spotify-web-api-node')

const playlistsRouter = express.Router()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
})

// GET Playlist ID
// ID is needed in frontend to pass as params
playlistsRouter.post('/playlists/fk', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    const accessToken = authHeader?.split(' ')[1]

    // put into array to use as parameterized query
    const playlistName = [req.body.playlistName]

    spotifyApi.setAccessToken(accessToken)

    try {
        // get the Foreign Key of the New Music Friday
        const getPlaylistId = `
            SELECT id FROM playlists 
            WHERE name=$1
        `

        const playlistIdResponse = await db.query(getPlaylistId, playlistName)
        const playlistIdData = playlistIdResponse.rows[0].id

        res.status(201).json(playlistIdData)
    } catch (error) {
        res.status(400).json(error)
    }
})

// GET All Playlists
playlistsRouter.get('/playlists', async (req: Request, res: Response) => {
    try {
        const getPlaylists = `
            SELECT * FROM playlists
        `

        const playlistsNameResponse = await db.query(getPlaylists)
        const playlistsNameData = playlistsNameResponse.rows

        res.status(201).json(playlistsNameData)
    } catch (err) {
        console.log('Something went wrong!', err);
    }
})

// GET Playlist Songs
playlistsRouter.get('/playlists/:id', async (req: Request, res: Response) => {
    const playlistId = req.params.id

    try {
        // get playlist
        const getPlaylist = `
            SELECT name FROM playlists
            WHERE id=${playlistId}
        `
        // get songs from that playlist
        const getPlaylistSongs = `
            SELECT * FROM songs
            WHERE playlist_id=${playlistId}
        `

        const playlistResponse = await db.query(getPlaylist)
        const playlistData = playlistResponse.rows

        const playlistSongsResponse = await db.query(getPlaylistSongs)
        const playlistSongsData = playlistSongsResponse.rows
        

        res.status(201).json({playlistData, playlistSongsData})
    } catch (error) {
        res.status(401).json(error)
    }
})

// CREATE Playlist
playlistsRouter.post('/playlists', async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization
    const accessToken = authHeader?.split(' ')[1]

    spotifyApi.setAccessToken(accessToken)

    try {
        // search for playlist
        const playlistData = await spotifyApi.searchPlaylists(req.body.playlistName)

        // get playlist name
        const playlistName = [playlistData.body.playlists.items[0].name]

        // insert playlistName into 'playlists' table
        // ON CONFLICT: if name exists, do nothing (ie. dont insert)
        const insertPlaylistIntoPlaylistsTable = `
            INSERT INTO playlists (name) 
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
        `

        await db.query(insertPlaylistIntoPlaylistsTable, playlistName)

        res.status(201).json(playlistName)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Add Songs to Playlist
playlistsRouter.post('/playlists/:id', async (req: Request, res: Response) => {
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
        const tracksData = playlistTracksResponse.body.tracks.items

        // iterate through tracks
        for (let i = 0; i < tracksData.length; i++) {
            const audioFeaturesData = await spotifyApi.getAudioFeaturesForTrack(tracksData[i].track.id)

            // console.log(audioFeaturesData)
            // store values needed for table into array for parameterized query
            const audioFeatures = [
                tracksData[i].track.name,
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
                INSERT INTO songs (name, danceability, duration_ms, energy, key, loudness, tempo, spotifyId, playlist_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `

            // Parameterized Query
            await db.query(insertSongsIntoSongsTable, audioFeatures)
        }

        res.status(201).json(tracksData)
    } catch (error) {
        res.status(201).json(error)
    }
})

// Delete songs from Playlist
playlistsRouter.delete('/playlists/:id', async (req: Request, res: Response) => {
    try {
        const playlistId = req.params.id
        const deleteSongsFromNMF = `
            DELETE FROM songs
            WHERE playlist_id=$1
        `
        await db.query(deleteSongsFromNMF, [playlistId])

        res.status(201).json(req.body.playlistId)
    } catch (error) {
        res.status(400).json(error)
    }

})

export default playlistsRouter
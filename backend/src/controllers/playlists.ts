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

        // array of playlists
        const { rows } = await db.query(getPlaylists)

        res.status(201).json(rows)
    } catch (err) {
        console.log('Something went wrong!', err);
    }
})

// DELETE a Playlist
playlistsRouter.delete('/playlists/:id', async (req: Request, res: Response) => {
    try {
        const deletePlaylist = `
            DELETE FROM playlists
            WHERE id=$1
            RETURNING *
        `

        const { rows } = await db.query(deletePlaylist, [req.params.id])

        res.status(201).json(rows)
    } catch (error) {
        res.status(400).json(error)
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

        // get playlist name & image
        const playlistName = playlistData.body.playlists.items[0].name
        const playlistImage = playlistData.body.playlists.items[0].images[0].url

        const playlistParams = [playlistName, playlistImage]

        // insert playlistName into 'playlists' table
        // ON CONFLICT: if name exists, do nothing (ie. dont insert)
        const insertPlaylistIntoPlaylistsTable = `
            INSERT INTO playlists (name, image) 
            VALUES ($1, $2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *
        `

        // retrieve the ID of the newly inserted playlist
        // if it reaches ON CONFLICT, returns empty array []
        const { rows } = await db.query(insertPlaylistIntoPlaylistsTable, playlistParams)
        const playlistId = rows[0].id

        res.status(201).json({
            id: playlistId,
            playlistName: playlistName,
            playlistImage: playlistImage
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

// GET ONE Playlist
playlistsRouter.get('/playlists/:id', async (req: Request, res: Response) => {
    try {
        const getPlaylist = `
            SELECT * FROM playlists
            WHERE id=$1
        `

        const { rows } = await db.query(getPlaylist, [req.params.id])
        const playlistData = rows[0]

        res.status(201).json({ playlistData })
    } catch (error) {
        res.status(401).json(error)
    }
})

export default playlistsRouter
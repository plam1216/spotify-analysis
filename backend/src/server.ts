// Documentation for Spotify API
// https://github.com/thelinmichael/spotify-web-api-node#usage

import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import tokensController from './controllers/token'
import playlistsController from './controllers/playlists'
import songsController from './controllers/songs'

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

dotenv.config()

const PORT = process.env.PORT || 4000

//////////
// Routes
//////////
app.use('/api', tokensController)
app.use('/api', playlistsController)
app.use('/api/playlists', songsController)

app.get('/', (req: Request, res: Response) => {
    console.log("working")
    res.send("Route works!")
})

app.listen(PORT, () => console.log("Listening on PORT: ", PORT))
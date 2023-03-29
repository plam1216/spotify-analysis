import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const SpotifyWebApi = require('spotify-web-api-node')

const tokenRouter = express.Router()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET


tokenRouter.post('/token', async (req: Request, res: Response) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        clientSecret: client_secret
    });

    // Retrieve an access token using your credentials
    try {
        const result = await spotifyApi.clientCredentialsGrant()
        res.json({
            accessToken: result.body.access_token
        })

    } catch (err: any) {
        console.log("Error", err);
    }
})

export default tokenRouter
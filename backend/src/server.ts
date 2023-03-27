import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
const db = require('./db')

const app = express()
app.use(morgan("dev"))
app.use(express.json())

dotenv.config()

const PORT = process.env.PORT || 4000

app.get('/', (req: Request, res: Response) => {
    console.log("working")
    // res.send("Route works!")
})

app.get('/api/playlists', async (req: Request, res: Response) => {
    // Store result form SQL query
    const results = await db.query('SELECT * FROM playlists;')
    console.log(results)
    res.send(results)   
})

app.post('/api/playlists', (req: Request, res: Response) => {
    res.send("Create a Playlist")
})

app.delete('/api/playlists/:id', (req: Request, res: Response) => {
    res.send("Delete a Playlist")
})

app.put('/api/playlists/:id', (req: Request, res:Response) => {
    res.send("Update Playlist")
})

app.get('/api/playlists/:id', (req: Request, res: Response) => {
    res.send("Get One Playlist")    
})

app.listen(PORT, () => console.log("Listening on PORT: ", PORT))
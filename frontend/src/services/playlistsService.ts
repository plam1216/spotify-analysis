const BASE_URL = 'http://localhost:4000/api/playlists/'

// GET Playlist ID
const getPlaylistId = async (token: string, playlistName: string) => {
    const response = await fetch(BASE_URL + 'fk', {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ "playlistName": playlistName })
    })

    const data = response.json()
    return data
}

// GET ALL Playlists
const getPlaylists = async () => {
    const response = await fetch(BASE_URL)
    const data = await response.json()

    // console.log("Playlists", data)
    return data
}

// GET One Playlist
const getOnePlaylist = async (id: string) => {
    const response = await fetch(BASE_URL + id)
    const data = await response.json()

    // console.log("get one playlist", data)
    return data
}

// CREATE a Playlist
const createPlaylist = async (token: string, playlistName: string) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ "playlistName": playlistName })
    })

    const data = await response.json()
    // console.log("Created ", data)
    return data
}

const deletePlaylist = async (id: string) => {
    const response = await fetch(BASE_URL + id, {
        method: "DELETE",
    })

    const data = await response.json()
    console.log("Deleted: ", data)
    return data
}

export { getPlaylistId, getPlaylists, getOnePlaylist, createPlaylist, deletePlaylist }
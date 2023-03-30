const BASE_URL = 'http://localhost:4000/api/playlists/'

const getAllSongs = async (id: string) => {
    const response = await fetch(BASE_URL + id + '/songs')
    const data = await response.json()

    return data
}

const addSongsToPlaylist = async (token: string, id: string, playlistName: string) => {
    const response = await fetch(BASE_URL + id, {
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

const deleteSongsFromPlaylist = async (id: string) => {
    const response = await fetch(BASE_URL + id + '/songs', {
        method: "DELETE",
    })

    const data = response.json()

    return data
}

export { getAllSongs, addSongsToPlaylist, deleteSongsFromPlaylist }
export interface Song {
    id: number,
    name: string,
    danceability: number,
    duration_ms: number,
    energy: number,
    key: number,
    loudness: number,
    tempo: number,
    spotify_id: string,
    playlist_id: number,
}

export interface Playlists {
    id: number,
    name: string,
    image: string,
}


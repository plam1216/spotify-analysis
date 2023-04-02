export interface Song {
    id: number,
    name: string,
    artist: string,
    danceability: number,
    duration_ms: number,
    energy: number,
    key: number,
    loudness: number,
    mode: number,
    tempo: number,
    spotify_id: string,
    playlist_id: number,
}

export interface Playlist {
    id: number,
    name: string,
    image: string,
}


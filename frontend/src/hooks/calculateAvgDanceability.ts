import { Song } from "../types"

export const calculateAvgDanceability = (songs: Song[]): string => {
    let totalDanceability = 0
    for (let i = 0; i < songs.length; i++) {
        totalDanceability += songs[i].danceability
    }

    // toFixed() returns a string
    let averageDanceability = (totalDanceability / songs.length).toFixed(3)

    return averageDanceability
}
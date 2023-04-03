import { Song } from "../types"

export const calculateAvgLoudness = (songs: Song[]): string => {
    let totalLoudness = 0
    for (let i = 0; i < songs.length; i++) {
        totalLoudness += songs[i].loudness
    }

    let averageLoudness = (totalLoudness / songs.length).toFixed(3)

    return averageLoudness
}
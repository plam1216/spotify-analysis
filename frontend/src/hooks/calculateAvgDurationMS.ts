import { Song } from "../types"

export const calculateAvgDurationMS = (songs: Song[]): string => {
    let totalDuration = 0
    for (let i = 0; i < songs.length; i++) {
        totalDuration += songs[i].duration_ms
    }

    let averageDuration = (totalDuration / songs.length).toFixed(0)
    
    return averageDuration
}
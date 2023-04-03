import { Song } from "../types"

export const calculateAvgTempo = (songs: Song[]): string => {
    let totalTempo = 0

    for (let i = 0; i < songs.length; i++) {
        let tempo = 0

        // convert songs to double time if slower than 100BPM
        if(songs[i].tempo < 100) {
            tempo = songs[i].tempo * 2
        } else {
            tempo = songs[i].tempo
        }

        totalTempo += tempo
    }

    let averageTempo = (totalTempo / songs.length).toFixed(3)

    return averageTempo
}
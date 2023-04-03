import { Song } from "../types"
import { convertSongMode } from "./convertSongMode"

export const getMostCommonMode = (songs: Song[]): string => {
    let songModes: { [key: string]: number } = {}

    for (let i = 0; i < songs.length; i++) {
        if (songModes[songs[i].key]) {
            songModes[songs[i].key]++
        } else {
            songModes[songs[i].key] = 1
        }
    }

    // console.log("songModes", songModes)

    let highestValue = 0
    let highestKey = ''

    for (const key in songModes) {
        if (songModes[key] > highestValue) {
            highestKey = key
            highestValue = songModes[key]
        }
    }

    const convertedSongMode = convertSongMode(parseInt(highestKey))

    return convertedSongMode
}
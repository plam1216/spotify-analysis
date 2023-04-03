import { Song } from "../types"
import { convertSongKey } from "./convertSongKey"

export const getMostCommonKey = (songs: Song[]): string => {
    let songKeys: { [key: string]: number } = {}

    for (let i = 0; i < songs.length; i++) {
        if (songKeys[songs[i].key]) {
            songKeys[songs[i].key]++
        } else {
            songKeys[songs[i].key] = 1
        }
    }

    // console.log("songKeys", songKeys)

    let highestValue = 0
    let highestKey = ''

    for (const key in songKeys) {
        if (songKeys[key] > highestValue) {
            highestKey = key
            highestValue = songKeys[key]
        }
    }

    const convertedSongKey = convertSongKey(parseInt(highestKey))

    return convertedSongKey
}
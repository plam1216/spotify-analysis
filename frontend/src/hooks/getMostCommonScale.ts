import { Song } from "../types"
import { convertSongKey } from "./convertSongKey"
import { convertSongMode } from "./convertSongMode"

export const getMostCommonScale = (songs: Song[]): string => {
    let songScales: { [key: string]: number } = {}

    for (let i = 0; i < songs.length; i++) {
        const songKey = convertSongKey(songs[i].key)
        const songMode = convertSongMode(songs[i].mode)

        const scale = songKey + ' ' + songMode
        
        if(songScales[scale]) {
            songScales[scale]++
        } else {
            songScales[scale] = 1
        }
    }

    // console.log("songScales", songScales)

    let commonScale = ''
    let mostCommonScaleCount = 0

    for (const scale in songScales) {
        if (songScales[scale] > mostCommonScaleCount) {
            commonScale = scale
            mostCommonScaleCount = songScales[scale]
        }
    }

    return commonScale
}
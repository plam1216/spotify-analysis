import { Song } from "../types"

export const calculateAvgEnergy = (songs: Song[]): string => {
    let totalEnergy = 0
    for (let i = 0; i < songs.length; i++) {
        totalEnergy += songs[i].energy
    }

    let averageEnergy = (totalEnergy / songs.length).toFixed(3)
    
    return averageEnergy
}
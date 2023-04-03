export const convertSongKey = (key: number): string => {
    const keys: { [songKey: string]: string } = {
        '0': 'C',
        '1': 'C#',
        '2': 'D',
        '3': 'D#',
        '4': 'E',
        '5': 'F',
        '6': 'F#',
        '7': 'G',
        '8': 'G#',
        '9': 'A',
        '10': 'A#',
        '11': 'B'
    }

    for (const songKey in keys) {
        if (songKey === key.toString()) {
            return keys[songKey]
        }
    }

    return ''
}
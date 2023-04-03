export const convertSongMode = (mode: number): string => {
    if(mode === 1) {
        return "Major"
    } else {
        return "Minor"
    }
}
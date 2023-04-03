export const convertAvgMSToMinutes = (duration: number): string => {
    let timeConverted = (duration / 60000).toFixed(2)
    
    let minutes = timeConverted.split('.')[0]
    let seconds = timeConverted.split('.')[1]

    return `${minutes}` + ':' + `${seconds}`
}
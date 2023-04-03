
export const convertMSToMinutes = (duration: number): string => {
    // ex. 196270 / 60000 = 3.27
    let timeConverted = (duration / 60000).toFixed(2)
    
    // 3 minutes & .27 PERCENT of a minute
    let minutes = timeConverted.split('.')[0]
    let secondsPercent = timeConverted.split('.')[1]
    
    // must convert percentage into seconds
    let secondsConverted = Math.round(parseInt(secondsPercent) * 0.60)
    let seconds
    
    // if percentange < 16; ie. 16 * .60 = 8
    // add 0 in front so it is 8 seconds instead of 80 seconds
    if(parseInt(secondsPercent) < 16) { 
        seconds = '0' + `${secondsConverted}`
    } else {
        seconds = secondsConverted
    }

    return `${minutes}` + ':' + `${seconds}`
}
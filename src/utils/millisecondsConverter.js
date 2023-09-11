function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
export function dateTransfer(time) {
    let seconds = Math.floor(time / 1000)
    let minutes = Math.floor(seconds / 60)
    let milliseconds = time - seconds*1000
    seconds = seconds % 60;
    minutes = minutes % 60;
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${padTo2Digits(milliseconds)}`

}
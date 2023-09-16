/**
 * Sleep function
 * @param {number} ms 밀리세컨드 단위로 sleep ( 동기 )
*/
const sleep = (ms) => {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}
export default sleep;
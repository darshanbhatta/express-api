/**
 * Sleep for a given number of milliseconds.
 * @param ms time in milliseconds to sleep
 * @returns Promise that resolves after ms milliseconds
 */
async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default sleep;

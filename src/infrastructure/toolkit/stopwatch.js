export default class Stopwatch {
    constructor() {
        this.begin = Date.now();
    }

    static start() {
        return new Stopwatch();
    }

    getDiff() {
        return Date.now() - this.begin;
    }

    getFormattedTime() {
        const time = this.getDiff();
        let totalSeconds = time / 1000;
        let minutes = Math.floor(totalSeconds / 60);
        let sec = totalSeconds - minutes * 60;


        return {
            minutes: minutes,
            sec: sec.toFixed(2),
            totalSeconds: totalSeconds.toFixed(2)
        };
    }

    getElapsed() {
        const time = this.getFormattedTime()
        let minutes = time?.minutes;
        let sec = time.sec;

        if (minutes > 0)
            return `${minutes}:${sec}`;

        return `${sec}`;
    }

    reset() {
        this.begin = Date.now();
    }

}

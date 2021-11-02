export default class FrameRateCount {
    constructor(cb) {
        this.emit = cb;

        this.frames = [];
        this.frameRate =  0;
        this.frameRateOld = 0;

        this.on();
    }

    count() {
        if (this.isInactive) return 0;

        this.frames = this.frames.filter( dt => dt > Date.now() - 1000);
        this.frames.push(Date.now());

        const frameRate = this.frames.length;

        if (frameRate !== this.frameRate) {
            this.frameRateOld = this.frameRate;
            this.frameRate = frameRate;

            this.emit(this.frameRate);
        }

        requestAnimationFrame(() => this.count());
    }

    on() {
        this.isInactive = false;
        this.count();
    }

    off() {
        this.isInactive = true;
    }

    get() {
        return this.frames.length;
    }
}
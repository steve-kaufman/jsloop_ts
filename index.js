"use strict";
(function () {
    class Loop {
        constructor(fn, fps) {
            this.running = false;
            this.onstart = () => { };
            this.onstop = () => { };
            this.callback = fn;
            this.framerate = 1000 / fps;
            this.start();
        }
        isRunning() {
            return this.running;
        }
        setFps(fps) {
            this.framerate = 1000 / fps;
        }
        getFps() {
            return 1000 / this.framerate;
        }
        setFramerate(framerate) {
            this.framerate = framerate;
        }
        getFramerate() {
            return this.framerate;
        }
        on(event, fn) {
            switch (event) {
                case "start":
                    this.onstart = fn;
                    break;
                case "stop":
                    this.onstop = fn;
                    break;
                default:
                    console.error("Invalid event");
                    break;
            }
        }
        run(self) {
            self.callback();
            self.check(self);
        }
        check(self) {
            if (self.running)
                setTimeout(self.run, self.framerate, self);
        }
        start() {
            this.onstart();
            if (!this.running) {
                this.running = true;
                this.run(this);
            }
        }
        stop() {
            this.running = false;
            this.onstop();
        }
    }
    ;
    if (typeof window == 'object') {
        //@ts-ignore
        window.Loop = Loop;
    }
    //@ts-ignore
    else if (typeof module == 'object') {
        //@ts-ignore
        module.exports = Loop;
    }
}());

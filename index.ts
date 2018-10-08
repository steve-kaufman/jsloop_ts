(function(){
    class Loop{
        private running: boolean = false;
        private callback: Function;
        private onstart: Function = () => {};
        private onstop: Function = () => {};

        private framerate: number;

        isRunning(){
            return this.running;
        }
        setFps(fps: number){
            this.framerate = 1000 / fps;
        }
        getFps(): number{
            return 1000 / this.framerate;
        }
        setFramerate(framerate: number){
            this.framerate = framerate;
        }
        getFramerate(): number{
            return this.framerate;
        }

        on(event: string, fn: Function){
            switch(event){
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

        private run(self: Loop){
            self.callback();
            self.check(self);
        }
        private check(self: Loop){
            if(self.running) setTimeout(self.run, self.framerate, self);
        }
        start(){
            this.onstart();
            if(!this.running){
                this.running = true;
                this.run(this);
            }
        }
        stop(){
            this.running = false;
            this.onstop();
        }

        constructor(fn: Function, fps: number){
            this.callback = fn;
            this.framerate = 1000 / fps;
            this.start();
        }
    };

    if(typeof window == 'object'){
        //@ts-ignore
        window.Loop = Loop;

    }
    //@ts-ignore
    else if(typeof module == 'object'){
        //@ts-ignore
        module.exports = Loop;
    }
}());

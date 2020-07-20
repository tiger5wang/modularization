export class Timeline {
    constructor() {
        this.animations = [];
        this.requestId= null;
        this.status = 'inited';
        this.startTime = Date.now();
    }

    tick() {
        let t = Date.now() - this.startTime;
        // console.log(t)
        let animations = this.animations.filter(animation => !animation.finished);
        for (let animation of this.animations) {

            let {object, property, start, end, timingFunction, delay, template, duration, addTime} = animation;
            console.log(addTime, t - delay - addTime)
            let progression = timingFunction((t - delay - addTime)/duration);  // 0-1 之间的数

            if (t > duration + delay + addTime) {
                progression = 1;
                animation.finished = true;
            }
            // let value = start + progression * (end - start);
            let value = animation.valueFromProgression(progression);

            // object[property] = template(timingFunction(start, end)(t - delay));
            object[property] = template(value);
        }
        if (animations.length) {
            this.requestId = requestAnimationFrame(() => this.tick())
        }
    }

    start() {
        if (this.status !== 'inited')
            return;
        this.status = 'playing';
        this.startTime = Date.now();
        this.tick();
    }

    restart() {
        if (this.status === 'playing')
            this.pause();
        // this.animations = [];
        this.requestId= null;
        this.status = 'playing';
        this.startTime = Date.now();
        for (let animation of this.animations) {
            animation.finished = false;
        }
        this.tick();
    }

    pause() {
        if (this.status !== 'playing')
            return;
        this.status = 'pause';
        this.pauseTime = Date.now();
        if (this.requestId != null)
            cancelAnimationFrame(this.requestId)
    }

    resume() {
        if (this.status !== 'pause')
            return;
        this.status = 'playing';
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }

    add(animation, addTime) {
        this.animations.push(animation);
        animation.finished = false;
        if (this.status === 'playing') {
            console.log('----------------------',addTime, Date.now()-this.startTime)
            animation.addTime = addTime !== undefined ? addTime : Date.now()-this.startTime;
        } else {
            animation.addTime = addTime !== undefined ? addTime : 0
        }
    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.template = template || (v => `rgba(${v.r}, ${v.g},${v.b},${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay =delay || 0;
        this.timingFunction = timingFunction || ((start,  end) => {
            return (t) => start + t / duration * (end - start)
        });
    }

    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start)
    }
}
export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.template = template || (v => `rgba(${v.r}, ${v.g},${v.b},${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay =delay || 0;
        this.timingFunction = timingFunction || ((start,  end) => {
            return (t) => start + t / duration * (end - start)
        });
    }

    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        };
    }
}

/*
let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object, property, start, end, duration, delay, timingFunction)
------ 1-----
animation.start()
animation2.start()
animation.pause()
animation.resume()
animation.stop()

----- 2 -----
let timeline = new Timeline;
timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()

setTimeout
setInterval
requestAnimationFrame
 */
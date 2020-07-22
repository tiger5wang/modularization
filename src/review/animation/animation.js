
export class TimeLine {
    constructor() {
        this.animations = [];
        this.startTime = Date.now();
        this.status = 'inited';
        this.requestId = null;
    }

    // 计算动画
	tick() {
		// console.log('tick')
        let t = Date.now() - this.startTime;   // 当前时间和动画开始时间的时间差

        let animations = this.animations.filter(animation => !animation.finished);  // 过滤出还没有执行完毕的动画

        // 遍历所有的动画
        for (let animation of animations) {
            let {object, attributes, start, end, duration, delay, timingFunction, template, addTime} = animation;

            // 运动函数
            let progression = timingFunction((t - delay - addTime) / duration)

            if (t > delay + duration + addTime) {
                progression = 1;
                animation.finished = true;
            }

            let value = start + progression * (end - start);

            object[attributes] = template(value)
        }

        if (animations.length)
		    this.requestId = requestAnimationFrame(() => this.tick())
	}

	// 开始方法
	start() {
        if (this.status !== 'inited')
            return;
        this.status = 'playing';
        this.startTime = Date.now();

		this.tick();
	}

	// 重新开始方法
	restart() {
        if (this.status === 'playing')
            this.pause();
        // 数据都恢复到原始值
        this.startTime = Date.now();
        this.status = 'playing';
        this.requestId = null;
        for (let animation of this.animations)
            animation.finished = false;
        // 开始从头执行动画
        this.tick();
    }

    // 暂停方法
    pause() {
        if (this.status !== 'playing')
            return;

        this.status = 'pause';
        this.pauseTime = Date.now();    // 记录暂停时的时间，便于继续的时候计算时间差值
        if (this.requestId != null)   // 取消动画
            cancelAnimationFrame(this.requestId)
    }

    // 继续动画方法
    resume() {
        if (this.status !== 'pause')
            return;

        this.status = 'playing';
        this.startTime += Date.now() - this.pauseTime;  // // 继续动画的开始时间要加上暂停的时间段

        this.tick();
    }

	add(animation, addTime) {
        animation.finished = false;   // 记录该动画是否完成
	    this.animations.push(animation);

        if (this.status === 'playing') {
            // console.log('----------------------',addTime, Date.now()-this.startTime)
            animation.addTime = addTime !== undefined ? addTime : Date.now()-this.startTime;
        } else {
            animation.addTime = addTime !== undefined ? addTime : 0
        }
    }
}


export class Animation {
	constructor(object, attributes, start, end, duration, delay, timingFunction, template) {
		this.object = object;
		this.attributes = attributes;
		this.start = start;
		this.end = end;
		this.duration = duration;
		this.delay = delay;
		this.timingFunction = timingFunction;
		this.template = template;
	}
}
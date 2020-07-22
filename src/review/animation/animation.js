
export class TimeLine {
	tick() {
		console.log('tick')
		requestAnimationFrame(() => this.tick())
	}
	
	start() {
		this.tick();
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
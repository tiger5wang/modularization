import {createElement, TextNode, Wrapper} from '../../createElement'

class Carousel {
	constructor() {
		this.children = [];
	}
	
	setAttribute(name, value) {   // attribute
		// console.log('MyComponent::setAttribute', name, value);
		this[name] = value;
	}
	
	appendChild(child) {   // 添加children 的方法一
		this.children.push(child)
	}
	
	
	render() {
		let children = this.data.map(url => {
			let element = <img src={url}/>;
			element.addEventListener('dragstart', event => event.preventDefault());
			return element;
		});
		let root = <div class="carousel">
			{children}
		</div>;
		
		let position = 0;
		
		let nextPic = () => {
			let nextPosition = (position + 1) % this.data.length;
			
			let current = children[position];
			let next = children[nextPosition];
			
			// transition 生效需要间隔，下一帧才会生效
			current.style.transition = 'ease 0s';
			next.style.transition = 'ease 0s';
			current.style.transform = `translateX(${-100 * position}%)`;
			next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
			
			setTimeout(function () {
				current.style.transition = '';  // = ''  意味着使用 css rule 中的效果
				next.style.transition = '';
				current.style.transform = `translateX(${-100 - 100 * position}%)`;
				next.style.transform = `translateX(${-100 * nextPosition}%)`;
				position = nextPosition;
			}, 16);  // 16ms 正好是一帧 1000 / 60 ~= 16
			
			setTimeout(nextPic, 3000)
		};
		
		setTimeout(nextPic, 3000);
		
		
		// this.root.addEventListener('mousedown', event => {
		// 	let startX = event.clientX, startY = event.clientY;
		//
		// 	let nextPosition = (position + 1) % this.data.length;
		// 	let lastPosition = (position - 1 + this.data.length) % this.data.length;
		//
		// 	let current = this.root.childNodes[position];
		// 	let last = this.root.childNodes[lastPosition];
		// 	let next = this.root.childNodes[nextPosition];
		//
		// 	current.style.transition = 'ease 0s';
		// 	last.style.transition = 'ease 0s';
		// 	next.style.transition = 'ease 0s';
		//
		// 	current.style.transform = `translateX(${-500 * position}px)`;
		// 	last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
		// 	next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
		//
		// 	let move = event => {
		// 		current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
		// 		last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;
		// 		next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
		// 	};
		//
		// 	let up = event => {
		// 		let offset = 0;
		// 		if(event.clientX - startX > 250) {  // 终点大于起点坐标，向右滑动，偏移量为正向
		// 			offset = 1
		// 		} else if(event.clientX - startX < -250) {  // 终点小于起点坐标，向左滑动， 偏移量为反向
		// 			offset = -1
		// 		}
		// 		console.log()
		// 		current.style.transition = '';
		// 		last.style.transition = '';
		// 		next.style.transition = '';
		//
		// 		current.style.transform = `translateX(${offset * 500 -500 * position}px)`;
		// 		last.style.transform = `translateX(${offset * 500 -500 - 500 * lastPosition}px)`;
		// 		next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;
		//
		// 		position = (position - offset + this.data.length) % this.data.length;
		//
		// 		document.removeEventListener('mousemove', move);
		// 		document.removeEventListener('mouseup', up)
		// 	};
		//
		// 	document.addEventListener('mousemove', move);
		// 	document.addEventListener('mouseup', up)
		// })
		//
		
		
		return root;
	}
	
	mountTo(parent) {
		this.render().mountTo(parent)
	}
}


let component = <Carousel data={[
		"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
		"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
		"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
		"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
	]} />;

component.mountTo(document.body);


// jsx 的写法转义成 js 语法
// var component = createElement(
// 	MyComponent,
// 	{
// 		id: "a",
// 		"class": "b"
// 	},
// 	createElement(Child, null),
// 	createElement(Child, null),
// 	createElement(Child, null)
// );
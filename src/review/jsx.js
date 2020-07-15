// 注意这里传进来的先是子节点，后是父节点
import {TextNode} from "../../createElement";

function createElement(Comp, attributes, ...children) {
	// console.log(arguments)
	let ele;
	if(typeof Comp === 'string') {
		ele = new Wrapper(Comp)
	} else {
		ele = new MyComponent()
	}
	
	for (let name in attributes) {
		ele.setAttribute(name, attributes[name])
	}
	
	let append = (children) => {
		for (let child of children) {
			if(typeof child === 'object' && child instanceof Array) {
				append(child);
				continue
			}
			if(typeof child === 'string') {
				child = new Text(child)
			}
			ele.appendChild(child)
		}
	};
	
	append(children);
	
	return ele;
}

class Text {
	constructor(text) {
		this.root = document.createTextNode(text)
	}
	
	mountTo(parent) {
		parent.appendChild(this.root)
	}
}

class Wrapper {
	constructor(type) {
		// console.log(config);
		this.root = document.createElement(type);
		this.children = [];
	}
	
	setAttribute(name, value) {
		// console.log(name, value)
		this.root.setAttribute(name, value)
	}
	
	appendChild(child) {
		this.children.push(child)
	}
	
	mountTo(parent) {
		parent.appendChild(this.root);
		
		for (let child of this.children) {
			child.mountTo(this.root)
		}
	}
}

class MyComponent {
	constructor(config) {
		// console.log(config);
		this.root = document.createElement('div');
		this.children = [];
	}
	
	set className(v) {
		console.log('mycomponeng::classNmae', v)
	}
	
	setAttribute(name, value) {
		// console.log(name, value)
		this.root.setAttribute(name, value)
	}
	
	appendChild(child) {
		this.children.push(child)
	}
	
	render() {
		return <div>
			<article>
				<header>this is header</header>
				{this.slot}
				<footer>this is footer</footer>
			</article>
		</div>
	}
	
	mountTo(parent) {
		// 添加 render 之前：
		// parent.appendChild(this.root);
		//
		// for (let child of this.children) {
		// 	child.mountTo(this.root)
		// }
		
		this.slot = <div></div>

		for (let child of this.children) {
			this.slot.appendChild(child)
		}

		this.render().mountTo(parent)
	}
	
	
	
}

let component = <MyComponent data='hahah' className='div' style="background-color: red" >
	{/*<MyComponent>1111111111</MyComponent>*/}
	{/*<MyComponent>222222222</MyComponent>*/}
	<p>
		<span>3333333333333</span>
		<span>4444444444</span>
		<span>555555555555</span>
	</p>
	<span>666666666</span>
</MyComponent>;



component.mountTo(document.body)

console.log(component)


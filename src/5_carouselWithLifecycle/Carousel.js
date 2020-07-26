import {createElement, TextNode, Wrapper} from '../../createElement'
import {Timeline, Animation} from "./animation";
import {ease} from './cubicBezier'


export class Carousel {
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
        let position = 0;
        let timeline = new Timeline();
        timeline.start();

        let timer = null;
        let onStart = () =>{
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
            timeline.pause();
            timer && clearTimeout(timer)
        }

        let children = this.data.map(url => {
            let element = <img src={url} alt={'轮播图'} enableGesture={true} onStart={onStart}/>;
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });
        let root = <div class="carousel">
            {children}
        </div>;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            // timeline = new Timeline();

            window.xtimeline = timeline;
            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform',-100 * position, -100 - 100 * position, 1000, 1000, ease, v => `translateX(${v}%)`);
            let nextAnimation = new Animation(next.style, 'transform',100-100 * nextPosition, -100 * nextPosition, 1000, 1000, ease, v => `translateX(${v}%)`);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            console.log('+++++++++++++++++++++++++++')
            position = nextPosition;

            window.timeout = timer = setTimeout(nextPic, 3000)
        };

        timer = setTimeout(nextPic, 3000);  // 记录刚开始的定时器ID，以便销毁，防止在刚进入页面时在函数执行之前 鼠标滑动图片，导致又开启一个 定时器

        return root;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}

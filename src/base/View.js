import $ from "jquery";
import EventBus from "./EventBus";

class View extends EventBus {
  //初始化
  //constructor({ el, html, render, data, eventBus, events }) {
  constructor(options) {
    super(); //调用EventBus#constructor(),即调用父类的初始化
    Object.assign(this, options); //options 有什么就都放在 this 上
    this.el = $(this.el); //覆盖el = $(el)
    this.render(this.data);
    this.autoBindEvents();
    this.on("m:updated", () => {
      this.render(this.data);
    });
  }
  autoBindEvents() {
    //绑定鼠标事件，绑定的是 section 不是 button，事件委托，绑定在最外面的那个元素上
    for (let key in this.events) {
      const value = this[this.events[key]];
      const spaceIndex = key.indexOf(" ");
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      this.el.on(part1, part2, value);
    }
  }
}
export default View;

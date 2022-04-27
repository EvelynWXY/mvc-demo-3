import $ from "jquery";
class View {
  //初始化
  constructor({ el, html, render }) {
    //把options解构一下
    this.el = $(el);
    this.html = html;
    this.render = render;
  }
}
export default View;

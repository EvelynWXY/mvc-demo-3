import "./app2.css";
import $ from "jquery";
import Model from "./base/Model";

const eventBus = $({ window });

const localKey = "app2.index"; //本地存下的值
//数据相关都放到 m
const m = new Model({
  data: {
    //初始化数据,localStorage 只能获取到字符串
    index: parseInt(localStorage.getItem(localKey)) || 0, //index 保底值为0
  },
  update(data) {
    Object.assign(m.data, data); //把data 赋值到原有的 m.data
    eventBus.trigger("m:updated"); //触发事件
    localStorage.setItem("app2.index", m.data.index);
  },
});

//其他都 c
const view = {
  el: null, //表示容器，代替之前的 container
  html: (index) => {
    return `
              <div>
                  <ol class="tab-bar">
                    <li class = "${
                      index === 0 ? "selected" : ""
                    }" data-index = "0"<span>11111</span></li>
                    <li class = "${
                      index === 1 ? "selected" : ""
                    }" data-index = "1"><span>22222</span></li>
                  </ol>
                  <ol class="tab-content">
                    <li class = "${index === 0 ? "active" : ""}">内容1</li>
                    <li class = "${index === 1 ? "active" : ""}">内容2</li>
                  </ol>
              </div>`;
  },

  render(index) {
    if (view.el.children.length !== 0) view.el.empty();
    //jquery 会把字符串 html 变成 section 标签
    $(view.html(index)).appendTo(view.el);
  },
  init(container) {
    view.el = $(container);
    view.render(m.data.index); //第一次 view = render(data)
    view.autoBindEvents();
    eventBus.on("m:updated", () => {
      view.render(m.data.index);
    });
  },
  events: {
    "click .tab-bar li": "x",
  },
  x(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    m.update({ index: index });
    console.log("x");
  },

  autoBindEvents() {
    //绑定鼠标事件，绑定的是 section 不是 button，事件委托，绑定在最外面的那个元素上
    for (let key in view.events) {
      const value = view[view.events[key]];
      const spaceIndex = key.indexOf(" ");
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      view.el.on(part1, part2, value);
    }
  },
};
export default view;

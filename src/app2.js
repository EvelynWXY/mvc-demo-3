import "./app2.css";
import $ from "jquery";
import Model from "./base/Model";
import View from "./base/View";
import EventBus from "./base/EventBus";

const eventBus = new EventBus();

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
const init = (el) => {
  new View({
    el: el, //表示容器，代替之前的 container
    data: m.data,
    eventBus: eventBus,
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

    render(data) {
      const index = data.index;

      if (this.el.children.length !== 0) this.el.empty();
      //jquery 会把字符串 html 变成 section 标签
      $(this.html(index)).appendTo(this.el);
    },

    events: {
      "click .tab-bar li": "x",
    },
    x(e) {
      const index = parseInt(e.currentTarget.dataset.index);

      m.update({ index: index });
    },
  });
};

export default init;

import "./app1.css";
import $ from "jquery";
import Model from "./base/Model";
import View from "./base/View";
import EventBus from "./base/EventBus";

//数据相关都放到 m
const m = new Model({
  data: {
    //第一次要初始化 n，使用localStorage get、set实现每次刷新页面数据也不会丢失
    n: parseFloat(localStorage.getItem("n")), //初始化数据,localStorage 只能获取到字符串
  },

  update: function (data) {
    Object.assign(m.data, data);
    m.trigger("m:updated"); //触发事件
    localStorage.setItem("n", m.data.n);
  },
});

const init = (el) => {
  //其他都是 c //根据 vue.js 认为是前端的库应该是合并到 v 里
  new View({
    el: el,
    data: m.data,
    html: `
        <div>
          <div class="output">
            <span id="number">{{n}}</span>
          </div>
          <div class="actions">
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">÷2</button>
          </div>
      </div>
  `,

    render(data) {
      const a = data.n;
      if (this.el.children.length !== 0) this.el.empty();
      //jquery 会把字符串 html 变成 section 标签
      $(this.html.replace("{{n}}", n)).appendTo(this.el);
    },
    events: {
      "click #add1": "add",
      "click #minus1": "minus",
      "click #mul2": "mul",
      "click #divide2": "div",
    },
    add() {
      m.update({ n: m.data.n + 1 });
    },
    minus() {
      m.update({ n: m.data.n - 1 });
    },
    mul() {
      m.update({ n: m.data.n * 2 });
    },
    div() {
      m.update({ n: m.data.n / 2 });
    },
  });
};

export default init;

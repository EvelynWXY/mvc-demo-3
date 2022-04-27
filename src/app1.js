import "./app1.css";
import $ from "jquery";
import Model from "./base/Model.js";

const eventBus = $({ window });

//数据相关都放到 m
const m = new Model({
  data: {
    //第一次要初始化 n，使用localStorage get、set实现每次刷新页面数据也不会丢失
    n: parseInt(localStorage.getItem("n")), //初始化数据,localStorage 只能获取到字符串
  },
  update: function (data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated"); //触发事件
    localStorage.setItem("n", m.data.n);
  },
});

//其他都是 c //根据 vue.js 认为是前端的库应该是合并到 v 里
const view = {
  el: null,
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
  init(container) {
    view.el = $(container);
    view.render(m.data.n);
    view.autoBindEvents();
    view.autoBindEvents();
    eventBus.on("m:updated", () => {
      view.render(m.data.n);
    });
  },
  render(n) {
    if (view.el.children.length !== 0) view.el.empty();
    //jquery 会把字符串 html 变成 section 标签
    $(view.html.replace("{{n}}", n)).appendTo(view.el);
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

// //其他都 c
// const c1 = {
//   v: null,
//   initV() {
//     //视图相关都放到 v
//     c.v = new View({
//       el: c.container, //表示容器，代替之前的 container
//       html: `
//   `,
//       render(n) {
//         if (c.v.el.children.length !== 0) c.v.el.empty();
//         //jquery 会把字符串 html 变成 section 标签
//         $(c.v.html.replace("{{n}}", n)).appendTo(c.v.el);
//       },
//     });
//   },
//   init(container) {
//     c.container = container;
//     c.initV();

//     c.v.render(m.data.n); //第一次 view = render(data)

//     c.autoBindEvents();
//     eventBus.on("m:updated", () => {
//       c.v.render(m.data.n);
//     });
//   },
//   events: {
//     "click #add1": "add",
//     "click #minus1": "minus",
//     "click #mul2": "mul",
//     "click #divide2": "div",
//   },
//   add() {
//     m.update({ n: m.data.n + 1 });
//   },
//   minus() {
//     m.update({ n: m.data.n - 1 });
//   },
//   mul() {
//     m.update({ n: m.data.n * 2 });
//   },
//   div() {
//     m.update({ n: m.data.n / 2 });
//   },
//   autoBindEvents() {
//     //绑定鼠标事件，绑定的是 section 不是 button，事件委托，绑定在最外面的那个元素上
//     for (let key in c.events) {
//       const value = c[c.events[key]];
//       const spaceIndex = key.indexOf(" ");
//       const part1 = key.slice(0, spaceIndex);
//       const part2 = key.slice(spaceIndex + 1);
//       c.v.el.on(part1, part2, value);
//     }
//   },
// };

// export default c;

import EventBus from "./EventBus";

class Model extends EventBus {
  constructor(options) {
    super(); //调用EventBus#constructor(),即调用父类的初始化
    const keys = [("data", "create", "delete", "update", "get")];
    keys.forEach((key) => {
      if (key in options) {
        this[key] = options[key];
      }
    });

    //this.data = options.data; //data 要传的时候才赋值到当前对象本身的data上，而不是赋值到原型链上
  }
  //函数在原型里
  create() {
    // ?.可选链 console?.error?.("你还没有实现 create");效果等同如下
    console && console.error && console.error("你还没有实现 create");
  }
  delete() {
    console && console.error && console.error("你还没有实现 delete");
  }
  update() {
    console && console.error && console.error("你还没有实现 update");
  }
  get() {
    console && console.error && console.error("你还没有实现 get");
  }
}
export default Model;

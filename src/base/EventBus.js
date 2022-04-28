import $ from "jquery";

class EventBus {
  constructor() {
    this._eventBus = $(window);
  }

  on(eventName, fn) {
    return this._eventBus.on(eventName, fn);
  } //监听

  trigger(eventName, data) {
    return this._eventBus.trigger(eventName, data);
  } //触发

  off(eventName, fn) {
    return this._eventBus.off(eventName, fn);
  } //取消监听
}

export default EventBus;

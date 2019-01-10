class Storage {
  constructor(emitter) {
    this.store = window.localStorage;
    this.emitter = emitter;

    this.emitter.addListener("save", this.insert);
    this.emitter.addListener("find", this.find);
  }

  find = key => {
    return this.store.getItem(key);
  };

  insert = ({ key, value }) => {
    return this.store.setItem(key, value);
  };
}

export default Storage;

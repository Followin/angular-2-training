Object.defineProperty(Object.prototype, 'eachOwnProp', {
  value(handler: any) {
    for (const key of Object.getOwnPropertyNames(this)) {
      handler(this[key]);
    }
  },
});
class Base {
  $property(constructor, name, property) {
    constructor[name] = property;
  }

  $map(object, _object) {
    for (let key in _object) {
      if (!_object.hasOwnProperty(key)) continue;
      object[key] = _object[key];
    }
  }
};

export default Base;
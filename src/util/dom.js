export default class Dom {
  outerHTML(el) {
    return el.outerHTML;
  }

  getElm(el) {
    return document.querySelector(el);
  }

  createElement(tag) {
    return document.createElement(tag);
  }

  createTextNode(text) {
    return document.createTextNode(text);
  }

  createComment(comment) {
    return document.createComment(comment);
  }

  textContent(el, textContent) {
    el.textContent = textContent;
  }

  insertBefore(parent, el, exEl) {
    parent.insertBefore(el, exEl);
  }

  nextSibling(el){
    return el.nextSibling;
  }

  parent(el) {
    return (el && el.parentNode) || null;
  }

  remove(el) {
    el.remove();
  }

  setAttribute(el, name, value) {
    el.setAttribute(name, value);
  }

  removeAttribute(el, name) {
    el.removeAttribute(name);
  }
}


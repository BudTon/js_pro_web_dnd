/* eslint-disable import/prefer-default-export */
export class StorageElement {
  constructor(el) {
    this.el = el;
  }

  static getStorage(item) {
    const cardElement = item.previousElementSibling;
    const cardList = cardElement.parentElement.classList.value;
    return window.localStorage.getItem(`${cardList}`);
  }

  static setStorage(item) {
    const cardElement = item.previousElementSibling;
    const cardList = cardElement.parentElement.classList.value;
    window.localStorage.setItem(`${cardList}`, cardElement.innerHTML);
  }
}

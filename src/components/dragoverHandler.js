import { StorageElement } from './localStorage/StorageElement.class';
import createdCloneCard from './createdCloneCard/createdCloneCard';

export default class dragoverHandler {
  constructor() {
    /* eslint-disable no-unused-expressions */
    this.addCardList = document.querySelectorAll('.add-card');
    this.items = document.querySelectorAll('.card-list');
    this.actualElement;
    this.shiftY;
    this.shiftX;
    this.cloneElement;
    this.target = undefined;
  }

  start() {
    this.items.forEach((item) => {
      this.item = item;
      this.item.addEventListener('mousedown', this.mouseDown.bind(this));
    });
  }

  mouseDown(e) {
    e.preventDefault();
    if (e.target.classList.contains('card-close')) {
      const addBtn = e.target.parentElement.parentElement.nextElementSibling;
      e.target.parentElement.remove();
      StorageElement.setStorage(addBtn);
    }
    this.actualElement = e.target.parentElement;
    this.actualElement.style.cursor = 'grab';

    const { top, left } = this.actualElement.getBoundingClientRect();
    this.shiftY = e.pageY - top;
    this.shiftX = e.pageX - left;
    if (this.actualElement.classList.contains('card-item')) {
      this.cloneElement = createdCloneCard(this.actualElement);
      this.startGrab(e);
      this.target = this.actualElement;
      this.pasteClone();
      this.target = undefined;
      this.actualElement.classList.add('dragged');

      document.documentElement.addEventListener('mouseup', this.onMouseUp.bind(this));
      document.documentElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  startGrab(e) {
    const actualElementWidth = this.item.offsetWidth;
    if (this.actualElement !== undefined) {
      this.actualElement.style.top = `${e.clientY - this.shiftY}px`;
      this.actualElement.style.left = `${e.clientX - this.shiftX}px`;
      this.actualElement.style.width = `${actualElementWidth}px`;
    }
  }

  /* eslint-disable class-methods-use-this */
  deleteClone() {
    if (document.querySelector('.card-clone')) {
      document.querySelector('.card-clone').remove();
    }
  }

  pasteClone() {
    if (this.target.parentElement !== null) {
      this.cloneElement = createdCloneCard(this.actualElement);
      // this.target.style.cursor = "grabbing"
      if (this.postionClone()) {
        this.target.insertAdjacentHTML('afterend', this.cloneElement);
        this.target = undefined;
      } else {
        this.target.insertAdjacentHTML('beforebegin', this.cloneElement);
        this.target = undefined;
      }
    }
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.actualElement !== undefined && !this.actualElement.classList.contains('card-item')) {
      return;
    }

    this.startGrab(e);

    if (
      e.target.classList.contains('card-item')
      && this.target === undefined && this.actualElement !== undefined
    ) {
      this.target = e.target;
      this.deleteClone();
      this.pasteClone();
    }
    // добавление в пустой лист с заданиями
    if (e.target.classList.contains('plan-list')
      && e.target.querySelectorAll('.card-item').length === 0
      && this.actualElement !== undefined) {
      this.deleteClone();
      e.target.querySelector('.card-list').insertAdjacentHTML('afterbegin', this.cloneElement);
    }

    if (this.target !== undefined && this.actualElement !== undefined) {
      this.target = undefined;
    }
  }

  /* eslint-disable consistent-return */
  postionClone() {
    if (this.target) {
      const targetY = Math.round(this.target.getBoundingClientRect().top);
      const actualElementY = Math.round(this.actualElement.getBoundingClientRect().top);
      const actualElementHeight = this.actualElement.offsetHeight;
      if (targetY - actualElementY < 0 && targetY - actualElementY < -actualElementHeight / 2) {
        return true;
      }
      return false;
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    const pasteElement = document.querySelectorAll('.card-clone');
    if (pasteElement.length === 1) {
      pasteElement[0].insertAdjacentElement('afterend', this.actualElement);
      this.actualElement.classList.remove('dragged');
      this.actualElement.style.cursor = '';
      this.actualElement.style.cssText = '';
      this.actualElement = undefined;
    }

    this.deleteClone();
    this.addCardList.forEach((addCard) => {
      StorageElement.setStorage(addCard);
    });

    this.target = undefined;
    document.documentElement.removeEventListener('mouseup', this.onMouseUp.bind(this));
    document.documentElement.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }
}

import { StorageElement } from './localStorage/StorageElement.class';
import createdCloneCard from './createdCloneCard/createdCloneCard';


export default class DragoverHandler {
  constructor() {
    /* eslint-disable no-unused-expressions */
    this.addCardList = document.querySelectorAll('.add-card');
    this.actualElement;
    this.shiftY;
    this.shiftX;
    this.cloneElement;
    this.target = undefined;
    this.start();
  }

  start() {
    this.cardListTodo = document.querySelector('.todo > .card-list');
    this.cardListInProgress = document.querySelector('.in-progress > .card-list');
    this.cardListDone = document.querySelector('.done > .card-list');
    this.cardListTodo.addEventListener('mousedown', this.mouseDown.bind(this));
    this.cardListInProgress.addEventListener('mousedown', this.mouseDown.bind(this));
    this.cardListDone.addEventListener('mousedown', this.mouseDown.bind(this));
  }

  mouseDown(e) {
    e.preventDefault();
    this.deleteClone();
    let cardClose = 0;
    if (e.target.classList.contains('card-close')
      && e.target.closest('.plan-list') !== null) {
      const addBtn = e.target.closest('.plan-list').querySelector('.add-card');
      e.target.parentElement.remove();
      StorageElement.setStorage(addBtn);
      cardClose = 1; 
    }

    if (!e.target.parentElement.classList.contains('card-item')) return;

    this.actualElement = e.target.parentElement;
    this.actualElementWidth = e.target.parentElement.offsetWidth;
    const { top, left } = this.actualElement.getBoundingClientRect();
    this.shiftY = e.pageY + top;
    this.shiftX = e.pageX + left;
    if (this.actualElement.classList.contains('card-item')
      && cardClose === 0) {
      this.cloneElement = createdCloneCard(this.actualElement);
      this.startGrab(e);
      this.target = this.actualElement;
      this.pasteClone();
      this.target = undefined;
      this.actualElement.classList.add('dragged');
      document.documentElement.addEventListener('mouseup', this.onMouseUp.bind(this));
      document.documentElement.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.documentElement.addEventListener('mousedown', this.mouseDown.bind(this));
    }
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.actualElement === undefined || !this.actualElement.classList.contains('card-item')) {
      this.deleteClone();
      return
    };

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
      && e.target.querySelectorAll('.card-item').length <= 1 
      && this.actualElement !== undefined) {
      this.deleteClone();
      e.target.querySelector('.card-list').insertAdjacentHTML('afterbegin', this.cloneElement);
    }

    if (this.target !== undefined && this.actualElement !== undefined) {
      this.target = undefined;
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    const pasteElement = document.querySelectorAll('.card-clone');
    if (pasteElement.length === 1) {
      pasteElement[0].insertAdjacentElement('afterend', this.actualElement);
      this.actualElement.classList.remove('dragged');
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
    document.documentElement.removeEventListener('mousedown', this.mouseDown.bind(this));
  }

  startGrab(e) {
    if (this.actualElement !== undefined) {
      this.actualElement.style.top = `${e.clientY - this.shiftY}px`;
      this.actualElement.style.left = `${e.clientX - this.shiftX}px`;
      this.actualElement.style.width = `${this.actualElementWidth}px`;
    }
  }

  /* eslint-disable class-methods-use-this */
  deleteClone() {
    const deleteClone = document.querySelectorAll('.card-clone');
    if (deleteClone.length !== 0) {
      deleteClone.forEach((clone) => {
        clone.remove();
      });
    }
  }

  pasteClone() {
    if (this.target.parentElement !== null) {
      this.cloneElement = createdCloneCard(this.actualElement);
      if (this.postionClone()) {
        this.target.insertAdjacentHTML('afterend', this.cloneElement);
        this.target = undefined;
      } else {
        this.target.insertAdjacentHTML('beforebegin', this.cloneElement);
        this.target = undefined;
      }
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
}

/* eslint-disable no-unused-vars */
import CreatedElement from '../components/createdElements/createdElement.class';
import addCard from '../components/addCard';
import { StorageElement } from '../components/localStorage/StorageElement.class';
import dragoverHandler from '../components/dragoverHandler';

const parent = document.querySelector('.container');
/* eslint-disable no-new */
new CreatedElement(parent);

dragoverHandler();

const addClic = document.querySelectorAll('.plan-list .add-card');
addClic.forEach((addItem) => {
  if (StorageElement.getStorage(addItem) !== null) {
    addItem.previousElementSibling.insertAdjacentHTML('beforeend', StorageElement.getStorage(addItem));
  }

  addItem.addEventListener('click', (e) => {
    e.preventDefault();
    addCard(addItem);
  });
});

document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const closeElement = e.target;
  const addBtn = closeElement.parentElement.parentElement.nextElementSibling;
  if (closeElement.classList.contains('card-close')) {
    closeElement.parentElement.remove();
    StorageElement.setStorage(addBtn);
  }
});

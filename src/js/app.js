/* eslint-disable no-unused-vars */
import CreatedElement from '../components/createdElements/createdElement.class';
import addCard from '../components/addCard';
import { StorageElement } from '../components/localStorage/StorageElement.class';
import dragoverHandler from '../components/dragoverHandler';

const parent = document.querySelector('.container');
/* eslint-disable no-new */
new CreatedElement(parent);

/* eslint-disable  new-cap */
const dragover = new dragoverHandler();
dragover.start();

const addClic = document.querySelectorAll('.plan-list .add-card');
addClic.forEach((addItem) => {
  if (StorageElement.getStorage(addItem) !== null) {
    addItem.previousElementSibling.insertAdjacentHTML('beforeend', StorageElement.getStorage(addItem));
  }

  addItem.addEventListener('click', (e) => {
    e.preventDefault();
    const textareaElement = document.querySelectorAll('textarea');
    if (textareaElement.length > 0) {
      textareaElement.forEach((textarea) => {
        textarea.parentElement.parentElement.querySelector('.add-card').classList.remove('hidden');
        textarea.parentElement.parentElement.querySelector('.btn').classList.add('hidden');
        textarea.remove();
      });
    }
    addCard(addItem);
  });
});

// document.addEventListener('mousedown', (e) => {
//   e.preventDefault();

//   const closeElement = e.target;
//   console.log(closeElement.parentElement);
//   const addBtn = closeElement.parentElement.parentElement.nextElementSibling;
//   if (closeElement.classList.contains('card-close')) {
//     closeElement.parentElement.remove();
//     StorageElement.setStorage(addBtn);
//   }
// });

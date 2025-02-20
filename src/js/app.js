/* eslint-disable no-unused-vars */
import CreatedElement from '../components/createdElements/createdElement.class';
import addCard from '../components/addCard';
import { StorageElement } from '../components/localStorage/StorageElement.class';
import DragoverHandler from '../components/DragoverHandler.class';

const parent = document.querySelector('.container');
/* eslint-disable no-new */
new CreatedElement(parent);

/* eslint-disable no-new */
new DragoverHandler();

const addClick = document.querySelectorAll('.plan-list .add-card');
addClick.forEach((addItem) => {
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


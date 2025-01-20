import { createdCard } from './createdElements/createdCard';
import { StorageElement } from './localStorage/StorageElement.class';

export default function inputTitleCard(cardList) {
  const addCard = cardList.nextElementSibling;
  addCard.classList.add('hidden');
  /* eslint-disable no-use-before-define */
  cardList.insertAdjacentHTML('beforeend', markup());
  const inputText = document.querySelector('textarea');
  inputText.focus();
  const btnBox = addCard.nextElementSibling;
  btnBox.classList.remove('hidden');
  const btnAdd = btnBox.firstChild;
  const btnAddClose = btnAdd.nextElementSibling;
  btnAdd.onclick = function clickAdd() {
    btnBox.classList.add('hidden');
    addCard.classList.remove('hidden');
    cardList.insertAdjacentHTML('beforeend', createdCard(inputText.value));
    inputText.remove();
    StorageElement.setStorage(addCard);
  };
  
  btnAddClose.onclick = function clickAddClose() {
    btnBox.classList.add('hidden');
    addCard.classList.remove('hidden');
    inputText.remove();
  };
}

function markup() {
  return `
    <textarea
      class="input"
      name="comment"
    >
    </textarea>
  `;
}

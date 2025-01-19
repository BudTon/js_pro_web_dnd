import { StorageElement } from './localStorage/StorageElement.class';
import createdCloneCard from './createdCloneCard/createdCloneCard';

export default function dragoverHandler() {
  const addCardList = document.querySelectorAll('.add-card');
  const items = document.querySelectorAll('.card-list');
  let actualElement;
  let shiftY;
  let shiftX;
  let cloneElement;

  items.forEach((item) => {
    const onMouseOver = (e) => {
      const actualElementWidth = item.offsetWidth;
      actualElement.style.top = `${e.clientY - shiftY}px`;
      actualElement.style.left = `${e.clientX - shiftX}px`;
      actualElement.style.width = `${actualElementWidth}px`;

      if (e.target.parentElement.classList.contains('card-item')) {
        // e.target.parentElement.style.cursor = "grabbing"
        e.target.parentElement.insertAdjacentHTML('afterend', cloneElement);
      } else if (document.querySelector('.card-clone')) {
        document.querySelector('.card-clone').remove();
        // e.target.parentElement.style.cssText = '';
      }
    };

    const onMouseUp = (e) => {
      const mouseUpItem = e.target.parentElement;
      if (mouseUpItem.classList.contains('card-item')) {
        mouseUpItem.insertAdjacentElement('afterend', actualElement);
      }
      actualElement.classList.remove('dragged');
      actualElement.style.cssText = '';
      actualElement = undefined;
      document.documentElement.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseover', onMouseOver);
      if (document.querySelector('.card-clone')) {
        document.querySelector('.card-clone').remove();
      }
      addCardList.forEach((addCard) => {
        StorageElement.setStorage(addCard);
      });
    };

    item.addEventListener('mousedown', (e) => {
      e.preventDefault();
      actualElement = e.target.parentElement;
      
      const { top, left } = actualElement.getBoundingClientRect();
      shiftY = e.pageY - top;
      shiftX = e.pageX - left;
      if (actualElement.classList.contains('card-item')) {
        cloneElement = createdCloneCard(actualElement);
        actualElement.classList.add('dragged');
        document.documentElement.addEventListener('mouseup', onMouseUp);
        document.documentElement.addEventListener('mouseover', onMouseOver);
      }
    });
  });
}

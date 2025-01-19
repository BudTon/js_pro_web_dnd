import inputTitleCard from './inputTitleCard';

export default function addCard(element) {
  const cardList = element.previousElementSibling;
  inputTitleCard(cardList);
}

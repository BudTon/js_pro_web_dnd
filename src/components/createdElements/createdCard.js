/* eslint-disable import/prefer-default-export */
export function createdCard(titleCard) {
  return `
  <div class="card-item">
    <div class="card-close"></div>
    <div class="card-title">${titleCard}</div>
  </div>
  `;
}

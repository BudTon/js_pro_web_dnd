export default function createdCloneCard(ActualCard) {
  const width = ActualCard.offsetWidth;
  const height = ActualCard.offsetHeight;
  return `
  <div class="card-clone" style="width:${width}px; height:${height}px">
  </div>
  `;
}

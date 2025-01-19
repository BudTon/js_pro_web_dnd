export default class CreatedElement {
  constructor(parent) {
    this.parent = parent;
    this.init();
  }

  init() {
    this.parent.insertAdjacentHTML('beforeend', '<h1>6. Домашнее задание к занятию "Работа с файлами, DnD"</h1>');
    this.parent.insertAdjacentHTML('beforeend', '<h2>6.1 Trello</h2>');
    this.parent.insertAdjacentHTML('beforeend', '<div class="forms"></div>');
    const forms = document.querySelector('.forms');
    forms.insertAdjacentHTML('beforeend', '<ul class="planner"></ul>');
    const planner = document.querySelector('.planner');
    planner.insertAdjacentHTML('beforeend', '<li class="plan-list todo">TODO</ul>');
    planner.insertAdjacentHTML('beforeend', '<li class="plan-list in-progress">IN PROGRESS</ul>');
    planner.insertAdjacentHTML('beforeend', '<li class="plan-list done">DONE</ul>');
    const liList = planner.querySelectorAll('li');
    liList.forEach((li) => {
      li.insertAdjacentHTML('beforeend', '<div class="card-list"></div>');
      li.insertAdjacentHTML('beforeend', '<div class="add-card"> + Add another card </div>');
      li.insertAdjacentHTML('beforeend', '<div class="btn hidden"></div>');
    });
    const btnAdd = document.querySelectorAll('.btn');
    btnAdd.forEach((btn) => {
      btn.insertAdjacentHTML('beforeend', '<button type="button" class="btn-add">Add</button>');
      btn.insertAdjacentHTML('beforeend', '<button type="button" class="btn-add-close">X</button>');
    });
  }
}

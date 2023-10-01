import { addNotMarkToActivDay } from "./counter.js";
import { markAllDone, buttonMarkAllDone } from "./markAllDone.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage.js";

// оголошую глобальні змінні
const buttonAdd = document.querySelector('#toAdd');
const buttonClear = document.getElementById('clear');
export const buttonSortByImportant = document.getElementById('btnSort');
const inputTextArea = document.getElementById('inputTextArea');
const checkboxMarkAsImportant = document.querySelector('.checkboxMarkAsImportant');
const daysWeek = document.querySelectorAll('.form-check-input');
let counterForCheckboxId = 1;

// всі кнопки крім Добавити не активні
buttonSortByImportant.disabled = true;
buttonMarkAllDone.disabled = true;
buttonClear.disabled = true;

// loadFromLocalStorage();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addIteminList();
})

// подія на дні тижня
daysWeek.forEach(day => {
    day.addEventListener('change', selectActiveDay);
});

function selectActiveDay() {
    //додаю клас активний вибраному елементу
    daysWeek.forEach(day => day.classList.remove('active'));
    this.classList.add('active');
    const activDayId = this.getAttribute('id');
    const daysForListContainer = document.querySelectorAll('.day-list');
    const listContainers = document.querySelectorAll('.listContainer');
    //додаю клас до відповідного списку задач
    daysForListContainer.forEach(day => {
        day.classList.remove('activeDayList');
        if (day.getAttribute('id') === `${activDayId}-list`) {
            day.classList.add('activeDayList');
            listContainers.forEach(x => {
                x.classList.remove('activeListContainer');
            })
            day.firstElementChild.classList.add('activeListContainer');
        }
    })

    changeOfStateButton();

    const nameActivDay = document.querySelector('.nameActivDay');
    let nameValue = this.closest('.form-check').querySelector('label').textContent;
    nameActivDay.textContent = `${nameValue}`;
}

//активність кнопок на події
function changeOfStateButton() {
    const checkedOrdinaryCheckbox = document.querySelectorAll('.activeDayList .activeListContainer .ordinary-notMark');
    const checkedImportantCheckbox = document.querySelectorAll('.activeDayList .activeListContainer .important-notMark');
    const ifListHaveItem = document.querySelectorAll('.activeListContainer .itemContainer');
    checkedOrdinaryCheckbox.length > 0 ? buttonMarkAllDone.disabled = false : buttonMarkAllDone.disabled = true;
    checkedOrdinaryCheckbox.length + checkedImportantCheckbox.length > 1
        ? buttonSortByImportant.disabled = false
        : buttonSortByImportant.disabled = true;
    ifListHaveItem.length > 0 ? buttonClear.disabled = false : buttonClear.disabled = true;
}

function addIteminList() {
    const listContainer = document.querySelector('.activeListContainer');
    // створюю контайнер із чекбоксом та лейблом
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('itemContainer');
    itemContainer.classList.add('ordinary-notMark');

    const checkboxForItem = document.createElement('input');
    checkboxForItem.classList.add('form-check-input', 'checkboxForItem');
    checkboxForItem.setAttribute('type', 'checkbox');
    checkboxForItem.setAttribute('name', 'checkboxForItem');

    const labelForCheckboxItem = document.createElement('label');
    labelForCheckboxItem.classList.add('labelForCheckboxItem');

    // додаю атрибути до чекбоксу і лейблу
    checkboxForItem.setAttribute('id', `checkboxForItem${counterForCheckboxId}`);
    labelForCheckboxItem.setAttribute('for', `checkboxForItem${counterForCheckboxId}`);

    // якщо поле заповнене, додаю у лістконтейнер
    if (inputTextArea.value.trim() !== '') {
        itemContainer.append(checkboxForItem);
        itemContainer.append(labelForCheckboxItem);
        labelForCheckboxItem.textContent = inputTextArea.value;
        inputTextArea.value = '';
        listContainer.prepend(itemContainer);

        counterForCheckboxId++;
        // роблю кнопки активними
        buttonMarkAllDone.disabled = false;
        buttonClear.disabled = false;

        // якщо чекбокс "Важливо" активований, змінюю колір та клас для сортування
        if (checkboxMarkAsImportant.checked) {
            labelForCheckboxItem.style.color = '#4633c3';
            itemContainer.classList.remove('ordinary-notMark');
            itemContainer.classList.add('important-notMark');
            checkboxMarkAsImportant.checked = false;
        }

        //логіка для кнопки сортувати
        let listContainerLength = document.querySelectorAll('.itemContainer').length;
        let importantItemContainers = document.querySelectorAll('.important-notMark');
        listContainerLength > 1 && importantItemContainers.length > 0
            ? buttonSortByImportant.disabled = false
            : buttonSortByImportant.disabled = true;

        //додаю до назви активного дня кількість не виконаних завдань
        addNotMarkToActivDay();
        saveToLocalStorage();

        // якщо чекбокс чекнули - роблю не активним, перекреслюю текст, кидаю у низ, змінюю клас для сортування
        checkboxForItem.addEventListener('change', function () {
            if (this.checked) {
                this.disabled = true;
                labelForCheckboxItem.style.textDecoration = 'line-through';
                listContainer.appendChild(itemContainer);
                itemContainer.className = '';
                itemContainer.classList.add('itemContainer');
                itemContainer.classList.add('markedAsDone');
                saveToLocalStorage();
            }
            const allOrdinaryCheckboxesForItem = document.querySelectorAll('.activeDayList .activeListContainer .ordinary-notMark');
            const allImptCheckboxesForItem = document.querySelectorAll('.activeDayList .activeListContainer .important-notMark');
            if (allOrdinaryCheckboxesForItem.length + allImptCheckboxesForItem.length < 1) {
                buttonMarkAllDone.disabled = true;
                buttonSortByImportant.disabled = true;
            }
            addNotMarkToActivDay();
            saveToLocalStorage();
        })
    }
}

const AllCheckbox = document.querySelectorAll('.checkboxForItem');

function clearListContainer() {
    const listContainer = document.querySelector('.activeListContainer');
    if (listContainer.innerHTML !== '') {
        listContainer.innerHTML = '';
        counterForCheckboxId = 1;
        buttonClear.disabled = true;
        buttonSortByImportant.disabled = true;
        buttonMarkAllDone.disabled = true;
    }
    addNotMarkToActivDay();
}

function sortItemByImportant() {
    const listContainer = document.querySelector('.activeListContainer');
    let ordinaryArr = [...document.querySelectorAll('.activeListContainer .ordinary-notMark')];
    let importantArr = [...document.querySelectorAll('.activeListContainer .important-notMark')];
    let makrArr = [...document.querySelectorAll('.activeListContainer .markedAsDone')];

    listContainer.innerHTML = '';

    importantArr.forEach((important) => listContainer.append(important));
    ordinaryArr.forEach((ordinary) => listContainer.append(ordinary));
    makrArr.forEach((mark) => listContainer.append(mark));

    buttonSortByImportant.disabled = true;
}

buttonAdd.addEventListener('click', addIteminList);
buttonMarkAllDone.addEventListener('click', markAllDone);
buttonClear.addEventListener('click', clearListContainer);
buttonSortByImportant.addEventListener('click', sortItemByImportant);

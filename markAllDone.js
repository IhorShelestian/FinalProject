import { buttonSortByImportant } from "./index.js";
import { addNotMarkToActivDay } from "./counter.js";
import { saveToLocalStorage } from "./localStorage.js";
export const buttonMarkAllDone = document.getElementById('markAllDone');
export function markAllDone() {
    // Шукаю звичайні непомічені чекбкси, відмічаю, змінюю клас і стиль
    const allOrdinaryCheckboxesForItem = document.querySelectorAll('.activeDayList .activeListContainer .ordinary-notMark');
    allOrdinaryCheckboxesForItem.forEach(checkbox => {
        checkbox.children[0].checked = true;
        checkbox.children[0].disabled = true;
        checkbox.children[1].style.textDecoration = 'line-through';
        checkbox.classList.remove('ordinary-notMark');
        checkbox.classList.add('markedAsDone');
        buttonMarkAllDone.disabled = true;
        buttonSortByImportant.disabled = true;
    });

    // Шукаю важливі непомічені чекбкси, відмічаю, змінюю клас і стиль
    const allImptCheckboxesForItem = document.querySelectorAll('.activeDayList .activeListContainer .important-notMark');
    allImptCheckboxesForItem.forEach(checkbox => {
        checkbox.children[0].checked = true;
        checkbox.children[0].disabled = true;
        checkbox.children[1].style.textDecoration = 'line-through';
        checkbox.classList.remove('important-notMark');
        checkbox.classList.add('markedAsDone');
        buttonMarkAllDone.disabled = true;
        buttonSortByImportant.disabled = true;
    });
    addNotMarkToActivDay();
    saveToLocalStorage();
}
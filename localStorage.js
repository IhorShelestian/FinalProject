export function saveToLocalStorage() {
    const storage = [];
    const days = document.querySelectorAll('.day-list');
    days.forEach(day => {
        const idDay = day.getAttribute('id');
        const itemContainers = day.querySelectorAll('.listContainer .itemContainer');
        itemContainers.forEach(x => {
            const checkbox = x.firstElementChild;
            const label = x.lastElementChild;
            let classItemContainer = x.className.split(' ').pop();
            function makeItem(idDay, classItem, ifChecked, text, idCheckbox, forLabel) {
                return {
                    idDay: idDay,
                    classItem: classItem,
                    ifChecked: ifChecked,
                    labelText: text,
                    idCheckbox: idCheckbox,
                    forLabel: forLabel
                }
            }
            storage.push(makeItem(
                idDay, 
                classItemContainer, 
                checkbox.disabled, 
                label.textContent, 
                checkbox.getAttribute('id'),
                label.getAttribute('for')));
        })
    })
    localStorage.setItem('storage', JSON.stringify(storage));
}


export function loadFromLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('storage'));

    const days = document.querySelectorAll('.day-list');
    days.forEach(day => {
        const idDay = day.getAttribute('id');
        if (storage) {
            storage.forEach(x => {
                if (idDay === x.idDay) {
                    const itemContainer = document.createElement('div');
                    itemContainer.classList.add(`${x.classItem}`);

                    const checkboxForItem = document.createElement('input');
                    checkboxForItem.classList.add('form-check-input', 'checkboxForItem');
                    checkboxForItem.setAttribute('type', 'checkbox');
                    checkboxForItem.setAttribute('name', 'checkboxForItem');
                    checkboxForItem.setAttribute('id', `${x.idCheckbox}`);
                    checkboxForItem.disabled = x.ifChecked;
                    checkboxForItem.checked = x.ifChecked;
                    
                    const labelForCheckboxItem = document.createElement('label');
                    labelForCheckboxItem.classList.add('labelForCheckboxItem');
                    labelForCheckboxItem.textContent = x.labelText;
                    labelForCheckboxItem.setAttribute('for', `${x.forLabel}`);
                    if (x.ifChecked === true) labelForCheckboxItem.style.textDecoration = 'line-through';
                    
                    itemContainer.append(checkboxForItem);
                    itemContainer.append(labelForCheckboxItem);
                    
                    const listContainer = day.querySelector('.listContainer');
                    listContainer.prepend(itemContainer);
                }
            })
        }
    })
}




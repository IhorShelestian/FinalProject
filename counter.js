export function addNotMarkToActivDay() {
    const labelActivDay = document.querySelector('.active').closest('.form-check').querySelector('span');
    const ordinary = document.querySelectorAll('.activeListContainer .ordinary-notMark').length;
    const important = document.querySelectorAll('.activeListContainer .important-notMark').length;
    if (ordinary + important === 0) {
        labelActivDay.textContent = '';
    } else {
        labelActivDay.textContent = ordinary + important;
    }
}
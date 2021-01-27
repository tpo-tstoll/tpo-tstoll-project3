// Global Variables

const nameInput = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const jobSelector = document.getElementById('title');
const shirtDesignSelector = document.getElementById('design');
const shirtColorSelector = document.getElementById('color');
const shirtColorOptions = shirtColorSelector.children;

//Set focus to name input 
nameInput.focus();

//Hide other job role field
otherJobInput.style.display = 'none';

//Display or hide other job input field based upon selection
jobSelector.addEventListener('change', (e) => {
    e.preventDefault();
    const jobSelected = e.target;
    if (e.target.value === 'other') {
        otherJobInput.style.display = '';
    } else {
        otherJobInput.style.display = 'none';
    };
});

//Disable color selector
shirtColorSelector.disabled = true;

shirtDesignSelector.addEventListener('change', (e) => {
    e.preventDefault();
    const designSelected = e.target;
    const selectedValue = designSelected.value;
    shirtColorSelector.disabled = false;
    if (selectedValue === 'js puns') {
        for (let i = 0; i < shirtColorOptions.length; i++) {
            let colorOptionTheme = shirtColorOptions[i].getAttribute('data-theme');
            if (colorOptionTheme === 'heart js') {
                shirtColorOptions[i].setAttribute'(hidden, '');
            };
        };
    } else if (selectedValue === 'heart js') {
        for (let i = 0; i < shirtColorOptions.length; i++) {
            let colorOptionTheme = shirtColorOptions[i].getAttribute('data-theme');
            if (colorOptionTheme === 'js puns') {
                shirtColorOptions[i].setAttribute(hidden, '');
            };
        };
    };
})
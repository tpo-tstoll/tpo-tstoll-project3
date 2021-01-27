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


// Display shirt colors based upon selection
shirtDesignSelector.addEventListener('change', (e) => {
    e.preventDefault();
    shirtColorSelector.disabled = false;
    for (let i = 0; i < shirtColorOptions.length; i++) {
        if(shirtColorOptions[i].getAttribute('data-theme') !== e.target.value){
            shirtColorOptions[i].style.display = 'none';
        } else {
            shirtColorOptions[i].style.display = '';
        }
    }; 
})
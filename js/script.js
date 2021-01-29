// Global Variables

const nameInput = document.getElementById('name');
const otherJobInput = document.getElementById('other-job-role');
const jobSelector = document.getElementById('title');
const shirtDesignSelector = document.getElementById('design');
const shirtColorSelector = document.getElementById('color');
const shirtColorOptions = shirtColorSelector.children;
const activities = document.getElementById('activities');

//Set focus to name input 
nameInput.focus();

//Hide other job role field
otherJobInput.style.display = 'none';

//Display or hide other job input field based upon selection
jobSelector.addEventListener('change', (e) => {
    e.preventDefault();
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
            shirtColorOptions[i].removeAttribute('selected');
            shirtColorOptions[i].hidden= true;
        } else {
            shirtColorOptions[i].setAttribute('selected', true);
            shirtColorOptions[i].hidden = false;
        }
    }; 
})

//Daily Activity Cost
let userCart = 0;

const activitySelection = () => {
    activities.addEventListener('change', (e) => {
        let totalCost = document.getElementById('activities-cost');
        let selectionCost = parseInt(e.target.getAttribute('data-cost'));
        if (e.target.checked) {
            userCart += selectionCost;
        } else {
            userCart -= selectionCost;
        };
        totalCost.innerHTML = `Total: $${userCart}`;
    })
}

const creditCard = document.getElementById('credit-card');

//Payment info
const paymentSelector = () => {
    const paymentMethod = document.getElementById('payment');
    const paypal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');
    paypal.hidden = true;
    bitcoin.hidden = true;
    paymentMethod.firstElementChild.nextElementSibling.setAttribute('selected', true);
    paymentMethod.addEventListener('change', (e) => {
        e.preventDefault();
        if (e.target.value === paypal.id) {
            paypal.hidden = false;
            creditCard.hidden = true;
            bitcoin.hiddent = true;
        } else if (e.target.value === bitcoin.id) {
            bitcoin.hidden = false;
            creditCard.hidden = true;
            paypal.hidden = true;
        } else {
            bitcoin.hidden = true;
            creditCard.hidden = false;
            paypal.hidden = true;
        };
    })
}


//Test validation function



//Form validation
const formValidation =() => {
    const emailInput = document.getElementById('email');
    const cardNumberInput = document.getElementById('cc-num');
    const zipCodeInput = document.getElementById('zip');
    const cvvInput = document.getElementById('cvv');
    const form = document.getElementsByTagName('form');
    const activityHint = document.getElementById('activities-hint');
    form[0].addEventListener('submit', (e) => {
        const testForm = (value, test, input) => {
            if (test != true) {
                e.preventDefault();
                input.parentElement.classList.remove('valid');
                input.parentElement.className = 'not-valid';
                input.parentElement.lastElementChild.style.display = 'block';
            } else {
                input.parentElement.classList.remove('not-valid');
                input.parentElement.className = 'valid';
                input.parentElement.lastElementChild.style.display = 'none';
            }
        };
        let nameValue = nameInput.value;
        const nameRegEx = /[(.|\s)*\S(.|\s)]/.test(nameValue); 
        let emailValue = emailInput.value;
        const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        let cardNumberValue = cardNumberInput.value;
        const cardNumberRegEx = /^[0-9]{13}(?:[0-9]{3})?$/.test(cardNumberValue);
        let zipCodeValue = zipCodeInput.value;
        const zipCodeRegEx = /^[0-9]{5}$/.test(zipCodeValue);
        let cvvValue = cvvInput.value;
        const cvvRegEx = /^[0-9]{3}$/.test(cvvValue);
        testForm(nameValue, nameRegEx, nameInput);
        testForm(emailValue, emailRegEx, emailInput);
        if (creditCard.hidden != true) {
            testForm(cardNumberValue, cardNumberRegEx, cardNumberInput);
            testForm(zipCodeValue, zipCodeRegEx, zipCodeInput);
            testForm(cvvValue, cvvRegEx, cvvInput);
        };
        if (userCart === 0) {
            e.preventDefault()
            activityHint.classList.remove('valid');
            activityHint.className = 'not-valid';
            activityHint.style.display = 'block';
        } else {
            activityHint.classList.remove('not-valid');
            activityHint.className = 'valid';
            activityHint.style.display = 'none';
        }
    });
}

//Accesibility
const focusBlur = () => {
    const focusedActivity = document.querySelectorAll('label > input[type="checkbox"]');
    for (i = 0; i < focusedActivity.length; i++) {
        focusedActivity[i].addEventListener('focus', (e) => {
            e.target.parentElement.className = 'focus';
        });
        focusedActivity[i].addEventListener('blur', (e) => {
            e.target.parentElement.className = '';
        });
    };
}


//Call functions
activitySelection();
paymentSelector();
formValidation();
focusBlur();

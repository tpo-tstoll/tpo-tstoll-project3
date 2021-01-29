// Global Variables
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const otherJobInput = document.getElementById('other-job-role');
const jobRole = document.getElementById('title');
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
const shirtColorOptions = shirtColor.children;
const activities = document.getElementById('activities');
const creditCard = document.getElementById('credit-card');
const cardNumberInput = document.getElementById('cc-num');
const activityOptions = document.querySelectorAll('label > input[type="checkbox"]');
const spanHint = document.createElement('span');
let userCart = 0;

//The pageLoad function ensures all elements on the page display correctly upon loading
const pageLoad = () => {
    nameInput.focus();
    otherJobInput.style.display = 'none';
    shirtColor.disabled = true;
}


//The jobSelector function displays the other job role input only when 'other' is selected from the roles drop down menu
const jobSelector = () => {
    jobRole.addEventListener('change', (e) => {
        e.preventDefault();
        if (e.target.value === 'other') {
            otherJobInput.style.display = '';
        } else {
            otherJobInput.style.display = 'none';
        };
    });
}

//The shirtSelector function displays the correct shirt colors based upon the design theme selected
const shirtSelector = () =>{
    shirtDesign.addEventListener('change', (e) => {
        e.preventDefault();
        shirtColor.disabled = false;
        for (let i = 0; i < shirtColorOptions.length; i++) {
            if(shirtColorOptions[i].getAttribute('data-theme') !== e.target.value){
                shirtColorOptions[i].removeAttribute('selected');
                shirtColorOptions[i].hidden= true;
            } else {
                shirtColorOptions[i].setAttribute('selected', true);
                shirtColorOptions[i].hidden = false;
            }
        }; 
    });
}

//The activityCostSelector function sums the users total cost of registration based upon the users selected activities
const activityCostSelector = () => {
    activities.addEventListener('change', (e) => {
        let totalCost = document.getElementById('activities-cost');
        let selectionCost = parseInt(e.target.getAttribute('data-cost'));
        if (e.target.checked) {
            userCart += selectionCost;
        } else {
            userCart -= selectionCost;
        };
        totalCost.innerHTML = `Total: $${userCart}`;
    });
}

//The activitySchedularVerification function ensures a user cannot register for activities with conflicting dates and times
const activityScheduleVerification = () => {
    activities.addEventListener('change', (e) => {
        for (i = 0; i < activityOptions.length; i++) {
            let selectionTime = e.target.getAttribute('data-day-and-time');
            if (selectionTime === activityOptions[i].getAttribute('data-day-and-time') && e.target.checked) {
                activityOptions[i].disabled = true;
                if (activityOptions[i].checked) {
                activityOptions[i].disabled = true;
                }; 
            } else if (selectionTime === activityOptions[i].getAttribute('data-day-and-time') && e.target.checked != true) {
                activityOptions[i].disabled = false;
            };
            e.target.disabled = false;
        };
    });
}

//The paymentSelector displays and hides the desired payment option based upon user selection
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
    });
}


/* The formSubmitValidation confirms all required fields have been completed correctly when the user submits the form
    name field - the name field cannot blank, class will change and hint will be displayed if requirement is not met
    email field - the email field must be correctly formated, class will change and hint will be displayed if requirement is not met
    activity field - one activity must be selected, class will change and hint will be displayed if requirement is not met
    credit card field - this field will only display if credit card is selected
        credit card number - this fied requireds a 13-16 digit number, class will change and conditional hint will be displayed if requirement is not met by being to short or other
        zip code - this field requires a 5 digit number, class will change and hint will be displayed if requirement is not met
        cvv - this field requires a 3 digit number, class will change and hint will be displayed if requirement is not met
The form will not submit until the user has met all requirements*/
const formSubmitValidation =() => {
    const zipCodeInput = document.getElementById('zip');
    const cvvInput = document.getElementById('cvv');
    const form = document.getElementsByTagName('form');
    const activityHint = document.getElementById('activities-hint');
    form[0].addEventListener('submit', (e) => {
        let nameValue = nameInput.value;
        const nameRegEx = /[^\s]/.test(nameValue); 
        let emailValue = emailInput.value;
        const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
        let cardNumberValue = cardNumberInput.value;
        const cardNumberRegEx = /^[0-9]{13}(?:[0-9]{1,3})?$/.test(cardNumberValue);
        let zipCodeValue = zipCodeInput.value;
        const zipCodeRegEx = /^[0-9]{5}$/.test(zipCodeValue);
        let cvvValue = cvvInput.value;
        const cvvRegEx = /^[0-9]{3}$/.test(cvvValue);
        const testForm = (value, test, input) => {
            if (test != true) {
                e.preventDefault();
                input.parentElement.classList.remove('valid');
                input.parentElement.className = 'not-valid';
                input.parentElement.lastElementChild.style.display = 'block';
                spanHint.remove();
            } else {
                input.parentElement.classList.remove('not-valid');
                input.parentElement.className = 'valid';
                input.parentElement.lastElementChild.style.display = 'none';
            };
        };  
        testForm(nameValue, nameRegEx, nameInput);
        testForm(emailValue, emailRegEx, emailInput);
        if (creditCard.hidden != true) {
            testForm(cardNumberValue, cardNumberRegEx, cardNumberInput);
            testForm(zipCodeValue, zipCodeRegEx, zipCodeInput);
            testForm(cvvValue, cvvRegEx, cvvInput);
            if (cardNumberValue.length < 13) {
                e.preventDefault();
                spanHint.innerHTML = 'Oops! You must enter at least 13 numbers';
                spanHint.classList.add('hint');
                cardNumberInput.parentElement.appendChild(spanHint);
                cardNumberInput.parentElement.lastChild.style.display = 'Block';
                spanHint.previousElementSibling.style.display = 'none';
            } else {
                spanHint.remove();
            };
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

//The formKeyUpValidation dynamically tests the users input in the name field to provide real time verification the input is formatted correctly
const formKeyUpValidation =() => {
    nameInput.addEventListener('keyup', (e) => { 
    const nameRegEx = /[^\s]/.test(nameInput.value); 
        if (nameRegEx) {
            nameInput.parentElement.classList.remove('not-valid');
            nameInput.parentElement.className = 'valid';
            nameInput.parentElement.lastElementChild.style.display = 'none';
        } else {
            nameInput.parentElement.classList.remove('valid');
            nameInput.parentElement.className = 'not-valid';
            nameInput.parentElement.lastElementChild.style.display = 'block';
        };
    });
}

//The focusBlur function adds the focus class and blur class to the correct elements within the registration section
const focusBlur = () => {
    for (i = 0; i < activityOptions.length; i++) {
        activityOptions[i].addEventListener('focus', (e) => {
            e.target.parentElement.className = 'focus';
        });
        activityOptions[i].addEventListener('blur', (e) => {
            e.target.parentElement.className = '';
        });
    };
}


//Call functions
pageLoad();
jobSelector();
shirtSelector();
activityCostSelector();
activityScheduleVerification();
paymentSelector();
formSubmitValidation();
formKeyUpValidation();
focusBlur();

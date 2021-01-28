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

const activitySelection = () => {
    const activities = document.getElementById('activities');
    let userCart = 0;
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

//Payment info
const paymentSelector = () => {
    const paymentMethod = document.getElementById('payment');
    const creditCard = document.getElementById('credit-card');
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


//Call functions
activitySelection();
paymentSelector();

// UI Variables
let loanAmount = document.querySelector('#amount');
let interest = document.querySelector('#interest');
let yearsToPay = document.querySelector('#years');
let monthlyPaymentInput = document.querySelector('#monthly-payment');
let totalPaymentInput = document.querySelector('#total-payment');
let totalInterestInput = document.querySelector('#total-interest');

// set up event listeners
setUpEventListeners();
function setUpEventListeners(){
    document.addEventListener('click',function(e){
        e.preventDefault();
        if(e.target.classList.contains('calcBtn')){
            document.querySelector('#loading').style.display = 'block';
            setTimeout(calcLoan, 1500);
        }
    })
}

// Loan Calc function
let calcLoan = function(){
    let totalInterest = parseFloat(interest.value) / 100 / 12;
    let totalPayment = parseFloat(yearsToPay.value) * 12;

    // calc monthly payment
    const x = Math.pow( 1 + totalInterest, totalPayment);
    const monthly = (parseFloat(loanAmount.value) * x * totalInterest)/(x-1);
     
    if(isFinite(monthly)){
        monthlyPaymentInput.value = monthly.toFixed(2);
        totalPaymentInput.value = (monthly * totalPayment).toFixed(2);
        totalInterestInput.value = ((monthly * totalPayment)- loanAmount.value).toFixed(2);
        // show results & hide spinner
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#results').style.display = 'block';
    } else { 
        
        showError('Please check your numbers');
    }
}


// show error message if numbers are all filled out
function showError(errorMessage){
    //hide spinner
    document.querySelector('#loading').style.display = 'none';
    // create new element
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('alert','alert-danger');
    errorDiv.appendChild(document.createTextNode(errorMessage));

    // insert new element into DOM
    let header = document.querySelector('.heading');
    let card = document.querySelector('.card');
    
    card.insertBefore(errorDiv,header);

    // clear message after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}
// Loan Calc Display in UI function
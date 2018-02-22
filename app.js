// ui elements
const selectCurrencylist = document.getElementById('currencylist');
const selectCurrencyTolist = document.getElementById('currencyTolist');
const amount = document.getElementById('amount');
const from = document.getElementById('from');
const to = document.getElementById('to');
const targetCurrency = document.getElementById('targetCurrency');
const fromto = document.getElementById('fromto');

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  // first versio: get from local json file
  const currencyValues = getCurrencyValues();
});

// select currency from -change event 
selectCurrencylist.addEventListener('change', function() {
  from.value = selectCurrencylist.value;
});
// select currency to -change event
selectCurrencyTolist.addEventListener('change', function() {
  to.value = selectCurrencyTolist.value;
});



// Listen for submit
document.getElementById('converter-form').addEventListener('submit', function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 500);

  e.preventDefault();
});

// Calculate Results
function calculateResults(){
  
  console.log('Calculating...');

  const exRate = parseFloat(to.value) / parseFloat(from.value);

  console.log(exRate);

  const totalAmount = parseFloat(amount.value) * exRate;

  targetCurrency.value = totalAmount.toFixed(2);

  // edit targetCurrency text
  const fromCurrency = selectCurrencylist.options[selectCurrencylist.selectedIndex].text;
  const toCurrency = selectCurrencyTolist.options[selectCurrencyTolist.selectedIndex].text;
  fromto.textContent = `From ${fromCurrency} to ${toCurrency}`;

  // Show results
  document.getElementById('results').style.display = 'block';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // } else {
  //   showError('Please check your numbers');
  // }

}

function getCurrencyValues() {
  const xhr = new XMLHttpRequest();
  let currencyArray = [];

  xhr.open('GET', 'currencyvalues.json', true); // pitäiskö olla true ja muokata asynkroniseksi

  xhr.onload = function() {
    if (this.status === 200) {
      const currencyValues = JSON.parse(this.responseText);
      // add to DOM
      listCurrencies(currencyValues);
    }
  }
 
  xhr.send();

  return currencyArray;
}

function listCurrencies(currencyValues) {
  if (currencyValues) {
    console.log(currencyValues);
    // loop currencies
    currencyValues.forEach(currencyData => {
      // create option element
      let from = document.createElement('option');
      from.value = `${currencyData.rate}`;
      from.appendChild(document.createTextNode(`${currencyData.name}`));
      // add to selects (from)
      selectCurrencylist.appendChild(from);
    });
    // loop currencies
    currencyValues.forEach(currencyData => {
      // create option element
      let to = document.createElement('option');
      to.value = `${currencyData.rate}`;
      to.appendChild(document.createTextNode(`${currencyData.name}`));
      // add to selects (to)
      selectCurrencyTolist.appendChild(to);
    });
  }
}

// not in use
// Show Error
function showError(error){
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}
function calculateMRP() {
  const mrp = parseFloat(document.getElementById("mrp").value);
  const amount = parseFloat(document.getElementById("amountInput").value);
  const grams = parseFloat(document.getElementById("gramInput").value);
  const weightResult = document.getElementById("weightResult");
  const priceResult = document.getElementById("priceResult");
  const weightDisplay = weightResult.closest('.result-display');
  const priceDisplay = priceResult.closest('.result-display');

  // Reset results to dash if no MRP is entered
  if (!mrp) {
    weightResult.textContent = "Enter MRP per KG";
    weightDisplay.className = 'result-display prompt';
    priceResult.textContent = "Enter MRP per KG";
    priceDisplay.className = 'result-display prompt';
    return;
  }

  // Validate MRP
  if (mrp <= 0) {
    weightResult.textContent = "MRP must be greater than 0";
    weightDisplay.className = 'result-display error';
    priceResult.textContent = "MRP must be greater than 0";
    priceDisplay.className = 'result-display error';
    return;
  }

  // Calculate weight from amount
  if (amount) {
    if (amount <= 0) {
      weightResult.textContent = "Amount must be greater than 0";
      weightDisplay.className = 'result-display error';
    } else {
      const calculatedGrams = (amount * 1000) / mrp;
      if (calculatedGrams >= 1000) {
        const kgs = calculatedGrams / 1000;
        weightResult.textContent = `${calculatedGrams.toFixed(2)}g (${kgs.toFixed(2)}kg)`;
      } else {
        weightResult.textContent = `${calculatedGrams.toFixed(2)}g`;
      }
      weightDisplay.className = 'result-display';
    }
  } else {
    weightResult.textContent = "Enter amount";
    weightDisplay.className = 'result-display prompt';
  }

  // Calculate price from grams
  if (grams) {
    if (grams <= 0) {
      priceResult.textContent = "Weight must be greater than 0";
      priceDisplay.className = 'result-display error';
    } else {
      const calculatedPrice = (grams * mrp) / 1000;
      priceResult.textContent = `₹${calculatedPrice.toFixed(2)}`;
      priceDisplay.className = 'result-display';
    }
  } else {
    priceResult.textContent = "Enter weight";
    priceDisplay.className = 'result-display prompt';
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const content = document.querySelector(".content");
  sidebar.classList.toggle("active");
  content.classList.toggle("sidebar-active");
}

function showCalculator(calculatorId) {
  // Hide all calculators
  const calculators = document.querySelectorAll('.calculator');
  calculators.forEach(calc => calc.style.display = 'none');
  
  // Show selected calculator
  document.getElementById(`${calculatorId}-calculator`).style.display = 'block';
  
  // Update active state in sidebar
  const sidebarItems = document.querySelectorAll('.sidebar ul li');
  sidebarItems.forEach(item => item.classList.remove('active'));
  event.target.classList.add('active');
  
  // Update page title
  document.querySelector('.topbar h1').textContent = event.target.textContent;

  // Close sidebar on mobile devices
  if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar");
      const content = document.querySelector(".content");
      sidebar.classList.remove("active");
      content.classList.remove("sidebar-active");
  }
}

// Add debounce function for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function calculatePercentage() {
  const totalMarks = parseFloat(document.getElementById('total-marks').value);
  const marksObtained = parseFloat(document.getElementById('marks-obtained').value);
  const resultElement = document.getElementById('percentageResult');

  // If both inputs are empty, show dash
  if (!totalMarks && !marksObtained) {
    resultElement.textContent = '-';
    resultElement.style.color = '#2e7d32';
    return;
  }

  // If only total marks is entered
  if (totalMarks && !marksObtained) {
    resultElement.textContent = 'Enter marks obtained';
    resultElement.style.color = '#666';
    return;
  }

  // If only marks obtained is entered
  if (!totalMarks && marksObtained) {
    resultElement.textContent = 'Enter total marks';
    resultElement.style.color = '#666';
    return;
  }

  // Validate inputs
  if (isNaN(totalMarks) || isNaN(marksObtained)) {
    resultElement.textContent = 'Please enter valid numbers';
    resultElement.style.color = '#dc3545';
    return;
  }

  if (totalMarks <= 0) {
    resultElement.textContent = 'Total marks must be greater than 0';
    resultElement.style.color = '#dc3545';
    return;
  }

  if (marksObtained < 0) {
    resultElement.textContent = 'Marks obtained cannot be negative';
    resultElement.style.color = '#dc3545';
    return;
  }

  if (marksObtained > totalMarks) {
    resultElement.textContent = 'Marks obtained cannot be greater than total marks';
    resultElement.style.color = '#dc3545';
    return;
  }

  // Calculate percentage
  const percentage = (marksObtained / totalMarks) * 100;
  
  // Display result with 2 decimal places
  resultElement.textContent = `${percentage.toFixed(2)}%`;
  resultElement.style.color = '#2e7d32';
}

// Create debounced version of calculatePercentage
const debouncedCalculatePercentage = debounce(calculatePercentage, 300);

// Add event listeners for live calculation
document.addEventListener('DOMContentLoaded', function() {
  const totalMarksInput = document.getElementById('total-marks');
  const marksObtainedInput = document.getElementById('marks-obtained');
  
  if (totalMarksInput && marksObtainedInput) {
    totalMarksInput.addEventListener('input', debouncedCalculatePercentage);
    marksObtainedInput.addEventListener('input', debouncedCalculatePercentage);
  }
});

function calculateDiscount() {
  const originalPrice = parseFloat(document.getElementById("original-price").value);
  const discountPercent = parseFloat(document.getElementById("discount-percent").value);
  const originalPriceResult = document.getElementById("originalPriceResult");
  const discountAmountResult = document.getElementById("discountAmountResult");
  const finalPriceResult = document.getElementById("finalPriceResult");
  const originalPriceDisplay = originalPriceResult.closest('.result-display');
  const discountAmountDisplay = discountAmountResult.closest('.result-display');
  const finalPriceDisplay = finalPriceResult.closest('.result-display');

  // If both inputs are empty, show dashes
  if (!originalPrice && !discountPercent) {
    originalPriceResult.textContent = "-";
    discountAmountResult.textContent = "-";
    finalPriceResult.textContent = "-";
    originalPriceDisplay.className = 'result-display prompt';
    discountAmountDisplay.className = 'result-display prompt';
    finalPriceDisplay.className = 'result-display final-price prompt';
    return;
  }

  // Validate original price
  if (originalPrice) {
    if (originalPrice <= 0) {
      originalPriceResult.textContent = "Price must be greater than 0";
      originalPriceDisplay.className = 'result-display error';
      discountAmountResult.textContent = "-";
      finalPriceResult.textContent = "-";
      discountAmountDisplay.className = 'result-display prompt';
      finalPriceDisplay.className = 'result-display final-price prompt';
      return;
    }
    originalPriceResult.textContent = `₹${originalPrice.toFixed(2)}`;
    originalPriceDisplay.className = 'result-display';
  } else {
    originalPriceResult.textContent = "Enter original price";
    originalPriceDisplay.className = 'result-display prompt';
    discountAmountResult.textContent = "-";
    finalPriceResult.textContent = "-";
    discountAmountDisplay.className = 'result-display prompt';
    finalPriceDisplay.className = 'result-display final-price prompt';
    return;
  }

  // Validate discount percentage
  if (discountPercent) {
    if (discountPercent < 0) {
      discountAmountResult.textContent = "Discount cannot be negative";
      discountAmountDisplay.className = 'result-display error';
      finalPriceResult.textContent = "-";
      finalPriceDisplay.className = 'result-display final-price prompt';
      return;
    }
    if (discountPercent > 100) {
      discountAmountResult.textContent = "Discount cannot exceed 100%";
      discountAmountDisplay.className = 'result-display error';
      finalPriceResult.textContent = "-";
      finalPriceDisplay.className = 'result-display final-price prompt';
      return;
    }

    // Calculate discount amount and final price
    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;

    discountAmountResult.textContent = `₹${discountAmount.toFixed(2)}`;
    finalPriceResult.textContent = `₹${finalPrice.toFixed(2)}`;
    discountAmountDisplay.className = 'result-display';
    finalPriceDisplay.className = 'result-display final-price';
  } else {
    discountAmountResult.textContent = "Enter discount percentage";
    discountAmountDisplay.className = 'result-display prompt';
    finalPriceResult.textContent = "-";
    finalPriceDisplay.className = 'result-display final-price prompt';
  }
}

function calculateAge() {
  const day = document.getElementById('birth-day').value;
  const month = document.getElementById('birth-month').value;
  const year = document.getElementById('birth-year').value;

  // Validate inputs
  if (!day || !month || !year) {
    document.getElementById('years').textContent = '-';
    document.getElementById('months').textContent = '-';
    document.getElementById('days').textContent = '-';
    return;
  }

  const birthDate = new Date(year, month, day);
  const today = new Date();

  // Validate date
  if (birthDate > today) {
    document.getElementById('years').textContent = '-';
    document.getElementById('months').textContent = '-';
    document.getElementById('days').textContent = '-';
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
}

// Add event listeners for live calculation
document.getElementById('birth-day').addEventListener('input', calculateAge);
document.getElementById('birth-month').addEventListener('change', calculateAge);
document.getElementById('birth-year').addEventListener('input', calculateAge);

function showError(message) {
  const resultContainer = document.getElementById("ageResult");
  resultContainer.style.border = "2px solid #ff4444";
  resultContainer.style.backgroundColor = "#fff5f5";
  
  // Create error message if it doesn't exist
  let errorMessage = document.getElementById("error-message");
  if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.id = "error-message";
      errorMessage.style.color = "#ff4444";
      errorMessage.style.textAlign = "center";
      errorMessage.style.padding = "10px";
      errorMessage.style.marginTop = "10px";
      resultContainer.appendChild(errorMessage);
  }
  
  errorMessage.innerText = message;
  
  // Remove error styling after 3 seconds
  setTimeout(() => {
      resultContainer.style.border = "";
      resultContainer.style.backgroundColor = "";
      if (errorMessage) {
          errorMessage.remove();
      }
  }, 3000);
}

// Standard Calculator Functions
let currentExpression = '0';
let lastResult = '0';

function appendToExpression(value) {
  if (currentExpression === '0' && value !== '.') {
    currentExpression = value;
  } else {
    currentExpression += value;
  }
  updateDisplay();
}

function clearCalculator() {
  currentExpression = '0';
  lastResult = '0';
  updateDisplay();
}

function deleteLastChar() {
  if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0, -1);
  } else {
    currentExpression = '0';
  }
  updateDisplay();
}

function calculateResult() {
  try {
    // Replace × with * and ÷ with / for calculation
    const expression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/');
    const result = eval(expression);
    
    // Format the result
    if (Number.isInteger(result)) {
      lastResult = result.toString();
    } else {
      lastResult = result.toFixed(2);
    }
    
    currentExpression = lastResult;
    updateDisplay();
  } catch (error) {
    currentExpression = 'Error';
    lastResult = '0';
    updateDisplay();
  }
}

function updateDisplay() {
  const expressionElement = document.getElementById('calc-expression');
  const resultElement = document.getElementById('calc-result');
  
  expressionElement.textContent = currentExpression;
  resultElement.textContent = lastResult;
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  // Number keys
  if (/^[0-9]$/.test(key)) {
    appendToExpression(key);
  }
  // Operators
  else if (['+', '-', '*', '/', '%'].includes(key)) {
    appendToExpression(key);
  }
  // Decimal point
  else if (key === '.') {
    appendToExpression('.');
  }
  // Enter key for calculation
  else if (key === 'Enter') {
    calculateResult();
  }
  // Backspace for deletion
  else if (key === 'Backspace') {
    deleteLastChar();
  }
  // Escape key for clear
  else if (key === 'Escape') {
    clearCalculator();
  }
});

// Add focus styles for keyboard navigation
document.querySelectorAll('.calc-btn').forEach(button => {
  button.addEventListener('focus', function() {
    this.style.outline = '2px solid #2e7d32';
    this.style.outlineOffset = '2px';
  });
  
  button.addEventListener('blur', function() {
    this.style.outline = 'none';
  });
});
  
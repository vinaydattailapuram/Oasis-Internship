function appendValue(value) {
    document.getElementById('display').value += value;
  }
  
  function calculate() {
    const expression = document.getElementById('display').value;
    try {
      const result = evaluateExpression(expression);
      document.getElementById('display').value = result;
    } catch (error) {
      document.getElementById('display').value = 'Error';
    }
  }
  
  function evaluateExpression(expression) {
    const sanitizedExpression = sanitizeExpression(expression);
    return eval(sanitizedExpression);
  }
  
  function sanitizeExpression(expression) {
    const operators = ['+', '-', '*', '/', '(', ')'];
    const sanitizedExpression = expression.split('').map(char => {
      if (operators.includes(char)) {
        return ' ' + char + ' ';
      }
      return char;
    }).join('');
    return sanitizedExpression;
  }
  
  function clearDisplay() {
    document.getElementById('display').value = '';
  }
  
  function deleteCharacter() {
    const display = document.getElementById('display');
    const currentValue = display.value;
    display.value = currentValue.slice(0, -1);
  }
  
  function checkAnswer() {
    // Implement the logic to check the answer
    // This is just a placeholder
    alert("Checking answer");
  }
  
  function toggleSign() {
    const display = document.getElementById('display');
    const currentValue = display.value;
    if (currentValue.charAt(0) === '-') {
      display.value = currentValue.substring(1);
    } else {
      display.value = '-' + currentValue;
    }
  }
  
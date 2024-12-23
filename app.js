// JavaScript
// script.js
function calculateWaterIntake() {
    const weight = parseFloat(document.getElementById('weight').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const exercise = parseFloat(document.getElementById('exercise').value) || 0;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const temperatureUnit = document.getElementById('temperature-unit').value;
    const coffee = parseInt(document.getElementById('coffee').value) || 0;
    const alcohol = parseInt(document.getElementById('alcohol').value) || 0;

    if (isNaN(weight) || isNaN(temperature)) {
        alert('Please enter valid values for weight and temperature.');
        return;
    }

    // Convert weight to kg if in lbs
    const weightInKg = weightUnit === 'lbs' ? weight / 2.20462 : weight;

    // Calculate weight-based intake
    const weightWaterMl = weightInKg * 33; // 33 ml per kg

    // Calculate exercise-based intake
    const exerciseWaterMl = Math.floor(exercise / 30) * 250; // 250 ml per 30 minutes

    // Convert temperature to Celsius if in Fahrenheit
    const tempInCelsius = temperatureUnit === 'fahrenheit' 
        ? (temperature - 32) * (5 / 9) 
        : temperature;

    // Determine temperature multiplier
    let tempMultiplier = 1;
    if (tempInCelsius < 0) tempMultiplier = 1.3;
    else if (tempInCelsius <= 5) tempMultiplier = 1.2;
    else if (tempInCelsius <= 10) tempMultiplier = 1.1;
    else if (tempInCelsius <= 15) tempMultiplier = 1.0;
    else if (tempInCelsius <= 20) tempMultiplier = 1.0;
    else if (tempInCelsius <= 25) tempMultiplier = 1.2;
    else if (tempInCelsius <= 30) tempMultiplier = 1.4;
    else if (tempInCelsius <= 35) tempMultiplier = 1.6;
    else tempMultiplier = 1.8;

    // Calculate coffee and alcohol intake
    const coffeeWaterMl = coffee * 240; // 240 ml per coffee
    const alcoholWaterMl = alcohol * 500; // 500 ml per alcohol unit

    // Calculate total water intake
    let totalWaterMl = (weightWaterMl + exerciseWaterMl + coffeeWaterMl + alcoholWaterMl) * tempMultiplier;

    // Convert to liters and ounces for display
    const totalWaterLiters = (totalWaterMl / 1000).toFixed(2);
    const totalWaterOunces = (totalWaterMl / 29.5735).toFixed(2);

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your daily water intake should be approximately <strong>${totalWaterLiters} liters</strong> (${totalWaterOunces} ounces).`;
    resultDiv.style.display = 'block';
}

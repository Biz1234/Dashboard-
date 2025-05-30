// Load click count from localStorage or default to 0
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
let chartData = [10, 15, 7, 12, 9]; // Initial chart data
let chartType = 'bar'; // Initial chart type

// Initialize Chart.js
const ctx = document.getElementById('activity-chart').getContext('2d');
const activityChart = new Chart(ctx, {
    type: chartType,
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Daily Activity',
            data: chartData,
            backgroundColor: '#007bff',
            borderColor: '#0056b3',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Set initial click count display
document.getElementById('click-count').textContent = `Clicks: ${clickCount}`;

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const button = document.getElementById('theme-toggle');
    button.textContent = document.body.classList.contains('dark-mode')
        ? 'Toggle Light Mode'
        : 'Toggle Dark Mode';
});

document.getElementById('click-counter').addEventListener('click', () => {
    clickCount++;
    document.getElementById('click-count').textContent = `Clicks: ${clickCount}`;
    localStorage.setItem('clickCount', clickCount); // Save to localStorage
    // Add random value (1-5) to a random day's data
    const randomDay = Math.floor(Math.random() * chartData.length);
    chartData[randomDay] += Math.floor(Math.random() * 5) + 1;
    activityChart.data.datasets[0].data = chartData;
    activityChart.update();
});

document.getElementById('reset-counter').addEventListener('click', () => {
    clickCount = 0;
    document.getElementById('click-count').textContent = `Clicks: ${clickCount}`;
    localStorage.setItem('clickCount', clickCount); // Save to localStorage
    // Reset chart data
    chartData = [10, 15, 7, 12, 9];
    activityChart.data.datasets[0].data = chartData;
    activityChart.update();
});

document.getElementById('update-chart').addEventListener('click', () => {
    const dayIndex = parseInt(document.getElementById('day-select').value);
    const value = parseInt(document.getElementById('data-input').value);
    if (!isNaN(value) && value >= 1 && value <= 50) {
        chartData[dayIndex] = value;
        activityChart.data.datasets[0].data = chartData;
        activityChart.update();
        document.getElementById('data-input').value = ''; // Clear input
    } else {
        alert('Please enter a value between 1 and 50');
    }
});

document.getElementById('toggle-chart-type').addEventListener('click', () => {
    chartType = chartType === 'bar' ? 'line' : 'bar';
    activityChart.config.type = chartType;
    document.getElementById('toggle-chart-type').textContent = chartType === 'bar' ? 'Toggle Line Chart' : 'Toggle Bar Chart';
    activityChart.update();
});

document.getElementById('clear-chart').addEventListener('click', () => {
    chartData = [0, 0, 0, 0, 0];
    activityChart.data.datasets[0].data = chartData;
    activityChart.update();
});
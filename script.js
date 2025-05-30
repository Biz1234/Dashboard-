// Load click count from localStorage or default to 0
let clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
// Load chart data and labels from localStorage or use defaults
let chartData = JSON.parse(localStorage.getItem('chartData')) || [10, 15, 7, 12, 9];
let chartLabels = JSON.parse(localStorage.getItem('chartLabels')) || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
let chartType = 'bar'; // Initial chart type
const availableDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Initialize Chart.js
const ctx = document.getElementById('activity-chart').getContext('2d');
const activityChart = new Chart(ctx, {
    type: chartType,
    data: {
        labels: chartLabels,
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

// Function to update day selector
function updateDaySelect() {
    const select = document.getElementById('day-select');
    select.innerHTML = '';
    chartLabels.forEach((label, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = label;
        select.appendChild(option);
    });
}

// Function to save chart state to localStorage
function saveChartState() {
    localStorage.setItem('chartData', JSON.stringify(chartData));
    localStorage.setItem('chartLabels', JSON.stringify(chartLabels));
}

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
    saveChartState();
});

document.getElementById('reset-counter').addEventListener('click', () => {
    clickCount = 0;
    document.getElementById('click-count').textContent = `Clicks: ${clickCount}`;
    localStorage.setItem('clickCount', clickCount); // Save to localStorage
    // Reset chart data
    chartData = new Array(chartLabels.length).fill(10); // Reset to 10 for each day
    activityChart.data.datasets[0].data = chartData;
    activityChart.update();
    saveChartState();
});

document.getElementById('update-chart').addEventListener('click', () => {
    const dayIndex = parseInt(document.getElementById('day-select').value);
    const value = parseInt(document.getElementById('data-input').value);
    if (!isNaN(value) && value >= 1 && value <= 50) {
        chartData[dayIndex] = value;
        activityChart.data.datasets[0].data = chartData;
        activityChart.update();
        document.getElementById('data-input').value = ''; // Clear input
        saveChartState();
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
    chartData = new Array(chartLabels.length).fill(0);
    activityChart.data.datasets[0].data = chartData;
    activityChart.update();
    saveChartState();
});

document.getElementById('download-chart').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = activityChart.toBase64Image();
    link.download = 'activity-chart.png';
    link.click();
});

document.getElementById('add-day').addEventListener('click', () => {
    if (chartLabels.length < availableDays.length) {
        const nextDay = availableDays[chartLabels.length];
        chartLabels.push(nextDay);
        chartData.push(0); // Default value for new day
        activityChart.data.labels = chartLabels;
        activityChart.data.datasets[0].data = chartData;
        updateDaySelect();
        activityChart.update();
        saveChartState();
    } else {
        alert('All available days have been added');
    }
});

document.getElementById('remove-day').addEventListener('click', () => {
    if (chartLabels.length > 1) {
        chartLabels.pop();
        chartData.pop();
        activityChart.data.labels = chartLabels;
        activityChart.data.datasets[0].data = chartData;
        updateDaySelect();
        activityChart.update();
        saveChartState();
    } else {
        alert('At least one day must remain in the chart');
    }
});

// Initialize day selector
updateDaySelect();
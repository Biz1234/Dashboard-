let clickCount = 0;

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
});

document.getElementById('reset-counter').addEventListener('click', () => {
    clickCount = 0;
    document.getElementById('click-count').textContent = `Clicks: ${clickCount}`;
});

const ctx = document.getElementById('activity-chart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Daily Activity',
            data: [10, 15, 7, 12, 9],
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
// Initialize default table and chart with 0 values
function initializeTableAndChart() {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Clear previous results

  const data = {
    years: [],
    coinsEarned: [],
    low: [],
    medium: [],
    high: []
  };

  for (let year = 1; year <= 20; year++) {
    // Add row to table
    const row = `
      <tr>
        <td>${year}</td>
        <td>0.0</td>
        <td>₹0</td>
        <td>₹0</td>
        <td>₹0</td>
      </tr>
    `;
    tableBody.innerHTML += row;

    // Store default data for chart
    data.years.push(year);
    data.coinsEarned.push(0);
    data.low.push(0);
    data.medium.push(0);
    data.high.push(0);
  }

  // Render default chart
  renderChart(data);
}

// Call initializeTableAndChart when the page loads
window.onload = initializeTableAndChart;

document.getElementById('jio-coin-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Get input value
  const hoursPerDay = parseFloat(document.getElementById('hours').value);

  // Validate input
  if (isNaN(hoursPerDay) || hoursPerDay <= 0) {
    alert('Please enter a valid number of hours.');
    initializeTableAndChart(); // Reset table and chart to default values
    return;
  }

  // Constants
  const years = 20;
  const initialCoinsPerHourPerYear = 46.8; // Initial coins earned per hour per year
  const initialLowPerHour = 48; // Initial value for Low (5%) per hour
  const initialMediumPerHour = 57; // Initial value for Medium (25%) per hour
  const initialHighPerHour = 92; // Initial value for High (100%) per hour

  // Generate table data
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Clear previous results

  let totalCoins = 0;
  const data = {
    years: [],
    coinsEarned: [],
    low: [],
    medium: [],
    high: []
  };

  for (let year = 1; year <= years; year++) {
    // Calculate Coins Earned with 10% annual growth
    const coinsThisYear = initialCoinsPerHourPerYear * hoursPerDay * Math.pow(1.10, year - 1);
    totalCoins += coinsThisYear;

    // Calculate projections
    const low = initialLowPerHour * hoursPerDay * Math.pow(1.05, year); // 5% growth compounded annually
    const medium = initialMediumPerHour * hoursPerDay * Math.pow(1.25, year); // 25% growth compounded annually
    const high = initialHighPerHour * hoursPerDay * Math.pow(2, year); // 100% growth compounded annually

    // Add row to table
    const row = `
      <tr>
        <td>${year}</td>
        <td>${totalCoins.toFixed(1)}</td>
        <td>₹${low.toFixed(0)}</td>
        <td>₹${medium.toFixed(0)}</td>
        <td>₹${high.toFixed(0)}</td>
      </tr>
    `;
    tableBody.innerHTML += row;

    // Store data for chart
    data.years.push(year);
    data.coinsEarned.push(totalCoins);
    data.low.push(low);
    data.medium.push(medium);
    data.high.push(high);
  }

  // Render projection chart
  renderChart(data);
});

function renderChart(data) {
  const ctx = document.getElementById('projectionChart').getContext('2d');
  if (window.myChart) {
    window.myChart.destroy(); // Destroy existing chart instance
  }
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Coins Earned',
          data: data.coinsEarned,
          borderColor: '#4bc0c0',
          fill: false
        },
        {
          label: 'Low (5%)',
          data: data.low,
          borderColor: '#ff6384',
          fill: false
        },
        {
          label: 'Medium (25%)',
          data: data.medium,
          borderColor: '#36a2eb',
          fill: false
        },
        {
          label: 'High (100%)',
          data: data.high,
          borderColor: '#ffce56',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Years'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Value (₹)'
          },
          beginAtZero: true
        }
      }
    }
  });
}
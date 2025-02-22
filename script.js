// Theme Switching
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const mobileThemeIcon = mobileThemeToggle.querySelector('i');
const navbarCollapse = document.getElementById('navbarNav');
let menuTimeout;

// Define theme colors
const colors = {
    light: {
        gridColor: '#e5e7eb',
        textColor: '#1f2937',
        chartBackground: 'rgba(37, 99, 235, 0.2)',
        chartBorder: '#2563eb'
    },
    dark: {
        gridColor: '#374151',
        textColor: '#f3f4f6',
        chartBackground: 'rgba(96, 165, 250, 0.2)',
        chartBorder: '#60a5fa'
    }
};

// Function to update chart colors
function updateChartColors(chart) {
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const currentColors = colors[currentTheme];

    // Update dataset colors
    chart.data.datasets[0].backgroundColor = currentColors.chartBackground;
    chart.data.datasets[0].borderColor = currentColors.chartBorder;
    chart.data.datasets[0].pointBackgroundColor = currentColors.chartBorder;
    chart.data.datasets[0].pointHoverBorderColor = currentColors.chartBorder;

    // Update scale colors
    chart.options.scales.r.grid.color = currentColors.gridColor;
    chart.options.scales.r.angleLines.color = currentColors.gridColor;
    chart.options.scales.r.pointLabels.color = currentColors.textColor;
    chart.options.scales.r.ticks.color = currentColors.textColor;

    // Update legend colors
    chart.options.plugins.legend.labels.color = currentColors.textColor;

    chart.update();
}

let skillsChart;

function toggleTheme() {
    body.classList.toggle('dark-theme');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    mobileThemeIcon.classList.toggle('fa-moon');
    mobileThemeIcon.classList.toggle('fa-sun');
    
    // Update chart colors when theme changes
    if (skillsChart) {
        updateChartColors(skillsChart);
    }
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Auto-hide mobile menu after 10 seconds
navbarCollapse.addEventListener('show.bs.collapse', () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    menuTimeout = setTimeout(() => {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
    }, 10000);
});

navbarCollapse.addEventListener('hide.bs.collapse', () => {
    if (menuTimeout) clearTimeout(menuTimeout);
});

// Skills Chart
// Function to update scroll progress
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init();

    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.querySelector('.navbar').appendChild(progressBar);

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);

    // Initial progress update
    updateScrollProgress();

    // Skills Chart Configuration
    const ctx = document.getElementById('skillsChart').getContext('2d');
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const currentColors = colors[currentTheme];

    skillsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Automação',
                'Análise de Dados',
                'Web Development',
                'Marketing Digital',
                'Banco de Dados'
            ],
            datasets: [{
                label: 'Nível de Habilidade',
                data: [95, 90, 75, 85, 80],
                fill: true,
                backgroundColor: currentColors.chartBackground,
                borderColor: currentColors.chartBorder,
                pointBackgroundColor: currentColors.chartBorder,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: currentColors.chartBorder
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: currentColors.gridColor
                    },
                    grid: {
                        color: currentColors.gridColor
                    },
                    pointLabels: {
                        color: currentColors.textColor
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: currentColors.textColor
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: currentColors.textColor
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
});
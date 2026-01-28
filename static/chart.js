// static/chart.js
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("investmentChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Ambil warna dari CSS variable (support dark mode)
    const getVar = (v) =>
        getComputedStyle(document.body).getPropertyValue(v).trim();

    const textColor = getVar("--text");
    const primaryColor = getVar("--primary");

    // Data dikirim dari Flask (global variable)
    // years  -> array tahun
    // values -> array nilai investasi
    const years = window.chartYears || [];
    const values = window.chartValues || [];

    new Chart(ctx, {
        type: "line",
        data: {
            labels: years,
            datasets: [
                {
                    label: "Nilai Investasi (Rp)",
                    data: values,
                    borderColor: primaryColor,
                    backgroundColor: primaryColor + "33",
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: {
                            size: 13
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return (
                                "Rp " +
                                context.parsed.y.toLocaleString("id-ID")
                            );
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor
                    },
                    title: {
                        display: true,
                        text: "Tahun",
                        color: textColor
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                        callback: function (value) {
                            return "Rp " + value.toLocaleString("id-ID");
                        }
                    },
                    title: {
                        display: true,
                        text: "Nilai Investasi",
                        color: textColor
                    }
                }
            }
        }
    });
});

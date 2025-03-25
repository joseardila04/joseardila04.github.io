(function($) {
    var $window = $(window),
        $body = $('body');

    // Mock Data for Austin, TX
    const mockUVData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "UV Index",
            data: [3, 5, 6, 8, 7, 5, 4],
            backgroundColor: "rgba(255, 165, 0, 0.5)",
            borderColor: "rgba(255, 165, 0, 1)",
            borderWidth: 2
        }]
    };

    // Initialize Chart.js
    const ctx = document.getElementById("uv-chart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: mockUVData,
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Fitzpatrick Skin Type Mapping (Sensitivity Levels)
    const skinTypeSensitivity = {
        "1": { level: "Extremely High", threshold: 3 },
        "2": { level: "Very High", threshold: 4 },
        "3": { level: "High", threshold: 5 },
        "4": { level: "Moderate", threshold: 6 },
        "5": { level: "Low", threshold: 7 },
        "6": { level: "Very Low", threshold: 8 }
    };

    // WHO UV Index Exposure Limits
    const uvProtectionGuidelines = [
        { maxUVI: 2, risk: "Low", message: "Minimal protection needed." },
        { maxUVI: 5, risk: "Moderate", message: "Wear sunglasses, use SPF 30+ sunscreen." },
        { maxUVI: 7, risk: "High", message: "Use SPF 50+, seek shade during midday." },
        { maxUVI: 10, risk: "Very High", message: "Avoid sun exposure, wear protective clothing." },
        { maxUVI: Infinity, risk: "Extreme", message: "Avoid going outside, full protection required." }
    ];

    // Function to update alerts based on skin type and UV index
    function updateUVAlerts(uvIndex) {
        let skinType = document.getElementById("skin-type").value;
        let alertMessage = document.getElementById("alert-message");

        if (!skinType) {
            alertMessage.innerText = "Please select your skin type for personalized alerts.";
            return;
        }

        let sensitivity = skinTypeSensitivity[skinType];
        let protection = uvProtectionGuidelines.find(level => uvIndex <= level.maxUVI);

        if (uvIndex >= sensitivity.threshold) {
            alertMessage.innerText = `High UV levels detected! (${protection.risk} Risk)\n${protection.message}`;
        } else {
            alertMessage.innerText = `UV levels are moderate. (${protection.risk} Risk) Stay protected.`;
        }
    }

    // Mock real-time UV index data (for testing)
    let uvIndex = 6; // Replace with real-time API data
    updateUVAlerts(uvIndex);

    // Event listener for skin type selection
    document.getElementById("skin-type").addEventListener("change", function() {
        updateUVAlerts(uvIndex);
    });

})(jQuery);

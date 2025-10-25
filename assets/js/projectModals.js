const projectData = {
    1: {
        title: "Vision-Based UAV for Search and Rescue Operations",
        date: "Oct 2024 - Apr 2025",
        tags: ["Computer Vision", "YOLOv8", "Python", "PyTorch", "OpenCV", "Drone Tech", "AI"],
        overview: "This project focuses on developing an autonomous UAV (Unmanned Aerial Vehicle) system designed for search and rescue operations in disaster-stricken areas. Using advanced computer vision and AI technologies, the drone can autonomously detect and track human victims in real-time, significantly improving response times in critical situations.",
        features: [
            "Real-time human detection and tracking using YOLOv8",
            "Autonomous navigation in disaster zones with obstacle avoidance",
            "Live video streaming with AI-powered victim identification",
            "GPS coordinate logging of detected victims",
            "Thermal imaging integration for night operations",
            "Multi-drone coordination for large area coverage"
        ],
        results: [
            "80% increase in search efficiency compared to traditional methods",
            "92% accuracy in victim detection in test scenarios",
            "Reduced manual intervention through autonomous operation",
            "5x more area coverage compared to ground-based teams"
        ],
        technologies: ["Python", "YOLOv8", "OpenCV", "PyTorch", "NVIDIA Jetson Nano", "ArduPilot"]
    },
    2: {
        title: "IoT-Based Plant Monitoring System",
        date: "Feb 2023 - Jul 2023",
        tags: ["IoT", "ESP32", "Android", "Firebase", "Sensors"],
        overview: "An intelligent IoT-based plant monitoring system designed to automate plant care by continuously monitoring soil moisture, temperature, and humidity levels. The system provides real-time data visualization through a mobile application and sends automated alerts when plants require attention.",
        features: [
            "Real-time monitoring of soil moisture, temperature, and humidity",
            "Automated watering alerts via Android app",
            "Historical data tracking with charts",
            "Multi-plant support with individual sensor modules",
            "WiFi connectivity for remote monitoring",
            "Battery backup for continuous operation",
            "Customizable thresholds for different plant species"
        ],
        results: [
            "80% reduction in manual plant care efforts",
            "95% accuracy in moisture detection",
            "Prevented over-watering and under-watering",
            "Improved plant health and survival rate",
            "Sub-2 second response time for data updates"
        ],
        technologies: ["ESP32", "Arduino IDE", "C++", "Android (Java)", "Firebase", "DHT22 Sensor", "WiFi"]
    },
    3: {
        title: "GreenHouse Agri-Farming Monitoring System",
        date: "Hackhazards'25 - 2nd Prize Winner",
        tags: ["PyQt5", "InfinyOn Fluvio", "Cloud", "Agriculture", "Real-time Streaming"],
        overview: "Developed during the Hackhazards'25 hackathon, this greenhouse monitoring system represents a comprehensive solution for modern agriculture. The project combines IoT sensor simulation, real-time data streaming, and cloud integration to create an intelligent greenhouse management platform that increases crop productivity while minimizing human intervention.",
        features: [
            "Real-time sensor simulation for temperature, humidity, and soil moisture",
            "PyQt5-based desktop dashboard with intuitive visualization",
            "InfinyOn Fluvio Cloud integration for distributed data streaming",
            "Automated climate control with sensor-based triggers",
            "Historical data analytics with trend analysis",
            "Alert system for abnormal conditions",
            "Multi-zone greenhouse support"
        ],
        results: [
            "Increased crop productivity through optimized control",
            "Reduced water consumption with precision irrigation",
            "Minimized manual intervention",
            "Early detection of unfavorable conditions",
            "Data-driven decision making capability"
        ],
        technologies: ["Python", "PyQt5", "InfinyOn Fluvio Cloud", "Real-time Streaming", "IoT", "Data Visualization"],
        award: "2nd Prize at Hackhazards'25"
    }
};

function openProjectModal(projectId) {
    const project = projectData[projectId];
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    let html = `
        <div class="modal-header">
            <h2>${project.title}</h2>
            <p class="modal-date"><i class="far fa-calendar"></i> ${project.date}</p>
            ${project.award ? `<div class="modal-award"><i class="fas fa-trophy"></i> ${project.award}</div>` : ''}
        </div>
        
        <div class="modal-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>

        <div class="modal-section">
            <h3>Project Overview</h3>
            <p>${project.overview}</p>
        </div>

        <div class="modal-section">
            <h3>Key Features</h3>
            <ul class="modal-list">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Results & Impact</h3>
            <ul class="modal-list">
                ${project.results.map(result => `<li>${result}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="tech-stack">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;

    modalBody.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

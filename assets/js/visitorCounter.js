async function initVisitorCounter() {
    const STORAGE_KEY = 'portfolio_visitor_data';
    const UNIQUE_VISITOR_KEY = 'portfolio_has_visited';
    const BASELINE_LOADED_KEY = 'portfolio_baseline_loaded';
    
    let visitorData = {
        total_visitors: 0,
        last_updated: new Date().toISOString().split('T')[0]
    };

    const baselineLoaded = localStorage.getItem(BASELINE_LOADED_KEY);
    
    if (!baselineLoaded) {
        try {
            const response = await fetch('assets/data/stats.json');
            if (response.ok) {
                const jsonData = await response.json();
                visitorData = {
                    total_visitors: jsonData.total_visitors || 0,
                    last_updated: jsonData.last_updated || new Date().toISOString().split('T')[0]
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(visitorData));
                localStorage.setItem(BASELINE_LOADED_KEY, 'true');
                console.log('Loaded baseline visitor count from stats.json:', visitorData.total_visitors);
            }
        } catch (e) {
            console.log('Could not load stats.json, starting from 0:', e);
        }
    } else {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                visitorData = JSON.parse(storedData);
            }
        } catch (e) {
            console.error('Error reading visitor data from localStorage:', e);
        }
    }

    const hasVisited = localStorage.getItem(UNIQUE_VISITOR_KEY);
    
    if (!hasVisited) {
        visitorData.total_visitors++;
        visitorData.last_updated = new Date().toISOString().split('T')[0];
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(visitorData));
            localStorage.setItem(UNIQUE_VISITOR_KEY, 'true');
            console.log('New visitor counted. Total visitors:', visitorData.total_visitors);
        } catch (e) {
            console.error('Error saving visitor data:', e);
        }
    }

    updateVisitorDisplay(visitorData.total_visitors);
}

function updateVisitorDisplay(count) {
    const visitorCountElements = document.querySelectorAll('#visitorCount, #footerVisitorCount');
    visitorCountElements.forEach(element => {
        if (element) {
            animateCount(element, count);
        }
    });
}

function animateCount(element, targetCount) {
    let currentCount = 0;
    const increment = Math.ceil(targetCount / 30);
    const duration = 1000;
    const stepTime = duration / (targetCount / increment);

    const counter = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(counter);
        }
        element.textContent = currentCount;
    }, stepTime);
}

document.addEventListener('DOMContentLoaded', initVisitorCounter);

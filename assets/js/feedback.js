emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

const FEEDBACK_TIMER_DURATION = 60000;
const FEEDBACK_SHOWN_KEY = 'portfolio_feedback_shown';

let feedbackTimer = null;
let isUserActive = true;

function initFeedbackSystem() {
    const feedbackBtn = document.getElementById('feedbackBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const stars = document.querySelectorAll('.star-rating i');
    let selectedRating = 0;

    const hasShownFeedback = sessionStorage.getItem(FEEDBACK_SHOWN_KEY);

    if (!hasShownFeedback) {
        feedbackTimer = setTimeout(() => {
            if (isUserActive) {
                openFeedbackModal();
                sessionStorage.setItem(FEEDBACK_SHOWN_KEY, 'true');
            }
        }, FEEDBACK_TIMER_DURATION);
    }

    feedbackBtn.addEventListener('click', () => {
        openFeedbackModal();
    });

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            document.getElementById('rating').value = selectedRating;
            updateStarDisplay(selectedRating);
        });

        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            updateStarDisplay(rating);
        });
    });

    const starContainer = document.querySelector('.star-rating');
    starContainer.addEventListener('mouseleave', () => {
        updateStarDisplay(selectedRating);
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitFeedback(feedbackForm, selectedRating);
    });

    document.addEventListener('visibilitychange', () => {
        isUserActive = !document.hidden;
    });

    let activityTimeout;
    document.addEventListener('mousemove', () => {
        isUserActive = true;
        clearTimeout(activityTimeout);
        activityTimeout = setTimeout(() => {
            isUserActive = false;
        }, 30000);
    });
}

function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

function submitFeedback(form, rating) {
    const formData = new FormData(form);
    const feedbackData = {
        rating: rating,
        name: formData.get('feedbackName') || 'Anonymous',
        email: formData.get('feedbackEmail') || 'Not provided',
        suggestion: formData.get('suggestion'),
        timestamp: new Date().toISOString()
    };

    if (feedbackData.rating === 0) {
        showToast('Please select a rating before submitting', 'error');
        return;
    }

    saveFeedbackLocally(feedbackData);

    emailjs.send('service_portfolio', 'template_feedback', {
        rating: '⭐'.repeat(feedbackData.rating),
        from_name: feedbackData.name,
        from_email: feedbackData.email,
        message: feedbackData.suggestion || 'No additional comments',
        to_email: 'aanandpandit0001@gmail.com'
    })
    .then(() => {
        showToast('Thank you for your valuable feedback! 🎉', 'success');
        form.reset();
        updateStarDisplay(0);
        setTimeout(() => {
            closeFeedbackModal();
        }, 2000);
    })
    .catch((error) => {
        console.log('EmailJS Error:', error);
        showToast('Feedback saved locally! Thank you! ✓', 'success');
        form.reset();
        updateStarDisplay(0);
        setTimeout(() => {
            closeFeedbackModal();
        }, 2000);
    });
}

function saveFeedbackLocally(feedbackData) {
    try {
        const existingFeedback = JSON.parse(localStorage.getItem('portfolio_feedback') || '[]');
        existingFeedback.push(feedbackData);
        localStorage.setItem('portfolio_feedback', JSON.stringify(existingFeedback));
        console.log('Feedback saved locally:', feedbackData);
    } catch (e) {
        console.error('Error saving feedback:', e);
    }
}

document.addEventListener('DOMContentLoaded', initFeedbackSystem);

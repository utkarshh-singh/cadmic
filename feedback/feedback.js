// Load Feedback HTML
(async function loadFeedbackHTML() {
  try {
    const response = await fetch('feedback/feedback.html');
    const html = await response.text();
    
    // Insert into body
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
    
    // Initialize after HTML is loaded
    initFeedbackSystem();
    
  } catch (error) {
    console.error('Failed to load feedback system:', error);
  }
})();

// Main Feedback System
function initFeedbackSystem() {
  'use strict';

  // Elements
  const feedbackBtn = document.getElementById('feedbackBtn');
  const feedbackModal = document.getElementById('feedbackModal');
  const feedbackClose = document.getElementById('feedbackClose');
  const cancelBtn = document.getElementById('cancelBtn');
  const feedbackForm = document.getElementById('feedbackForm');
  const allowShowcase = document.getElementById('allow_showcase');
  const projectDetails = document.getElementById('projectDetails');
  const submitAnonymous = document.getElementById('submit_anonymous');
  const anonymousNotes = document.querySelectorAll('.anonymous-note');
  const anonymousDisplaySection = document.querySelector('.anonymous-display-section');

  // Open Modal
  function openModal() {
    feedbackModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal
  function closeModal() {
    feedbackModal.classList.remove('active');
    document.body.style.overflow = '';
    feedbackForm.reset();
    projectDetails.style.display = 'none';
    anonymousDisplaySection.style.display = 'none';
    anonymousNotes.forEach(note => note.style.display = 'none');
  }

  // Show/Hide Project Details
  allowShowcase.addEventListener('change', function() {
    if (this.checked) {
      projectDetails.style.display = 'block';
      document.getElementById('project_title').required = true;
      document.getElementById('project_category').required = true;
      document.getElementById('project_description').required = true;
      document.getElementById('project_url').required = true;
      document.getElementById('project_tags').required = true;
    } else {
      projectDetails.style.display = 'none';
      document.getElementById('project_title').required = false;
      document.getElementById('project_category').required = false;
      document.getElementById('project_description').required = false;
      document.getElementById('project_url').required = false;
      document.getElementById('project_tags').required = false;
    }
  });

  // Anonymous Submission Toggle
  submitAnonymous.addEventListener('change', function() {
    if (this.checked) {
      anonymousNotes.forEach(note => note.style.display = 'block');
      anonymousDisplaySection.style.display = 'block';
      
      document.querySelector('label[for="feedback_name"]').innerHTML = 
        'Your Name <span class="optional-text">(For our records only - not public)</span>';
      document.querySelector('label[for="feedback_email"]').innerHTML = 
        'Email <span class="optional-text">(For our records only - not public)</span>';
      
    } else {
      anonymousNotes.forEach(note => note.style.display = 'none');
      anonymousDisplaySection.style.display = 'none';
      
      document.querySelector('label[for="feedback_name"]').innerHTML = 
        'Your Name <span class="required-indicator">*</span>';
      document.querySelector('label[for="feedback_email"]').innerHTML = 
        'Email <span class="required-indicator">*</span>';
    }
  });

  // Event Listeners
  feedbackBtn.addEventListener('click', openModal);
  feedbackClose.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  feedbackModal.addEventListener('click', function(e) {
    if (e.target === feedbackModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && feedbackModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form Submission
  feedbackForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = feedbackForm.querySelector('.btn-submit');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    const formData = new FormData(feedbackForm);
    
    try {
      const response = await fetch(feedbackForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showSuccessMessage();
        
        console.log('=== FEEDBACK SUBMISSION DATA ===');
        
        const displayName = formData.get('submit_anonymous') === 'yes' 
          ? (formData.get('display_name') || 'Anonymous Researcher')
          : formData.get('name');

        const displayTitle = formData.get('submit_anonymous') === 'yes'
          ? (formData.get('display_title') || 'Research Community')
          : formData.get('position');

        console.log('\nFor testimonials.json:');
        console.log(JSON.stringify({
          id: Date.now(),
          quote: formData.get('testimonial'),
          author: displayName,
          position: displayTitle,
          image: "",
          is_anonymous: formData.get('submit_anonymous') === 'yes'
        }, null, 2));
        
        if (formData.get('allow_showcase') === 'yes') {
          console.log('\nFor portfolio.json:');
          console.log(JSON.stringify({
            id: Date.now(),
            title: formData.get('project_title'),
            category: formData.get('project_category'),
            description: formData.get('project_description'),
            image: formData.get('project_image') || "assets/portfolio/project-default.jpg",
            url: formData.get('project_url'),
            tags: formData.get('project_tags').split(',').map(t => t.trim())
          }, null, 2));
        }
        
        setTimeout(() => {
          closeModal();
          submitBtn.textContent = 'Submit Feedback';
          submitBtn.disabled = false;
        }, 3000);
        
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('⚠ Oops! Something went wrong. Please try again or email us directly at info.cadmic@gmail.com');
      submitBtn.textContent = 'Submit Feedback';
      submitBtn.disabled = false;
    }
  });

  function showSuccessMessage() {
    const modalContent = document.querySelector('.feedback-modal-content');
    modalContent.innerHTML = `
      <div class="feedback-success">
        <h2>✓ Thank You!</h2>
        <p>Your feedback has been submitted successfully.<br>We'll review it and may feature your testimonial on our website.</p>
        <p style="margin-top: 20px; font-size: 0.95rem;">This window will close automatically...</p>
      </div>
    `;
  }
}


// Feedback System - Handles popup and form submission
(function() {
  'use strict';

  // Elements
  const feedbackBtn = document.getElementById('feedbackBtn');
  const feedbackModal = document.getElementById('feedbackModal');
  const feedbackClose = document.getElementById('feedbackClose');
  const cancelBtn = document.getElementById('cancelBtn');
  const feedbackForm = document.getElementById('feedbackForm');
  const allowShowcase = document.getElementById('allow_showcase');
  const projectDetails = document.getElementById('projectDetails');

  // Open Modal
  function openModal() {
    feedbackModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal
  function closeModal() {
    feedbackModal.classList.remove('active');
    document.body.style.overflow = '';
    feedbackForm.reset();
    projectDetails.style.display = 'none';
  }

  // Show/Hide Project Details
  allowShowcase.addEventListener('change', function() {
    if (this.checked) {
      projectDetails.style.display = 'block';
      // Make project fields required
      document.getElementById('project_title').required = true;
      document.getElementById('project_category').required = true;
      document.getElementById('project_description').required = true;
      document.getElementById('project_url').required = true;
      document.getElementById('project_tags').required = true;
    } else {
      projectDetails.style.display = 'none';
      // Make project fields optional
      document.getElementById('project_title').required = false;
      document.getElementById('project_category').required = false;
      document.getElementById('project_description').required = false;
      document.getElementById('project_url').required = false;
      document.getElementById('project_tags').required = false;
    }
  });

  // Event Listeners
  feedbackBtn.addEventListener('click', openModal);
  feedbackClose.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close on outside click
  feedbackModal.addEventListener('click', function(e) {
    if (e.target === feedbackModal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && feedbackModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form Submission
  feedbackForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = feedbackForm.querySelector('.btn-submit');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    const formData = new FormData(feedbackForm);
    
    try {
      const response = await fetch(feedbackForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success message
        showSuccessMessage();
        
        // Log data format for manual JSON creation
        console.log('=== FEEDBACK SUBMISSION DATA ===');
        console.log('Use this to manually add to your JSON files:');
        console.log('\nFor testimonials.json:');
        console.log(JSON.stringify({
          id: Date.now(),
          quote: formData.get('testimonial'),
          author: formData.get('name'),
          position: formData.get('position'),
          image: ""
        }, null, 2));
        
        if (formData.get('allow_showcase') === 'yes') {
          console.log('\nFor portfolio.json:');
          console.log(JSON.stringify({
            id: Date.now(),
            title: formData.get('project_title'),
            category: formData.get('project_category'),
            description: formData.get('project_description'),
            image: formData.get('project_image') || "assets/portfolio/project-default.jpg",
            url: formData.get('project_url'),
            tags: formData.get('project_tags').split(',').map(t => t.trim())
          }, null, 2));
        }
        
        // Reset after 3 seconds
        setTimeout(() => {
          closeModal();
          submitBtn.textContent = 'Submit Feedback';
          submitBtn.disabled = false;
        }, 3000);
        
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('⚠ Oops! Something went wrong. Please try again or email us directly at info.cadmic@gmail.com');
      submitBtn.textContent = 'Submit Feedback';
      submitBtn.disabled = false;
    }
  });

  // Success Message Display
  function showSuccessMessage() {
    const modalContent = document.querySelector('.feedback-modal-content');
    modalContent.innerHTML = `
      <div class="feedback-success">
        <h2>✓ Thank You!</h2>
        <p>Your feedback has been submitted successfully.<br>We'll review it and may feature your testimonial on our website.</p>
        <p style="margin-top: 20px; font-size: 0.95rem;">This window will close automatically...</p>
      </div>
    `;
  }

})();

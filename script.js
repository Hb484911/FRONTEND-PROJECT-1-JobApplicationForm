// Get references to DOM elements
const jobApplicationForm = document.getElementById('jobApplicationForm');
const successMessage = document.getElementById('successMessage');
const closeSuccessMessageButton = document.getElementById('closeSuccessMessage');
const successMessageContent = successMessage ? successMessage.querySelector('div') : null; // The inner div of the modal

// Hamburger menu elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const body = document.body;
const overlay = document.getElementById('overlay');

// Check if essential elements exist before adding event listeners
if (jobApplicationForm && successMessage && closeSuccessMessageButton && hamburger && navMenu && body && overlay && successMessageContent) {

    // Add event listener for form submission
    jobApplicationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        // Basic Form Validation
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const position = document.getElementById('position').value;
        const resume = document.getElementById('resume').files.length; // Check if a file is selected

        if (!fullName || !email || !position || resume === 0) {
            // Use the custom alert function for feedback
            alert('Please fill in all required fields (Full Name, Email, Position, and upload your Resume).');
            return; // Stop the function if validation fails
        }

        // Simulate form data collection (in a real app, you'd send this to a server)
        const formData = {
            fullName: fullName,
            email: email,
            phone: document.getElementById('phone').value.trim(),
            position: position,
            message: document.getElementById('message').value.trim(),
            // For resume, you'd typically send the file to a server, not just its presence
            resumeAttached: resume > 0 ? 'Yes' : 'No'
        };

        console.log('Form Data Submitted:', formData);

        // Show the success message modal
        successMessage.classList.remove('hidden');
        // Add animation classes for a smooth appearance
        setTimeout(() => {
            successMessageContent.classList.remove('scale-95', 'opacity-0');
            successMessageContent.classList.add('scale-100', 'opacity-100');
        }, 10); // Small delay to allow 'hidden' to be removed first

        // Reset the form after a simulated successful submission
        jobApplicationForm.reset();
    });

    // Add event listener to close the success message modal
    closeSuccessMessageButton.addEventListener('click', function() {
        // Add animation classes for a smooth disappearance
        successMessageContent.classList.remove('scale-100', 'opacity-100');
        successMessageContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 300); // Match this duration with the transition duration in CSS
    });

    // Close success message if clicked outside the modal content
    successMessage.addEventListener('click', function(event) {
        if (event.target === successMessage) { // Check if the click was directly on the overlay
            successMessageContent.classList.remove('scale-100', 'opacity-100');
            successMessageContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 300);
        }
    });

    // Hamburger menu functionality
    // Toggle hamburger menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click from bubbling up to document
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active'); // Toggle overlay

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking on a navigation link
    const navLinks = document.querySelectorAll('.nav-links a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active'); // Hide overlay
                body.style.overflow = 'auto';
            });
        });
    }

    // Close menu when clicking outside (on overlay or document)
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && !hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active'); // Hide overlay
            body.style.overflow = 'auto';
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active'); // Hide overlay
            body.style.overflow = 'auto';
        }
    });

    // Close menu on window resize if screen becomes larger (desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && navMenu.classList.contains('active')) { // 768px is Tailwind's 'md' breakpoint
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active'); // Hide overlay
            body.style.overflow = 'auto';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

} else {
    console.warn("One or more essential elements for the page or hamburger menu were not found. Please ensure all required IDs ('jobApplicationForm', 'successMessage', 'closeSuccessMessage', 'hamburger', 'navMenu', 'overlay') exist in your HTML.");
}

// Simple alert replacement function (as per instructions, avoid native alert)
function alert(message) {
    const existingErrorDiv = document.querySelector('.custom-error-alert');
    if (existingErrorDiv) {
        existingErrorDiv.remove(); // Remove any previous alert
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'custom-error-alert fixed top-6 right-6 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 text-lg font-medium animate-fade-in-down';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.classList.add('animate-fade-out-up');
        errorDiv.classList.remove('animate-fade-in-down');
        setTimeout(() => {
            errorDiv.remove();
        }, 300); // Match fade-out duration
    }, 4000); // Display for 4 seconds
}

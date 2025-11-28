document.addEventListener('DOMContentLoaded', () => {
    // Basic initialization console log
    console.log("Landing Page Initialized. Hero Section scripts are running.");

    // --- Placeholder for Sticky CTA on Scroll ---
    // In a full landing page, you often want a buy button fixed at the bottom
    // when the main CTA scrolls out of view. This is a common JS implementation.
    
    // Example: Select the main CTA button
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        // Placeholder for adding a class to make a separate footer CTA sticky
        const handleScroll = () => {
            // Logic would go here to detect scroll position
            // For example:
            /*
            if (window.scrollY > 800) {
                // Show sticky footer CTA
            } else {
                // Hide sticky footer CTA
            }
            */
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Example: Add smooth scroll behavior to the cart icon link
        document.querySelector('.cart-icon').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Basic initialization console log
    console.log("Landing Page Initialized. Hero Section scripts are running.");

    const toggleButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- ADDED Mobile Menu Toggle Logic ---
    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener('click', () => {
            // Toggle the 'active' class on both the button (for X transformation)
            toggleButton.classList.toggle('active');
            
            // Toggle the 'active' class on the menu (for sliding animation)
            mobileMenu.classList.toggle('active');

            // Update ARIA accessibility attribute
            const isExpanded = toggleButton.classList.contains('active');
            toggleButton.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close the menu when a link is clicked
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleButton.classList.remove('active');
                mobileMenu.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
            
            // ==========================================================
            // !!! IMPORTANT: DEFINE PLACEHOLDERS INSIDE THIS FUNCTION !!!
            // ==========================================================
            // Define these as actual variables now, even if they are placeholders.
            const YOUR_PUBLIC_KEY = "PbhKTfJ7wNYJ25I42"; 
            const YOUR_SERVICE_ID = "service_gixt54c"; 
            const SHIPPING_TEMPLATE_ID = "template_v336o45"; 
            const PAYMENT_TEMPLATE_ID = "template_8mv6otq";   
            // ==========================================================
            
            // Initialize EmailJS (Now uses the locally defined variable)
            // ✅ CORRECT LINE ✅
            emailjs.init(YOUR_PUBLIC_KEY);
            
            // --- General Selectors ---
            const form = document.getElementById('order-submission-form');
            const stepOne = document.getElementById('step-one');
            const stepTwo = document.getElementById('step-two');
            const nextButton = document.getElementById('next-to-payment');
            const finalSubmitButton = document.getElementById('final-submit-btn');
            const backButton = document.getElementById('back-to-shipping');
            const formSection = document.getElementById('order-form-section');


            // -----------------------------------------------------
            // 1. LOGIC TO SHOW FORM ON "BUY NOW" CLICK (This is what you need to fix)
            // -----------------------------------------------------
            const orderButtons = document.querySelectorAll('a[href="#order-form-section"]');
            if (orderButtons.length > 0 && formSection) {
                orderButtons.forEach(button => {
                    button.addEventListener('click', function(e) {
                        e.preventDefault(); 
                        
                        // THIS MUST RUN: adds the class that shows the form via CSS
                        formSection.classList.add('is-visible'); 
                        
                        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    });
                });
            }


            // -----------------------------------------------------
            // 2. LOGIC FOR STEP 1: SEND DETAILS & SWITCH VIEW (Uses EmailJS - will fail until keys are added)
            // -----------------------------------------------------
            if (nextButton) {
                nextButton.addEventListener('click', function() {
                    const requiredInputs = stepOne.querySelectorAll('[required]');
                    let allFilled = true;
                    requiredInputs.forEach(input => {
                        if (!input.value.trim()) { allFilled = false; input.style.border = '2px solid red'; } 
                        else { input.style.border = '1px solid #333'; }
                    });

                    if (allFilled) {
                        nextButton.disabled = true; 
                        nextButton.textContent = "Sending Details...";
                        
                        const formData = new FormData(form);
                        const templateParams = Object.fromEntries(formData.entries());
                        
                        // --- EMAILJS SUBMISSION 1 ---
                        emailjs.send(YOUR_SERVICE_ID, SHIPPING_TEMPLATE_ID, templateParams)
                            .then(function(response) {
                                console.log('Email 1 (Details) SENT successfully!');
                                // ON SUCCESS: HIDE STEP 1, SHOW STEP 2
                                stepOne.style.display = 'none';
                                stepTwo.style.display = 'block';
                                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                nextButton.disabled = false; 
                                nextButton.textContent = "Details Sent! Proceed to Payment";
                            }, function(error) {
                                console.error('Email 1 FAILED to send:', error);
                                alert('ERROR: Check your console and EmailJS keys.');
                                nextButton.disabled = false;
                                nextButton.textContent = "Proceed to Payment (Error)";
                            });
                    } else {
                        alert('Please fill out all shipping details before proceeding.');
                    }
                });
            }


           // -----------------------------------------------------
            // 3. LOGIC FOR STEP 2: SEND PAYMENT CONFIRMATION & REDIRECT (NOW ON-PAGE CONFIRMATION)
            // -----------------------------------------------------
            if (form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault(); // Stop the default page reload

                    finalSubmitButton.disabled = true;
                    finalSubmitButton.textContent = "Submitting Confirmation...";
                    
                    const formData = new FormData(form);
                    const templateParams = Object.fromEntries(formData.entries());
                    templateParams['Payment_Status'] = 'Customer CLICKED Final Submit Button';

                    // --- EMAILJS SUBMISSION 2: PAYMENT CLICK CONFIRMATION ---
                    emailjs.send(YOUR_SERVICE_ID, PAYMENT_TEMPLATE_ID, templateParams)
                        .then(function(response) {
                            console.log('Email 2 (Payment) SENT successfully!');
                            
                            // *** CHANGE STARTS HERE ***

                            // 1. Hide the entire form section
                            const formSection = document.getElementById('order-form-section');
                            if (formSection) {
                                formSection.innerHTML = `
                                    <div class="container" style="text-align: center; padding: 50px 0;">
                                        <h2 style="color: #4CAF50; font-size: 36px;">✅ Order Confirmed!</h2>
                                        <p style="font-size: 18px; margin-top: 20px;color:white">
                                            We have received your payment confirmation. Our team is verifying the payment and preparing your shipment. You will receive tracking details via email shortly.
                                        </p>
                                    </div>
                                `;
                                formSection.classList.add('is-visible'); // Ensure the section stays visible
                            }
                            // *** CHANGE ENDS HERE ***

                        }, function(error) {
                            console.error('Email 2 FAILED to send:', error);
                            alert('Error submitting payment confirmation. Please try again.');
                            
                            finalSubmitButton.disabled = false;
                            finalSubmitButton.textContent = "I Have Paid - Submit Order Confirmation";
                        });
                });
            }


            // 4. STEP 2 BACK TO STEP 1 TRANSITION
            if (backButton) {
                backButton.addEventListener('click', function() {
                    stepTwo.style.display = 'none';
                    stepOne.style.display = 'block';
                    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        });

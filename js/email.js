        // Initialize EmailJS with your public key
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
        emailjs.init('LBgJlFOIMoFcHH2rD');

        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const statusMessage = document.getElementById('statusMessage');

        function showMessage(message, type) {
            statusMessage.textContent = message;
            statusMessage.className = `status-message ${type} show`;
            
            setTimeout(() => {
                statusMessage.className = 'status-message';
            }, 5000);
        }

        function setLoading(isLoading) {
            if (isLoading) {
                submitBtn.innerHTML = '<span class="loading"></span>Sending...';
                submitBtn.disabled = true;
            } else {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            setLoading(true);
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.sendForm('service_b50ik2e', 'template_wido1td', form)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
        });

        // Add input animation effects
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
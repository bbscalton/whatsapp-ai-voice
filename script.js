/**
 * Neuereatec WhatsApp AI Voice Agent - Marketing Site
 * Premium interactions and animations
 */

// Demo number constant - easy to change
const DEMO_NUMBER = '+592 712 9487';
const DEMO_NUMBER_RAW = '5927129487';
const WHATSAPP_LINK = `https://wa.me/${DEMO_NUMBER_RAW}`;
const TEL_LINK = `tel:+${DEMO_NUMBER_RAW}`;

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initFAQ();
    initDemoConversation();
    initVideoSection();
    initSmoothScroll();
    updateDemoLinks();
});

/**
 * Update demo links with the constant number
 */
function updateDemoLinks() {
    const demoNumberEl = document.getElementById('demoNumber');
    const whatsappLink = document.getElementById('whatsappCallLink');
    const telLink = document.getElementById('telLink');
    
    if (demoNumberEl) demoNumberEl.textContent = DEMO_NUMBER;
    if (whatsappLink) whatsappLink.href = WHATSAPP_LINK;
    if (telLink) telLink.href = TEL_LINK;
}

/**
 * Navigation functionality
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    
    // Scroll behavior for nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu toggle
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        navMobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMobile.classList.remove('active');
            });
        });
    }
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    if (prefersReducedMotion) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elements.forEach(el => {
        // Check if element is already in viewport on load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });
}

/**
 * Demo conversation animation
 */
function initDemoConversation() {
    const conversationEl = document.getElementById('demoConversation');
    const speakingEl = document.getElementById('demoSpeaking');
    
    if (!conversationEl) return;
    
    const conversation = [
        { type: 'customer', text: '"Hi, I want to know about business loans"' },
        { type: 'ai', text: '"Hello! I\'d be happy to help you with business loans. Are you looking for a new loan or information about an existing one?"' },
        { type: 'customer', text: '"A new loan. I want to start a wash bay"' },
        { type: 'ai', text: '"Great choice! For a wash bay business, you\'d typically need G$2-5 million depending on size. Would you like me to explain the requirements and interest rates?"' },
        { type: 'customer', text: '"Yes please"' },
        { type: 'ai', text: '"Perfect! You\'ll need a business plan, proof of location, and 20% equity. Current rates start at 8%. Shall I connect you with a loan officer for details?"' }
    ];
    
    let currentIndex = 0;
    
    function addBubble() {
        if (currentIndex >= conversation.length) {
            // Reset after a pause
            setTimeout(() => {
                conversationEl.innerHTML = '';
                currentIndex = 0;
                setTimeout(addBubble, 1000);
            }, 4000);
            return;
        }
        
        const msg = conversation[currentIndex];
        const bubble = document.createElement('div');
        bubble.className = `demo-bubble ${msg.type}`;
        bubble.textContent = msg.text;
        conversationEl.appendChild(bubble);
        
        // Update speaking indicator
        if (speakingEl) {
            speakingEl.textContent = msg.type === 'ai' ? 'AI is speaking...' : 'Customer is speaking...';
        }
        
        // Scroll to bottom
        conversationEl.scrollTop = conversationEl.scrollHeight;
        
        // Show bubble with animation
        if (!prefersReducedMotion) {
            requestAnimationFrame(() => {
                bubble.classList.add('visible');
            });
        } else {
            bubble.classList.add('visible');
        }
        
        currentIndex++;
        
        // Add next bubble after delay
        const delay = msg.type === 'ai' ? 3000 : 2000;
        setTimeout(addBubble, delay);
    }
    
    // Start when section is visible
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(addBubble, 1000);
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        
        observer.observe(demoSection);
    }
}

/**
 * Video section functionality
 */
function initVideoSection() {
    const video = document.getElementById('promoVideo');
    const soundBtn = document.getElementById('videoSoundBtn');
    const playBtn = document.getElementById('videoPlayBtn');
    const soundOnIcon = document.getElementById('soundOnIcon');
    const soundOffIcon = document.getElementById('soundOffIcon');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    
    if (!video) return;
    
    // Autoplay on scroll into view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {
                    // Autoplay blocked - show play button
                    if (playIcon) playIcon.style.display = 'block';
                    if (pauseIcon) pauseIcon.style.display = 'none';
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(video);
    
    // Sound toggle
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (soundOnIcon && soundOffIcon) {
                soundOnIcon.style.display = video.muted ? 'none' : 'block';
                soundOffIcon.style.display = video.muted ? 'block' : 'none';
            }
        });
    }
    
    // Play/Pause toggle
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
            } else {
                video.pause();
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }
        });
        
        video.addEventListener('play', () => {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        });
        
        video.addEventListener('pause', () => {
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        });
    }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('nav')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                if (prefersReducedMotion) {
                    window.scrollTo(0, targetPosition);
                } else {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Hero phone mockup - animate waveform randomly
 */
(function initHeroWaveform() {
    if (prefersReducedMotion) return;
    
    const waveBars = document.querySelectorAll('#waveform .wave-bar');
    if (waveBars.length === 0) return;
    
    function animateWave() {
        waveBars.forEach(bar => {
            const height = 15 + Math.random() * 30;
            bar.style.height = `${height}px`;
        });
    }
    
    setInterval(animateWave, 150);
})();

/**
 * Call timer animation
 */
(function initCallTimer() {
    const timerEl = document.querySelector('.call-timer');
    if (!timerEl) return;
    
    let seconds = 154; // Start at 02:34
    
    setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
})();

/**
 * Typing animation for hero transcript
 */
(function initTypingAnimation() {
    if (prefersReducedMotion) return;
    
    const typingBubble = document.querySelector('.transcript-bubble.typing');
    if (!typingBubble) return;
    
    // After a delay, replace with actual response
    setTimeout(() => {
        typingBubble.classList.remove('typing');
        typingBubble.innerHTML = '"Perfect! That\'s two mauby added. Your total is G$4,400. Ready in 15 minutes. Name for the order?"';
    }, 3000);
})();

/**
 * Industry Demo Modal
 */
(function initIndustryDemoModal() {
    const modal = document.getElementById('demoModal');
    const backdrop = document.getElementById('demoModalBackdrop');
    const closeBtn = document.getElementById('demoModalClose');
    const avatarEl = document.getElementById('demoModalAvatar');
    const titleEl = document.getElementById('demoModalTitle');
    const timerEl = document.getElementById('demoModalTimer');
    const waveformEl = document.getElementById('demoModalWaveform');
    const conversationEl = document.getElementById('demoModalConversation');
    const ctaEl = document.getElementById('demoModalCta');
    const soundCheckbox = document.getElementById('demoSoundCheckbox');
    const industryCards = document.querySelectorAll('.industry-card[data-demo]');
    
    if (!modal || industryCards.length === 0) return;
    
    const demos = {
        restaurant: {
            emoji: '🍗',
            name: 'Island Grill',
            conversation: [
                { type: 'customer', text: 'Hello, I want to place an order' },
                { type: 'ai', text: 'Hi! Welcome to Island Grill. What can I get for you today?' },
                { type: 'customer', text: 'Two curry duck with rice, one to go' },
                { type: 'ai', text: 'Got it! Two curry duck with rice—one dine-in, one takeaway. Would you like anything to drink?' },
                { type: 'customer', text: 'Add two mauby please' },
                { type: 'ai', text: 'Perfect! Two mauby added. Your total is G$4,400. Ready in 15 minutes. Name for the order?' }
            ]
        },
        salon: {
            emoji: '💇',
            name: 'Style Studio',
            conversation: [
                { type: 'customer', text: 'Hi, I want to book an appointment' },
                { type: 'ai', text: 'Hello! Welcome to Style Studio. What service would you like?' },
                { type: 'customer', text: 'A trim and fade for Saturday 3pm' },
                { type: 'ai', text: 'Let me check... Saturday at 3pm is available! That\'s a trim and fade. Any particular barber you prefer?' },
                { type: 'customer', text: 'Marcus if he\'s free' },
                { type: 'ai', text: 'Great news—Marcus is available at 3pm Saturday. You\'re all booked! We\'ll send a reminder. See you then!' }
            ]
        },
        clinic: {
            emoji: '🏥',
            name: 'Health First Clinic',
            conversation: [
                { type: 'customer', text: 'I need to schedule a checkup' },
                { type: 'ai', text: 'Good day! Thank you for calling Health First Clinic. What type of appointment do you need?' },
                { type: 'customer', text: 'A general checkup with Dr. Singh' },
                { type: 'ai', text: 'Dr. Singh has openings on Monday at 9am or Wednesday at 2pm. Which works better?' },
                { type: 'customer', text: 'Wednesday 2pm please' },
                { type: 'ai', text: 'Done! You\'re booked with Dr. Singh, Wednesday at 2pm. Please bring your ID and any past test results. Is this number good for reminders?' }
            ]
        },
        hardware: {
            emoji: '🔧',
            name: 'Build Right Hardware',
            conversation: [
                { type: 'customer', text: 'You have 3-inch PVC pipes in stock?' },
                { type: 'ai', text: 'Hi! Yes, we have 3-inch PVC pipes. How many feet do you need?' },
                { type: 'customer', text: 'I need about 20 feet. What\'s the price?' },
                { type: 'ai', text: '20 feet is no problem. It\'s G$450 per foot, so G$9,000 total. We also have fittings if you need them.' },
                { type: 'customer', text: 'Okay, set aside 20 feet for me' },
                { type: 'ai', text: 'Set aside! Pick up anytime today before 6pm. What name should I put on it?' }
            ]
        },
        rental: {
            emoji: '🚗',
            name: 'EZ Drive Rentals',
            conversation: [
                { type: 'customer', text: 'I want to rent a car for next weekend' },
                { type: 'ai', text: 'Hello! Welcome to EZ Drive Rentals. What dates do you need the car?' },
                { type: 'customer', text: 'Friday evening to Sunday night' },
                { type: 'ai', text: 'Got it—Friday to Sunday. We have a Toyota Corolla at G$15,000/day or a Rav4 at G$22,000/day. Preference?' },
                { type: 'customer', text: 'The Corolla is fine' },
                { type: 'ai', text: 'Perfect! Toyota Corolla, Friday to Sunday—that\'s G$45,000 total. I\'ll need a driver\'s license on pickup. Should I reserve it?' }
            ]
        },
        transport: {
            emoji: '🚐',
            name: 'GT Transport',
            conversation: [
                { type: 'customer', text: 'What time the bus leave for Berbice?' },
                { type: 'ai', text: 'Good day! GT Transport has buses to Berbice at 6am, 9am, 12pm, and 3pm daily.' },
                { type: 'customer', text: 'How much for the 9am bus?' },
                { type: 'ai', text: 'The 9am express is G$2,500 per person. It\'s about a 2-hour trip. How many seats do you need?' },
                { type: 'customer', text: 'Two seats please' },
                { type: 'ai', text: 'Two seats on the 9am Berbice bus—G$5,000 total. Come 15 minutes early. What name for the booking?' }
            ]
        },
        washbay: {
            emoji: '🚿',
            name: 'Sparkle Wash Bay',
            conversation: [
                { type: 'customer', text: 'I want to book a full detail for 2pm' },
                { type: 'ai', text: 'Hi there! Welcome to Sparkle Wash Bay. A full detail at 2pm—let me check availability.' },
                { type: 'customer', text: 'Yes, 2pm if you have it' },
                { type: 'ai', text: '2pm is available! Full detail is G$8,000 and takes about 2 hours. That work for you?' },
                { type: 'customer', text: 'Yes, book it' },
                { type: 'ai', text: 'You\'re booked for 2pm today—full detail, G$8,000. What\'s the car make and color so we know it\'s you?' }
            ]
        },
        retail: {
            emoji: '🛒',
            name: 'TechZone Store',
            conversation: [
                { type: 'customer', text: 'You have the Samsung fast charger?' },
                { type: 'ai', text: 'Hi! Yes, we have Samsung fast chargers in stock. The 25W is G$8,500 and the 45W is G$12,000.' },
                { type: 'customer', text: 'The 25W one. Can you hold it for me?' },
                { type: 'ai', text: 'Sure! I\'ll set aside the 25W Samsung charger—G$8,500. How long until you can pick it up?' },
                { type: 'customer', text: 'About an hour' },
                { type: 'ai', text: 'Perfect, it\'ll be at the counter for one hour. What name should I put on it?' }
            ]
        }
    };
    
    let currentDemo = null;
    let timerInterval = null;
    let messageIndex = 0;
    let messageTimeout = null;
    let speechSynthesis = window.speechSynthesis;
    let isSoundEnabled = false;
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    function speak(text, isAI) {
        if (!isSoundEnabled || !speechSynthesis) return;
        
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = isAI ? 1.0 : 1.1;
        
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            const preferredVoice = isAI 
                ? voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google UK'))
                : voices.find(v => v.name.includes('Male') || v.name.includes('Daniel') || v.name.includes('Google US'));
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
        }
        
        speechSynthesis.speak(utterance);
    }
    
    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'demo-modal-bubble ai typing';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        conversationEl.appendChild(typing);
        conversationEl.scrollTop = conversationEl.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
    
    function addMessage(msg) {
        removeTypingIndicator();
        
        const bubble = document.createElement('div');
        bubble.className = `demo-modal-bubble ${msg.type}`;
        bubble.textContent = msg.text;
        conversationEl.appendChild(bubble);
        conversationEl.scrollTop = conversationEl.scrollHeight;
        
        speak(msg.text, msg.type === 'ai');
    }
    
    function playConversation() {
        if (!currentDemo || messageIndex >= currentDemo.conversation.length) {
            waveformEl.classList.add('paused');
            ctaEl.hidden = false;
            return;
        }
        
        const msg = currentDemo.conversation[messageIndex];
        const isAI = msg.type === 'ai';
        
        if (isAI && messageIndex > 0) {
            showTypingIndicator();
            messageTimeout = setTimeout(() => {
                addMessage(msg);
                messageIndex++;
                messageTimeout = setTimeout(playConversation, 1500);
            }, 1200);
        } else {
            addMessage(msg);
            messageIndex++;
            const delay = isAI ? 2000 : 1500;
            messageTimeout = setTimeout(playConversation, delay);
        }
    }
    
    function openModal(demoKey) {
        const demo = demos[demoKey];
        if (!demo) return;
        
        currentDemo = demo;
        messageIndex = 0;
        
        avatarEl.textContent = demo.emoji;
        titleEl.textContent = demo.name;
        timerEl.textContent = '00:00';
        conversationEl.innerHTML = '';
        ctaEl.hidden = true;
        waveformEl.classList.remove('paused');
        
        modal.hidden = false;
        document.body.classList.add('modal-open');
        
        closeBtn.focus();
        
        let seconds = 0;
        timerInterval = setInterval(() => {
            seconds++;
            timerEl.textContent = formatTime(seconds);
        }, 1000);
        
        setTimeout(playConversation, 800);
    }
    
    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
        
        if (speechSynthesis) {
            speechSynthesis.cancel();
        }
        
        currentDemo = null;
        messageIndex = 0;
    }
    
    industryCards.forEach(card => {
        card.addEventListener('click', () => {
            const demoKey = card.getAttribute('data-demo');
            openModal(demoKey);
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (modal.hidden) return;
        
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    if (soundCheckbox) {
        soundCheckbox.addEventListener('change', () => {
            isSoundEnabled = soundCheckbox.checked;
            if (isSoundEnabled && speechSynthesis) {
                speechSynthesis.getVoices();
            }
        });
    }
    
    if (speechSynthesis) {
        speechSynthesis.getVoices();
        speechSynthesis.onvoiceschanged = () => {
            speechSynthesis.getVoices();
        };
    }
})();

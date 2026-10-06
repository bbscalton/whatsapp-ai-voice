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
        typingBubble.innerHTML = '"Perfect! That\'s two mauby added. Your total is G$3,200. Ready in 15 minutes. Name for the order?"';
    }, 3000);
})();

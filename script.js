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
    
    // Each line has a matching recording at assets/demo-audio/<demo>/<index>.mp3
    // (AI lines: xAI voice "ara"; callers: other xAI voices).
    const demos = {
        restaurant: {
            emoji: '🍗',
            name: 'Island Grill',
            conversation: [
                { type: 'customer', text: 'Hi, good morning. I want to place an order, please.' },
                { type: 'ai', text: 'Hi, good morning! Welcome to Island Grill. What can I get for you today?' },
                { type: 'customer', text: 'Lemme get two curry duck with rice. One to go.' },
                { type: 'ai', text: 'Alright, two curry duck with rice, one dine-in and one takeaway. You want anything to drink with that?' },
                { type: 'customer', text: 'Yeah, add two mauby, please.' },
                { type: 'ai', text: 'Perfect! Two mauby added. Your total is G$4,400, ready in about 15 minutes. What name should I put on the order?' }
            ]
        },
        salon: {
            emoji: '💇',
            name: 'Style Studio',
            conversation: [
                { type: 'customer', text: 'Hi, good morning. I\'d like to book an appointment.' },
                { type: 'ai', text: 'Hi there, good morning! Welcome to Style Studio. What service you looking for today?' },
                { type: 'customer', text: 'A trim and fade for Saturday at 3, if you have it.' },
                { type: 'ai', text: 'Let me check... okay, Saturday at 3 is open! That\'s a trim and fade. You have a barber you prefer?' },
                { type: 'customer', text: 'Marcus, if he\'s free.' },
                { type: 'ai', text: 'Good news, Marcus is free Saturday at 3. You\'re all booked! We\'ll send you a reminder. See you then!' }
            ]
        },
        clinic: {
            emoji: '🏥',
            name: 'Health First Clinic',
            conversation: [
                { type: 'customer', text: 'Good morning. I need to schedule a checkup, please.' },
                { type: 'ai', text: 'Good morning! Thanks for calling Health First Clinic. What kind of appointment do you need?' },
                { type: 'customer', text: 'Just a general checkup with Dr. Singh.' },
                { type: 'ai', text: 'Sure. Dr. Singh has Monday at 9am or Wednesday at 2pm. Which one works better for you?' },
                { type: 'customer', text: 'Wednesday at 2, please.' },
                { type: 'ai', text: 'Done! You\'re booked with Dr. Singh, Wednesday at 2pm. Just bring your ID and any past test results. Is this number good for reminders?' }
            ]
        },
        hardware: {
            emoji: '🔧',
            name: 'Build Right Hardware',
            conversation: [
                { type: 'customer', text: 'Morning! You have 3-inch PVC pipe in stock?' },
                { type: 'ai', text: 'Morning! Yes, we have 3-inch PVC pipe. How many feet you need?' },
                { type: 'customer', text: 'About 20 feet. How much that going to cost?' },
                { type: 'ai', text: 'Twenty feet is no problem. It\'s G$450 a foot, so G$9,000 total. We have the fittings too, if you need them.' },
                { type: 'customer', text: 'Okay, set aside 20 feet for me.' },
                { type: 'ai', text: 'All set aside! You can pick it up anytime today before 6. What name should I put on it?' }
            ]
        },
        rental: {
            emoji: '🚗',
            name: 'EZ Drive Rentals',
            conversation: [
                { type: 'customer', text: 'Hi, good afternoon. I want to rent a car for next weekend.' },
                { type: 'ai', text: 'Good afternoon! Welcome to EZ Drive Rentals. What days you need the car?' },
                { type: 'customer', text: 'Friday evening till Sunday night.' },
                { type: 'ai', text: 'Got it, Friday to Sunday. We have a Toyota Corolla at G$15,000 a day, or a RAV4 at G$22,000 a day. Which one you prefer?' },
                { type: 'customer', text: 'The Corolla is fine.' },
                { type: 'ai', text: 'Perfect! The Corolla, Friday to Sunday, comes to G$45,000 total. Just bring your driver\'s license at pickup. Should I reserve it for you?' }
            ]
        },
        transport: {
            emoji: '🚐',
            name: 'GT Transport',
            conversation: [
                { type: 'customer', text: 'Morning. What time the bus leave for Berbice?' },
                { type: 'ai', text: 'Good morning! GT Transport has buses to Berbice at 6, 9, 12 and 3, every day.' },
                { type: 'customer', text: 'How much for the 9 o\'clock bus?' },
                { type: 'ai', text: 'The 9 o\'clock express is G$2,500 a person. It\'s about a two-hour drive. How many seats you need?' },
                { type: 'customer', text: 'Two seats, please.' },
                { type: 'ai', text: 'Alright, two seats on the 9 o\'clock to Berbice, that\'s G$5,000 total. Try to come about 15 minutes early. What name for the booking?' }
            ]
        },
        washbay: {
            emoji: '🚿',
            name: 'Sparkle Wash Bay',
            conversation: [
                { type: 'customer', text: 'Hello, I want car wash.' },
                { type: 'ai', text: 'Sure, I can book that for you. Can I get your name, the car model, and the plate number?' },
                { type: 'customer', text: 'John Doe. Silver Fielder wagon, plate PCB 1234.' },
                { type: 'ai', text: 'Okay, thank you, John! You\'re booked in for the wash bay.' }
            ]
        },
        retail: {
            emoji: '🛒',
            name: 'TechZone Store',
            conversation: [
                { type: 'customer', text: 'Hi, you have the Samsung fast charger?' },
                { type: 'ai', text: 'Hi! Yes, we have Samsung fast chargers in stock. The 25W is G$8,500 and the 45W is G$12,000.' },
                { type: 'customer', text: 'The 25W one. Could you hold it for me?' },
                { type: 'ai', text: 'Sure thing! I\'ll put aside the 25W Samsung charger for you, G$8,500. How long before you can pick it up?' },
                { type: 'customer', text: 'About an hour.' },
                { type: 'ai', text: 'Perfect, it\'ll be right at the counter for you for the next hour. What name should I put it under?' }
            ]
        }
    };

    const AUDIO_BASE = 'assets/demo-audio/';
    const AUDIO_GAP_MS = 300;      // pause between recorded lines (typing dots shown)
    const CLIP_GUARD_MS = 25000;   // safety net if a clip never reports "ended"
    const soundLabelEl = document.getElementById('demoSoundLabel');

    let currentDemo = null;
    let currentKey = null;
    let timerInterval = null;
    let messageIndex = 0;          // index of the next line to show
    let messageTimeout = null;
    let isSoundEnabled = false;
    let runToken = 0;              // bumps on open/close so stale callbacks do nothing
    let cancelClip = null;         // stops the clip currently playing (if any)

    // One reusable <audio> element: once it has played inside a user tap,
    // mobile browsers let it keep playing new clips programmatically.
    const player = new Audio();
    player.preload = 'auto';
    const preloaded = new Set();

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function clipUrl(key, index) {
        return `${AUDIO_BASE}${key}/${index}.mp3`;
    }

    function preloadClip(index) {
        if (!currentDemo || index >= currentDemo.conversation.length) return;
        const url = clipUrl(currentKey, index);
        if (preloaded.has(url)) return;
        preloaded.add(url);
        const a = new Audio();
        a.preload = 'auto';
        a.src = url;
        a.load();
    }

    function stopClip() {
        if (cancelClip) {
            const c = cancelClip;
            cancelClip = null;
            c();
        }
        player.pause();
    }

    // Plays the recording for line `index`; calls onDone(true) when it ends,
    // onDone(false) if it can't load/play (caller falls back to text timing).
    function playClip(index, onDone) {
        stopClip();
        const token = runToken;
        let finished = false;
        let guard = null;
        const cleanup = () => {
            finished = true;
            clearTimeout(guard);
            player.onended = null;
            player.onerror = null;
        };
        const done = (ok) => {
            if (finished) return;
            cleanup();
            cancelClip = null;
            if (token === runToken) onDone(ok);
        };
        cancelClip = cleanup;
        player.onended = () => done(true);
        player.onerror = () => done(false);
        player.src = clipUrl(currentKey, index);
        guard = setTimeout(() => done(false), CLIP_GUARD_MS);
        try {
            const p = player.play();
            if (p && typeof p.catch === 'function') p.catch(() => done(false));
        } catch (e) {
            done(false);
        }
        preloadClip(index + 1);
    }

    function showTypingIndicator(type) {
        removeTypingIndicator();
        const typing = document.createElement('div');
        typing.className = `demo-modal-bubble ${type || 'ai'} typing`;
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        conversationEl.appendChild(typing);
        conversationEl.scrollTop = conversationEl.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    function clearPending() {
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            messageTimeout = null;
        }
    }

    function schedule(fn, ms) {
        clearPending();
        const token = runToken;
        messageTimeout = setTimeout(() => {
            messageTimeout = null;
            if (token === runToken) fn();
        }, ms);
    }

    function textDelayAfter(msg) {
        return msg.type === 'ai' ? 2000 : 1500;
    }

    function finishConversation() {
        removeTypingIndicator();
        waveformEl.classList.add('paused');
        ctaEl.hidden = false;
    }

    function addBubble(msg) {
        removeTypingIndicator();
        const bubble = document.createElement('div');
        bubble.className = `demo-modal-bubble ${msg.type}`;
        bubble.textContent = msg.text;
        conversationEl.appendChild(bubble);
        conversationEl.scrollTop = conversationEl.scrollHeight;
    }

    // After line `index` has been shown (and heard), move on to the next one.
    function afterLine(index, playedOk) {
        if (!currentDemo) return;
        const conv = currentDemo.conversation;
        if (index + 1 >= conv.length) {
            if (isSoundEnabled && playedOk) {
                finishConversation();
            } else {
                schedule(finishConversation, textDelayAfter(conv[index]));
            }
            return;
        }
        if (isSoundEnabled && playedOk) {
            // Clip finished: short gap with typing dots, then the next line.
            showTypingIndicator(conv[index + 1].type);
            schedule(() => showLine(index + 1), AUDIO_GAP_MS);
        } else {
            schedule(playConversation, textDelayAfter(conv[index]));
        }
    }

    function showLine(index) {
        if (!currentDemo) return;
        const msg = currentDemo.conversation[index];
        addBubble(msg);
        messageIndex = index + 1;
        if (isSoundEnabled) {
            playClip(index, (ok) => afterLine(index, ok));
        } else {
            afterLine(index, false);
        }
    }

    // Text-only pacing (also used to start the next line in sound mode).
    function playConversation() {
        if (!currentDemo) return;
        if (messageIndex >= currentDemo.conversation.length) {
            finishConversation();
            return;
        }
        const index = messageIndex;
        const msg = currentDemo.conversation[index];
        if (isSoundEnabled) {
            showLine(index);
        } else if (msg.type === 'ai' && index > 0) {
            showTypingIndicator('ai');
            schedule(() => showLine(index), 1200);
        } else {
            showLine(index);
        }
    }

    function updateSoundLabel() {
        if (soundLabelEl) soundLabelEl.textContent = isSoundEnabled ? 'Sound on' : 'Play with sound';
        if (soundCheckbox) {
            const toggle = soundCheckbox.closest('.demo-modal-sound-toggle');
            if (toggle) toggle.classList.toggle('is-on', isSoundEnabled);
        }
    }

    function resetConversationView() {
        conversationEl.innerHTML = '';
        ctaEl.hidden = true;
        waveformEl.classList.remove('paused');
        messageIndex = 0;
    }

    function openModal(demoKey) {
        const demo = demos[demoKey];
        if (!demo) return;

        runToken++;
        stopClip();
        clearPending();
        currentDemo = demo;
        currentKey = demoKey;
        preloaded.clear();

        avatarEl.textContent = demo.emoji;
        titleEl.textContent = demo.name;
        timerEl.textContent = '00:00';
        resetConversationView();

        modal.hidden = false;
        document.body.classList.add('modal-open');

        closeBtn.focus();

        let seconds = 0;
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            seconds++;
            timerEl.textContent = formatTime(seconds);
        }, 1000);

        if (isSoundEnabled) preloadClip(0);
        schedule(playConversation, 800);
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('modal-open');

        runToken++;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        clearPending();
        stopClip();
        removeTypingIndicator();

        currentDemo = null;
        currentKey = null;
        messageIndex = 0;
    }

    // Runs inside the user's tap on the toggle, so play() is allowed on mobile.
    function onSoundToggle() {
        isSoundEnabled = soundCheckbox.checked;
        updateSoundLabel();

        if (!currentDemo || modal.hidden) return;

        if (!isSoundEnabled) {
            // Sound off: stop the clip and carry on with text-only timing.
            const wasPlaying = !!cancelClip;
            stopClip();
            if (wasPlaying || !messageTimeout) {
                removeTypingIndicator();
                schedule(playConversation, 1200);
            }
            return;
        }

        // Sound on: play from the current line right now (inside the gesture).
        clearPending();
        removeTypingIndicator();
        const conv = currentDemo.conversation;
        if (messageIndex === 0) {
            showLine(0);
        } else if (messageIndex >= conv.length && !ctaEl.hidden) {
            // Demo already finished: replay it from the start with sound.
            resetConversationView();
            showLine(0);
        } else {
            const index = messageIndex - 1;
            playClip(index, (ok) => afterLine(index, ok));
        }
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
        soundCheckbox.addEventListener('change', onSoundToggle);
        updateSoundLabel();
    }
})();

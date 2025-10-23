// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized');
    
    // Initialize all components
    initMobileNavigation();
    initTypingEffect();
    initSkillBars();
    initLightbox();
    initTestimonialSlider();
    initBackToTop();
    initContactForm();
    initScrollEffects();
    initMusicControl();
    initInteractiveBackground();
    loadArticles();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Typing Effect
function initTypingEffect() {
    const words = ["Ethical Hacker", "Web Developer", "Cybersecurity Enthusiast", "Technical Writer"];
    const typingText = document.querySelector('.typing-text');
    
    if (!typingText) return;
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    setTimeout(typeEffect, 1000);
}

// Animate skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }

    window.addEventListener('load', animateSkillBars);
    window.addEventListener('scroll', animateSkillBars);
}

// Lightbox
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const certificateItems = document.querySelectorAll('.certificate-item');
    
    if (!lightbox || !lightboxImg) return;
    
    certificateItems.forEach((item) => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (!testimonialTrack || testimonialItems.length === 0) return;
    
    let currentSlide = 0;

    function showSlide(index) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
        currentSlide = index;
    }

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
    }, 5000);
}

// Back to Top
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitText = document.getElementById('submitText');
        const submitSpinner = document.getElementById('submitSpinner');
        const formStatus = document.getElementById('formStatus');
        
        // Show loading
        if (submitText) submitText.style.display = 'none';
        if (submitSpinner) submitSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            if (formStatus) {
                formStatus.textContent = 'Thank you! Your message has been sent.';
                formStatus.className = 'form-status success';
                formStatus.classList.remove('hidden');
            }
            contactForm.reset();
            
            // Hide status after 5 seconds
            setTimeout(() => {
                if (formStatus) {
                    formStatus.classList.add('hidden');
                }
            }, 5000);
            
            submitBtn.disabled = false;
            if (submitText) submitText.style.display = 'inline-block';
            if (submitSpinner) submitSpinner.style.display = 'none';
        }, 1500);
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 70;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Music Control
function initMusicControl() {
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.getElementById('musicControl');
    
    if (!bgMusic || !musicControl) return;
    
    let isPlaying = false;

    // Enable music on first user interaction
    function enableMusic() {
        if (!isPlaying) {
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                isPlaying = true;
                musicControl.classList.add('playing');
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
        }
        document.removeEventListener('click', enableMusic);
    }

    document.addEventListener('click', enableMusic, { once: true });

    musicControl.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isPlaying) {
            bgMusic.pause();
            musicControl.classList.remove('playing');
        } else {
            bgMusic.play();
            musicControl.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// Enhanced Interactive Background
function initInteractiveBackground() {
    const trailContainer = document.querySelector('.cursor-trail-container');
    const particleField = document.querySelector('.particle-field');
    const cards = document.querySelectorAll('.card');
    
    createParticles();
    
    let trailDots = [];
    const maxTrailDots = 6;
    
    document.addEventListener('mousemove', (e) => {
        createTrailDot(e.clientX, e.clientY);
        updateCardEffects(e);
    });
    
    function createTrailDot(x, y) {
        if (!trailContainer) return;
        
        const dot = document.createElement('div');
        const types = ['primary', 'accent', 'secondary'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        dot.className = `trail-dot ${type}`;
        const size = 8 + Math.random() * 12;
        
        dot.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            opacity: 0.8;
        `;
        
        trailContainer.appendChild(dot);
        trailDots.push({
            element: dot,
            createdAt: Date.now(),
            life: 600 + Math.random() * 400
        });
        
        // Clean up old dots
        if (trailDots.length > maxTrailDots) {
            const oldDot = trailDots.shift();
            if (oldDot.element.parentNode) {
                oldDot.element.remove();
            }
        }
        
        // Animate dots
        trailDots.forEach((dot, index) => {
            const age = Date.now() - dot.createdAt;
            const progress = age / dot.life;
            
            if (progress >= 1) {
                if (dot.element.parentNode) {
                    dot.element.remove();
                }
                trailDots.splice(index, 1);
                return;
            }
            
            const opacity = 0.8 * (1 - progress);
            const scale = 1 - (progress * 0.5);
            
            dot.element.style.opacity = opacity;
            dot.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
    }
    
    function updateCardEffects(e) {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom &&
                e.clientX >= rect.left && e.clientX <= rect.right) {
                
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            }
        });
    }
    
    function createParticles() {
        if (!particleField) return;
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${2 + Math.random() * 3}px;
                height: ${2 + Math.random() * 3}px;
                animation-delay: ${Math.random() * 20}s;
                animation-duration: ${15 + Math.random() * 10}s;
                background: ${Math.random() > 0.5 ? 'var(--accent)' : 'var(--primary-light)'};
            `;
            
            particleField.appendChild(particle);
        }
    }
}

// Load Articles from Netlify CMS
function loadArticles() {
    const articlesContainer = document.getElementById('articles-container');
    
    if (!articlesContainer) return;
    
    // In a real implementation, this would fetch from your Netlify CMS
    // For now, we'll use a simulated response
    setTimeout(() => {
        const sampleArticles = [
            {
                title: "Getting Started with Ethical Hacking",
                excerpt: "Learn the fundamentals of ethical hacking and how to start your journey in cybersecurity.",
                date: "2024-03-15",
                thumbnail: "/images/uploads/ethical-hacking.jpg",
                tags: ["Cybersecurity", "Ethical Hacking", "Beginner"],
                slug: "getting-started-ethical-hacking"
            },
            {
                title: "Web Security Best Practices",
                excerpt: "Essential security practices every web developer should implement to protect their applications.",
                date: "2024-03-10",
                thumbnail: "/images/uploads/web-security.jpg",
                tags: ["Web Development", "Security", "Best Practices"],
                slug: "web-security-best-practices"
            },
            {
                title: "Python for Cybersecurity",
                excerpt: "How Python can be used for various cybersecurity tasks and automation.",
                date: "2024-03-05",
                thumbnail: "/images/uploads/python-cybersecurity.jpg",
                tags: ["Python", "Cybersecurity", "Automation"],
                slug: "python-for-cybersecurity"
            }
        ];
        
        displayArticles(sampleArticles);
    }, 1000);
}

function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    
    if (!articles || articles.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-newspaper text-4xl text-primary-light mb-4"></i>
                <h3 class="text-xl font-bold mb-2">No Articles Yet</h3>
                <p class="opacity-70 mb-4">Check back soon for new content!</p>
                <a href="/admin/" class="btn btn-sm">Write First Article</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = articles.map(article => `
        <article class="article-card card bg-[rgba(30,111,219,0.1)] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border border-[rgba(78,160,255,0.1)]">
            ${article.thumbnail ? `
                <div class="article-image h-48 overflow-hidden">
                    <img src="${article.thumbnail}" alt="${article.title}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
                </div>
            ` : `
                <div class="article-image h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <i class="fas fa-newspaper text-4xl text-white opacity-80"></i>
                </div>
            `}
            
            <div class="article-content p-6">
                <div class="article-meta flex items-center gap-4 text-sm text-primary-light mb-3">
                    <span class="flex items-center gap-1">
                        <i class="fas fa-calendar"></i>
                        ${new Date(article.date).toLocaleDateString('id-ID')}
                    </span>
                </div>
                
                <h3 class="article-title text-xl font-heading font-bold text-primary-light mb-3 leading-tight">
                    ${article.title}
                </h3>
                
                ${article.excerpt ? `
                    <p class="article-excerpt text-light opacity-80 mb-4 leading-relaxed">
                        ${article.excerpt}
                    </p>
                ` : ''}
                
                <div class="article-tags flex flex-wrap gap-2 mb-4">
                    ${(article.tags || []).map(tag => `
                        <span class="tag bg-[rgba(78,160,255,0.1)] text-primary-light px-3 py-1 rounded-full text-xs font-medium">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
                
                <a href="/blog/${article.slug}/" class="read-more btn btn-sm w-full text-center justify-center">
                    Read More <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </article>
    `).join('');
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape');
    const scrolled = window.pageYOffset;
    
    shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading state for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});
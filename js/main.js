// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
    
    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            document.querySelector('.nav').classList.toggle('active');
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .feature, .monetization-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Icon click functionality
    setupIconClickHandlers();
});

// Store reference to currently selected icon
let currentSelectedIcon = null;

// Icon content data
const iconContentData = {
    // Service cards
    'project-operation': {
        title: 'Project Operation',
        content: 'Comprehensive management and optimization of your existing mobile projects, ensuring maximum performance, user retention, and revenue generation across all platforms. Our team provides end-to-end operational support including user acquisition, engagement optimization, monetization strategy implementation, and performance analytics.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" fill="#4285f4" rx="15"/><circle cx="40" cy="40" r="12" fill="white"/></svg>'
    },
    'project-development': {
        title: 'Project Development',
        content: 'Custom mobile applications and games tailored to your specific requirements, built with cutting-edge technologies and designed for exceptional user experience. From concept to launch, we handle everything including UI/UX design, development, testing, deployment, and post-launch support.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" fill="#ea4335" rx="15"/><polygon points="40,30 52,50 28,50" fill="white"/></svg>'
    },
    'self-developed-projects': {
        title: 'Self-Developed Projects',
        content: 'Our own innovative products with multiple proven monetization strategies, specifically designed for global markets and diverse user demographics. These projects showcase our expertise in creating engaging, profitable applications that resonate with users worldwide.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" fill="#34a853" rx="15"/><rect x="30" y="30" width="20" height="20" fill="white" rx="5"/></svg>'
    },
    
    // Features
    'expert-team': {
        title: 'Expert Team',
        content: 'Professionals with extensive experience from leading tech companies like Alibaba, ByteDance, Google, Tencent, and Huawei, bringing world-class expertise to every project. Our team combines technical excellence with business acumen to deliver solutions that drive real results.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" fill="#1a73e8"/><path d="M27,40 L36,49 L53,29" stroke="white" stroke-width="5" fill="none"/></svg>'
    },
    'global-experience': {
        title: 'Global Experience',
        content: 'Proven track record with successful projects across North America, Europe, Asia, and emerging markets, understanding diverse user behaviors and cultural nuances. We help you navigate international markets with confidence.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" fill="#1a73e8"/><path d="M24,27 L56,27 M24,40 L56,40 M24,53 L56,53" stroke="white" stroke-width="5"/></svg>'
    },
    'innovative-solutions': {
        title: 'Innovative Solutions',
        content: 'Cutting-edge technologies including AI integration, AR/VR capabilities, and cloud-native architectures combined with creative approaches to solve complex business challenges. We stay ahead of industry trends to bring you the most effective solutions.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" fill="#1a73e8"/><path d="M40,27 L47,40 L40,53 L33,40 Z" fill="white"/></svg>'
    },
    
    // Contact icons
    'consultation': {
        title: 'Schedule a Consultation',
        content: 'Book a free consultation with our experts to discuss your project requirements, get personalized recommendations, and explore how we can help you achieve your business goals through mobile technology.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="12" y="12" width="56" height="56" fill="#1a73e8" rx="16"/><path d="M27,40 L36,49 L53,31" stroke="white" stroke-width="4" fill="none"/></svg>'
    },
    'email': {
        title: 'Email Communication',
        content: 'Reach out to us via email for detailed inquiries, project proposals, or general questions. Our team responds promptly to ensure efficient communication and quick resolution of your needs.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="12" y="12" width="56" height="56" fill="#4285f4" rx="16"/><circle cx="40" cy="40" r="12" fill="white"/></svg>'
    },
    'phone': {
        title: 'Phone Support',
        content: 'Contact us directly by phone for immediate assistance, urgent matters, or real-time discussions about your project. Our dedicated support team is ready to help you.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="12" y="12" width="56" height="56" fill="#ea4335" rx="16"/><polygon points="40,30 50,48 30,48" fill="white"/></svg>'
    },
    'office': {
        title: 'Office Visit',
        content: 'Visit our office for face-to-face meetings, collaborative workshops, or to see our development environment firsthand. We welcome opportunities for in-person collaboration.',
        icon: '<svg width="80" height="80" viewBox="0 0 80 80"><rect x="12" y="12" width="56" height="56" fill="#34a853" rx="16"/><rect x="30" y="30" width="20" height="20" fill="white" rx="5"/></svg>'
    }
};

// Setup icon click handlers
function setupIconClickHandlers() {
    // Service card icons
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        const iconContainer = card.querySelector('.icon');
        if (iconContainer) {
            const keys = ['project-operation', 'project-development', 'self-developed-projects'];
            if (keys[index]) {
                iconContainer.addEventListener('click', (e) => {
                    handleIconClick(iconContainer, keys[index]);
                });
            }
        }
    });
    
    // Feature icons
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        const icon = feature.querySelector('svg');
        if (icon) {
            const keys = ['expert-team', 'global-experience', 'innovative-solutions'];
            if (keys[index]) {
                icon.addEventListener('click', (e) => {
                    handleIconClick(icon, keys[index]);
                });
            }
        }
    });
    
    // Contact icons
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        const iconContainer = card.querySelector('.contact-icon');
        if (iconContainer) {
            const keys = ['consultation', 'email', 'phone', 'office'];
            if (keys[index]) {
                iconContainer.addEventListener('click', (e) => {
                    handleIconClick(iconContainer, keys[index]);
                });
            }
        }
    });
    
    // Value icons in team page
    const valueIcons = document.querySelectorAll('.value-icon');
    valueIcons.forEach((iconContainer, index) => {
        const icon = iconContainer.querySelector('svg');
        if (icon) {
            icon.addEventListener('click', (e) => {
                handleValueIconClick(icon, index);
            });
        }
    });
}

// Handle icon click with selection state
function handleIconClick(iconElement, key) {
    // Remove previous selection
    clearIconSelection();
    
    // Add selection class
    iconElement.classList.add('icon-selected');
    currentSelectedIcon = iconElement;
    
    // Show modal
    showIconModal(key);
}

// Handle value icon click with selection state
function handleValueIconClick(iconElement, index) {
    // Remove previous selection
    clearIconSelection();
    
    // Add selection class
    iconElement.classList.add('icon-selected');
    currentSelectedIcon = iconElement;
    
    // Show modal
    showValueModal(index);
}

// Clear icon selection
function clearIconSelection() {
    if (currentSelectedIcon) {
        currentSelectedIcon.classList.remove('icon-selected');
        currentSelectedIcon = null;
    }
}

// Show modal for predefined content
function showIconModal(key) {
    if (!iconContentData[key]) return;
    
    const data = iconContentData[key];
    createAndShowModal(data.title, data.content, data.icon);
}

// Show modal for team values
function showValueModal(index) {
    const titles = ['Excellence', 'Innovation', 'Collaboration', 'Integrity', 'Quality'];
    const contents = [
        'We strive for the highest quality in everything we do, from code quality to user experience to client service.',
        'We constantly explore new technologies, methodologies, and ideas to stay ahead of industry trends and deliver cutting-edge solutions.',
        'We work together across disciplines and departments to achieve shared goals and deliver comprehensive solutions.',
        'We uphold the highest ethical standards in all our dealings with clients, partners, and team members.',
        'We are committed to delivering products and services that exceed expectations and stand the test of time.'
    ];
    
    if (titles[index] && contents[index]) {
        // Create icon based on index
        const colors = ['#1a73e8', '#4285f4', '#ea4335', '#34a853', '#9c27b0'];
        const color = colors[index] || '#1a73e8';
        let iconPath = '';
        
        switch(index) {
            case 0: // Excellence - checkmark
                iconPath = '<path d="M27,40 L36,49 L53,29" stroke="white" stroke-width="5" fill="none"/>';
                break;
            case 1: // Innovation - plus
                iconPath = '<path d="M24,40 L56,40 M40,24 L40,56" stroke="white" stroke-width="5"/>';
                break;
            case 2: // Collaboration - circle
                iconPath = '<circle cx="40" cy="40" r="16" fill="white"/>';
                break;
            case 3: // Integrity - curve
                iconPath = '<path d="M24,56 Q40,24 56,56" stroke="white" stroke-width="5" fill="none"/>';
                break;
            case 4: // Quality - square
                iconPath = '<rect x="28" y="28" width="24" height="24" fill="white" rx="6"/>';
                break;
        }
        
        const icon = `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" fill="${color}"/>${iconPath}</svg>`;
        createAndShowModal(titles[index], contents[index], icon);
    }
}

// Create and show modal
function createAndShowModal(title, content, iconHtml) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-icon">
                        ${iconHtml}
                    </div>
                    <p>${content}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Get modal elements
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    // Show modal
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
    
    // Close modal function
    function closeModal() {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.remove();
            // Clear icon selection when modal closes
            clearIconSelection();
        }, 300);
    }
    
    // Close on close button click
    modalClose.addEventListener('click', closeModal);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    }, { once: true });
}
// ===== GLOBAL VARIABLES =====
let heroAutoSlideInterval;

// ===== GALLERY CAROUSEL FUNCTIONALITY =====

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

if (thumbnailBorderDom && thumbnailItemsDom.length > 0) {
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
}
let timeRunning = 3000;

if (nextDom) {
    nextDom.onclick = function(){
        showSlider('next');    
    }
}

if (prevDom) {
    prevDom.onclick = function(){
        showSlider('prev');    
    }
}

let runTimeOut;

function showSlider(type){
    // Get FRESH references each time
    let SliderItemsDom = document.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        // Clone the first item
        let firstItem = SliderItemsDom[0].cloneNode(true);
        let firstThumb = thumbnailItemsDom[0].cloneNode(true);
        
        // Remove originals
        SliderItemsDom[0].remove();
        thumbnailItemsDom[0].remove();
        
        // Append clones to the end
        SliderDom.appendChild(firstItem);
        thumbnailBorderDom.appendChild(firstThumb);
        carouselDom.classList.add('next');
    }else{
        // Clone the last item
        let lastItem = SliderItemsDom[SliderItemsDom.length - 1].cloneNode(true);
        let lastThumb = thumbnailItemsDom[thumbnailItemsDom.length - 1].cloneNode(true);
        
        // Remove originals
        SliderItemsDom[SliderItemsDom.length - 1].remove();
        thumbnailItemsDom[thumbnailItemsDom.length - 1].remove();
        
        // Prepend clones to the beginning
        SliderDom.prepend(lastItem);
        thumbnailBorderDom.prepend(lastThumb);
        carouselDom.classList.add('prev');
    }
    
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}

// ===== HERO SLIDER FUNCTIONALITY =====

// Hero Slider Functionality
let heroSection;
let heroPrevBtn;
let heroNextBtn;

// FIXED: Corrected image URLs and added fallbacks
let heroBgImages = [
  'img/anilao4.jpg',  // Local image
  'https://images.squarespace-cdn.com/content/v1/5d611ea85467960001fe6965/1581226402707-CWM5D0SRD1I7LV7WQSGG/Clownfish1a.jpg', 
  'https://bontocseaviewguesthouse.weebly.com/uploads/7/9/4/6/79469738/img-0007b_orig.jpg',
  'https://bontocseaviewguesthouse.weebly.com/uploads/7/9/4/6/79469738/img-3671b_orig.jpg',
  'https://thepinaysolobackpacker.com/wp-content/uploads/2017/03/SEPOC-ISLAND-5-1-of-1-1024x684.jpg',
  'https://bontocseaviewguesthouse.weebly.com/uploads/7/9/4/6/79469738/img-9818b_orig.jpg'
];

let currentHeroBgIndex = 0;

// Function to create indicators
function createHeroIndicators() {
  const indicatorsContainer = document.querySelector('.hero-indicators');
  if (!indicatorsContainer) return;
  
  indicatorsContainer.innerHTML = '';
  
  heroBgImages.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('hero-indicator');
    if (index === currentHeroBgIndex) {
      indicator.classList.add('active');
    }
    
    indicator.addEventListener('click', () => {
      currentHeroBgIndex = index;
      changeHeroBackground('direct');
      resetAutoSlide();
    });
    
    indicatorsContainer.appendChild(indicator);
  });
}

// Function to change hero background
function changeHeroBackground(direction = 'next') {
  if (direction === 'next') {
    currentHeroBgIndex = (currentHeroBgIndex + 1) % heroBgImages.length;
  } else if (direction === 'prev') {
    currentHeroBgIndex = (currentHeroBgIndex - 1 + heroBgImages.length) % heroBgImages.length;
  }
  
  // Add fade transition
  if (heroSection) {
    heroSection.style.opacity = '0.7';
    
    setTimeout(() => {
      const img = new Image();
      img.src = heroBgImages[currentHeroBgIndex];
      
      img.onload = function() {
        heroSection.style.backgroundImage = `url('${heroBgImages[currentHeroBgIndex]}')`;
        heroSection.style.opacity = '1';
      };
      
      img.onerror = function() {
        console.error('Failed to load image:', heroBgImages[currentHeroBgIndex]);
        heroSection.style.backgroundImage = `url('img/anilao4.jpg')`; // Fallback
        heroSection.style.opacity = '1';
      };
    }, 300);
  }
  
  // Update active indicator
  updateHeroIndicators();
}

// Update indicators
function updateHeroIndicators() {
  const indicators = document.querySelectorAll('.hero-indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentHeroBgIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Auto slide functionality
function startAutoSlide() {
  if (heroBgImages.length > 0) {
    heroAutoSlideInterval = setInterval(() => {
      changeHeroBackground('next');
    }, 5000); // Change every 5 seconds
  }
}

function resetAutoSlide() {
  clearInterval(heroAutoSlideInterval);
  startAutoSlide();
}

// ===== MOBILE HAMBURGER MENU FUNCTIONALITY =====

// Initialize mobile menu
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;
  
  if (!hamburgerBtn || !mobileMenu) return;
  
  // Toggle mobile menu
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });
  
  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('no-scroll');
    }
  });
}

// ===== NAVIGATION & SCROLLING =====

// Smooth scroll for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Update active navigation links
function updateActiveNavLinks() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-tab, .mobile-nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== MAP TOGGLE FUNCTION =====

function toggleMap() {
  const mapContainer = document.getElementById('mapContainer');
  const toggleBtn = document.querySelector('.map-toggle');
  
  if (mapContainer && toggleBtn) {
    if (mapContainer.style.display === 'block' || mapContainer.style.display === '') {
      mapContainer.style.display = 'none';
      toggleBtn.textContent = 'Show Map';
      toggleBtn.innerHTML = '<i class="fas fa-map"></i> Show Map';
    } else {
      mapContainer.style.display = 'block';
      toggleBtn.textContent = 'Hide Map';
      toggleBtn.innerHTML = '<i class="fas fa-times"></i> Hide Map';
    }
  }
}

// ===== COUNT-UP ANIMATION FOR STATS =====

function animateCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-count'));
    const duration = 1800; // 1.8 seconds
    const startTime = Date.now();
    
    // Format the number based on its type
    const formatNumber = (num) => {
      if (stat.getAttribute('data-count') === '4.8') {
        return num.toFixed(1);
      } else if (stat.getAttribute('data-count') === '100' || 
                 stat.getAttribute('data-count') === '85') {
        return Math.round(num);
      } else {
        return Math.round(num).toLocaleString();
      }
    };
    
    const updateNumber = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = target * easeOutQuart;
      
      stat.textContent = formatNumber(current);
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // Add suffixes after animation completes
        if (stat.getAttribute('data-count') === '15000') {
          stat.textContent = formatNumber(target) + '';
        } else if (stat.getAttribute('data-count') === '4.8') {
          stat.textContent = formatNumber(target) + '';
        } else if (stat.getAttribute('data-count') === '85' || 
                   stat.getAttribute('data-count') === '100') {
          stat.textContent = formatNumber(target) + '';
        }
      }
    };
    
    requestAnimationFrame(updateNumber);
  });
}

// Intersection Observer for count-up animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCountUp();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

// ===== MASONRY GALLERY FUNCTIONS =====

function showMasonryGallery() {
  const gallery = document.getElementById('masonryGallery');
  if (gallery) {
    gallery.style.display = 'block';
    
    // Smooth scroll to gallery
    gallery.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    
    // Start animations
    startMasonryAnimations();
  }
}

function closeMasonryGallery() {
  const gallery = document.getElementById('masonryGallery');
  if (gallery) {
    gallery.style.display = 'none';
  }
}

function startMasonryAnimations() {
  const columns = document.querySelectorAll('.masonry-column');
  
  columns.forEach((column, index) => {
    // Reset animations
    column.style.animation = 'none';
    void column.offsetWidth; // Trigger reflow
    
    // Set different speeds and directions for each column
    let direction;
    let duration;
    
    switch(index) {
      case 0: // Column 1 - Top to Bottom
        direction = 'slideDown';
        duration = '25s';
        break;
      case 1: // Column 2 - Bottom to Top
        direction = 'slideUp';
        duration = '30s';
        break;
      case 2: // Column 3 - Top to Bottom
        direction = 'slideDown';
        duration = '35s';
        break;
      case 3: // Column 4 - Bottom to Top
        direction = 'slideUp';
        duration = '40s';
        break;
      default:
        direction = 'slideDown';
        duration = '25s';
    }
    
    column.style.animation = `${direction} ${duration} linear infinite`;
  });
}

function preloadMasonryImages() {
  const imageUrls = [
    'https://i0.wp.com/lbtimes.ph/wp-content/uploads/2023/07/Screenshot-1349.png?ssl=1',
    'https://miro.medium.com/v2/resize:fit:5040/1*r8ZQZCf-6-dqVvOfInbBeA.jpeg',
    'https://www.thepoortraveler.net/wp-content/uploads/2014/02/Anilao-Mabini-Batangas-Sunset.jpg',
    'https://myscubadivinggearguide.com/wp-content/uploads/2018/12/Anilao1.jpg',
    'https://www.thepoortraveler.net/wp-content/uploads/2017/03/Masasa-Beach-Batangas-1.jpg',
    'https://steemitimages.com/DQmekuwHS4Mww33tfssQjPH6UnJzz2fBsiWAghQupcpcai4/almost%20fiesta.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/9d/ec/f5/aerial-pic-by-c-carlos.jpg?w=900&h=500&s=1',
    'https://image.kkday.com/v2/image/get/s1.kkday.com/product_129819/20220526071712_g7Eu2/jpg',
    'https://d2p1cf6997m1ir.cloudfront.net/media/thumbnails/06/00/0600e284c1b435ed9264e179ff80428f.webp',
    'https://thequeensescape.com/wp-content/uploads/2020/11/Mt.-Gulugod-Baboy-Hike-1-1024x576.jpg',
    'https://businessmirror.com.ph/wp-content/uploads/2024/02/bio01c-021824.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/9c/2a/5d/sombrero-island.jpg?w=1200&h=-1&s=1'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Function to subscribe to newsletter
function subscribeNewsletter() {
  const email = prompt("Enter your email to subscribe to Mabini travel updates:");
  if (email && email.includes('@')) {
    alert(`Thank you for subscribing! You'll receive updates about Mabini attractions.`);
    // In a real application, you would send this to your backend
    console.log(`Newsletter subscription: ${email}`);
  } else if (email) {
    alert("Please enter a valid email address.");
  }
}

// ===== IMAGE MODAL FUNCTIONALITY =====

function initImageModals() {
  // Add CSS for image modal
  if (!document.getElementById('image-modal-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'image-modal-styles';
    styleSheet.textContent = `
      .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        padding: 20px;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease-out;
      }
      
      .image-modal .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease-out;
      }
      
      @keyframes zoomIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      
      .image-modal img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      }
      
      .image-modal .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: white;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.1);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
      }
      
      .image-modal .close-modal:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
      }
      
      .modal-caption {
        color: white;
        text-align: center;
        margin-top: 15px;
        font-size: 1.2rem;
        font-weight: 500;
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Add click listeners to masonry items for zoom effect
  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.querySelector('.overlay').textContent;
      
      // Create modal for larger view
      const modal = document.createElement('div');
      modal.className = 'image-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <img src="${imgSrc}" alt="${title}">
          <div class="modal-caption">${title}</div>
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close modal functionality
      modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });
}

// ===== RESPONSIVE FIXES =====

// Add this function to detect and fix overflow issues
function fixOverflowIssues() {
  // Fix masonry gallery width
  const masonryGallery = document.getElementById('masonryGallery');
  if (masonryGallery) {
      masonryGallery.style.maxWidth = '100%';
      masonryGallery.style.overflow = 'hidden';
  }
  
  // Fix carousel width
  const carousel = document.querySelector('.carousel');
  if (carousel) {
      carousel.style.maxWidth = '100%';
      carousel.style.overflow = 'hidden';
  }
}

// Detect mobile and apply fixes
function detectMobile() {
  return window.innerWidth <= 768;
}

function applyMobileFixes() {
  if (detectMobile()) {
    // Fix carousel positioning
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.style.width = '100vw';
      carousel.style.marginLeft = '0';
      carousel.style.padding = '0';
    }
    
    // Fix all sections width
    document.querySelectorAll('section').forEach(section => {
      section.style.width = '100%';
      section.style.maxWidth = '100%';
      section.style.margin = '0';
      section.style.padding = '0 15px';
    });
  }
}

// ===== ABOUT SECTION EXPANDABLE CARDS FOR MOBILE =====

function initExpandableAboutCards() {
  // Only enable on mobile devices
  if (window.innerWidth <= 768) {
    const aboutCards = document.querySelectorAll('.about-card');
    
    aboutCards.forEach(card => {
      // Add click event to expand/collapse
      card.addEventListener('click', function() {
        // Close all other cards first
        aboutCards.forEach(otherCard => {
          if (otherCard !== this && otherCard.classList.contains('expanded')) {
            otherCard.classList.remove('expanded');
          }
        });
        
        // Toggle current card
        this.classList.toggle('expanded');
      });
      
      // Add keyboard support
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
      
      // Make cards focusable for accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
      
      // Update aria attribute when expanded
      card.addEventListener('click', function() {
        const isExpanded = this.classList.contains('expanded');
        this.setAttribute('aria-expanded', isExpanded.toString());
        
        // Add smooth scrolling if card expands off screen
        if (isExpanded) {
          setTimeout(() => {
            this.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }, 100);
        }
      });
    });
    
    // Close cards when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.about-card')) {
        aboutCards.forEach(card => {
          card.classList.remove('expanded');
          card.setAttribute('aria-expanded', 'false');
        });
      }
    });
    
    // Close cards on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        aboutCards.forEach(card => {
          card.classList.remove('expanded');
          card.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }
}

// ===== MAIN INITIALIZATION =====

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - initializing hero slider...');
  
  // Initialize hero slider elements
  heroSection = document.querySelector('.hero-section');
  heroPrevBtn = document.getElementById('heroPrev');
  heroNextBtn = document.getElementById('heroNext');
  
  console.log('Hero elements:', {
    heroSection: !!heroSection,
    heroPrevBtn: !!heroPrevBtn,
    heroNextBtn: !!heroNextBtn
  });
  
  // Set initial hero background
  if (heroSection && heroBgImages.length > 0) {
    heroSection.style.backgroundImage = `url('${heroBgImages[0]}')`;
  }
  
  createHeroIndicators();
  startAutoSlide();
  
  // Add hero slider event listeners
  if (heroNextBtn && heroPrevBtn) {
    console.log('Adding hero slider event listeners...');
    
    heroNextBtn.addEventListener('click', (e) => {
      console.log('Next button clicked');
      e.preventDefault();
      e.stopPropagation();
      changeHeroBackground('next');
      resetAutoSlide();
    });

    heroPrevBtn.addEventListener('click', (e) => {
      console.log('Prev button clicked');
      e.preventDefault();
      e.stopPropagation();
      changeHeroBackground('prev');
      resetAutoSlide();
    });
  } else {
    console.error('Hero slider buttons not found!');
  }
  
  // Initialize map as hidden
  const mapContainer = document.getElementById('mapContainer');
  if (mapContainer) {
    mapContainer.style.display = 'none';
  }
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize scroll event for active nav links
  window.addEventListener('scroll', updateActiveNavLinks);
  
  // Initialize masonry gallery
  const masonryGallery = document.getElementById('masonryGallery');
  if (masonryGallery) {
    // Preload images for better performance
    preloadMasonryImages();
    
    // Set initial animations
    startMasonryAnimations();
  }
  
  // Observe stats section
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
  
  // Initialize mobile hamburger menu
  initMobileMenu();
  
  // Initialize image modals
  initImageModals();
  
  // Initialize expandable about cards
  initExpandableAboutCards();
  
  // Fix overflow issues
  fixOverflowIssues();
  
  // Also fix on window resize
  window.addEventListener('resize', function() {
    fixOverflowIssues();
    initExpandableAboutCards();
  });
  
  // Fix masonry gallery specifically when shown
  const galleryBtn = document.querySelector('.buttons button');
  if (galleryBtn) {
      galleryBtn.addEventListener('click', fixOverflowIssues);
  }
});

// ===== GLOBAL KEYBOARD SHORTCUTS =====

// Close gallery with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeMasonryGallery();
    
    // Also close any open image modal
    const modal = document.querySelector('.image-modal');
    if (modal) {
      modal.remove();
    }
  }
});

// Close gallery when clicking outside
document.addEventListener('click', function(event) {
  const gallery = document.getElementById('masonryGallery');
  const seeMoreBtn = event.target.closest('.buttons button');
  
  if (gallery && gallery.style.display === 'block' && 
      !gallery.contains(event.target) && 
      !seeMoreBtn) {
    closeMasonryGallery();
  }
});
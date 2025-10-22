// Portfolio Lightbox System
class PortfolioLightbox {
  constructor() {
    this.currentIndex = 0;
    this.projects = [];
    this.init();
  }

  init() {
    // Wait for portfolio to load
    setTimeout(() => {
      this.createLightbox();
      this.attachEventListeners();
    }, 1000);
  }

  createLightbox() {
  const lightboxHTML = `
    <div id="portfolioLightbox" class="portfolio-lightbox">
      <button class="lightbox-close" id="lightboxClose">&times;</button>
      <button class="lightbox-prev" id="lightboxPrev">‹</button>
      <button class="lightbox-next" id="lightboxNext">›</button>
      
      <div class="lightbox-content">
        <!-- Full Screen Image - Left Side -->
        <div class="lightbox-image-container">
          <img id="lightboxImage" src="" alt="" class="lightbox-image">
        </div>
        
        <!-- Info Sidebar - Right Side -->
        <div class="lightbox-info">
          <span class="lightbox-category" id="lightboxCategory"></span>
          <h2 id="lightboxTitle"></h2>
          <p id="lightboxDescription"></p>
          <div class="lightbox-tags" id="lightboxTags"></div>
          <a id="lightboxLink" href="#" class="lightbox-visit-btn" target="_blank" rel="noopener noreferrer">
            Visit Website →
          </a>
        </div>
      </div>
      
      <div class="lightbox-counter" id="lightboxCounter"></div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}



  attachEventListeners() {
    // Get all portfolio items
    document.addEventListener('click', (e) => {
      const portfolioItem = e.target.closest('.portfolio-item');
      if (portfolioItem) {
        e.preventDefault();
        const slideElement = portfolioItem.closest('.splide__slide');
        if (slideElement) {
          this.openLightbox(slideElement);
        }
      }
    });

    // Close button
    const closeBtn = document.getElementById('lightboxClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    // Navigation
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => this.navigate(1));

    // Close on outside click
    const lightbox = document.getElementById('portfolioLightbox');
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          this.closeLightbox();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('portfolioLightbox');
      if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.navigate(-1);
        if (e.key === 'ArrowRight') this.navigate(1);
      }
    });
  }

  openLightbox(slideElement) {
    // Get project data from the slide
    const title = slideElement.querySelector('.portfolio-title')?.textContent || '';
    const category = slideElement.querySelector('.portfolio-category')?.textContent || '';
    const description = slideElement.querySelector('.portfolio-description')?.textContent || '';
    const imageUrl = slideElement.querySelector('.portfolio-image')?.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') || '';
    const link = slideElement.querySelector('.portfolio-link')?.href || '#';
    const tags = Array.from(slideElement.querySelectorAll('.tag')).map(tag => tag.textContent);

    // Get all slides for navigation
    this.projects = Array.from(document.querySelectorAll('.splide__slide'));
    this.currentIndex = this.projects.indexOf(slideElement);

    // Populate lightbox
    document.getElementById('lightboxImage').src = imageUrl || 'assets/portfolio/placeholder.jpg';
    document.getElementById('lightboxTitle').textContent = title;
    document.getElementById('lightboxCategory').textContent = category;
    document.getElementById('lightboxDescription').textContent = description;
    document.getElementById('lightboxLink').href = link;
    
    // Populate tags
    const tagsContainer = document.getElementById('lightboxTags');
    tagsContainer.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    // Update counter
    document.getElementById('lightboxCounter').textContent = `${this.currentIndex + 1} / ${this.projects.length}`;

    // Show lightbox
    const lightbox = document.getElementById('portfolioLightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightbox = document.getElementById('portfolioLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  navigate(direction) {
    this.currentIndex += direction;
    
    // Loop around
    if (this.currentIndex < 0) this.currentIndex = this.projects.length - 1;
    if (this.currentIndex >= this.projects.length) this.currentIndex = 0;

    this.openLightbox(this.projects[this.currentIndex]);
  }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioLightbox();
});

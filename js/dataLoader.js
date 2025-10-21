// Data Loader - Fetches and populates content from JSON files
class DataLoader {
  constructor() {
    this.data = {};
  }

  async loadJSON(file) {
    try {
      const response = await fetch(`data/${file}`);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
      return null;
    }
  }

  async loadAll() {
    const files = [
      'site-info.json',
      'services.json',
      'portfolio.json',
      'testimonials.json',
      'process.json'
    ];

    const results = await Promise.all(files.map(file => this.loadJSON(file)));
    
    [
      this.data.siteInfo,
      this.data.services,
      this.data.portfolio,
      this.data.testimonials,
      this.data.process
    ] = results;

    return this.data;
  }

  // Populate Navigation
  // Populate Navigation
populateNavigation() {
  const navLinks = document.getElementById('navLinks');
  const logoImage = document.getElementById('logoImage');
  
  if (!this.data.siteInfo) return;

  // Update logo image
  if (logoImage && this.data.siteInfo.company.logo) {
    logoImage.src = this.data.siteInfo.company.logo;
    logoImage.alt = this.data.siteInfo.company.logoAlt || this.data.siteInfo.company.name;
  }

  // Update navigation links
  if (navLinks) {
    navLinks.innerHTML = this.data.siteInfo.navigation.map(item => `
      <li>
        <a href="${item.href}" class="nav-link ${item.primary ? 'btn-primary' : ''}">
          ${item.label}
        </a>
      </li>
    `).join('');
  }
}


  // Populate Hero Section
  populateHero() {
    const heroContent = document.getElementById('heroContent');
    if (!heroContent || !this.data.siteInfo) return;

    const hero = this.data.siteInfo.hero;
    heroContent.innerHTML = `
      <div class="hero-badge fade-in-up">${hero.badge}</div>
      <h1 class="hero-title fade-in-up delay-1">${hero.title}</h1>
      <p class="hero-subtitle fade-in-up delay-2">${hero.subtitle}</p>
      <div class="hero-cta fade-in-up delay-3">
        ${hero.cta.map(btn => `
          <a href="${btn.href}" class="btn btn-large btn-${btn.type}">${btn.text}</a>
        `).join('')}
      </div>
      <div class="hero-stats fade-in-up delay-4">
        ${hero.stats.map(stat => `
          <div class="stat-item">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Populate Services
  populateServices() {
    const servicesList = document.getElementById('servicesList');
    if (!servicesList || !this.data.services) return;

    servicesList.innerHTML = this.data.services.services.map(service => `
      <li class="splide__slide">
        <div class="service-card glass-card">
          <div class="service-icon">${service.icon}</div>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <ul class="service-features">
            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
      </li>
    `).join('');

    // Also populate form select options
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
      const options = this.data.services.services.map(service => 
        `<option value="${service.id}">${service.title}</option>`
      ).join('');
      serviceSelect.innerHTML = '<option value="">Select Service</option>' + options;
    }
  }

  // Populate Portfolio
  populatePortfolio() {
    const portfolioList = document.getElementById('portfolioList');
    if (!portfolioList || !this.data.portfolio) return;

    portfolioList.innerHTML = this.data.portfolio.projects.map(project => `
      <li class="splide__slide">
        <div class="portfolio-item">
          <div class="portfolio-image" style="background-image: url('${project.image}')">
            <div class="portfolio-placeholder">${project.title}</div>
          </div>
          <div class="portfolio-overlay">
            <h3>${project.category}</h3>
            <p>${project.description}</p>
            <div class="portfolio-tags">
              ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.url}" class="portfolio-link">View Project →</a>
          </div>
        </div>
      </li>
    `).join('');
  }

  // Populate Process
  populateProcess() {
    const processTimeline = document.getElementById('processTimeline');
    if (!processTimeline || !this.data.process) return;

    processTimeline.innerHTML = this.data.process.steps.map(step => `
      <div class="process-step">
        <div class="step-number">${step.number}</div>
        <div class="step-content">
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Populate Testimonials
  populateTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid || !this.data.testimonials) return;

    testimonialsGrid.innerHTML = this.data.testimonials.testimonials.map(testimonial => `
      <div class="testimonial-card glass-card">
        <div class="quote-mark">"</div>
        <p>${testimonial.quote}</p>
        <div class="testimonial-author">
          <strong>${testimonial.author}</strong>
          <span>${testimonial.position}</span>
        </div>
      </div>
    `).join('');
  }

  // Populate Contact
  populateContact() {
    const contactInfo = document.getElementById('contactInfo');
    if (!contactInfo || !this.data.siteInfo) return;

    const contact = this.data.siteInfo.contact;
    contactInfo.innerHTML = `
      <h2>${contact.title}</h2>
      <p>${contact.description}</p>
      <div class="contact-details">
        ${contact.details.map(detail => `
          <div class="contact-item">
            <span class="contact-icon">${detail.icon}</span>
            <div>
              <strong>${detail.label}</strong>
              <p>${detail.value}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Populate Footer
  populateFooter() {
    const footer = document.getElementById('footer');
    if (!footer || !this.data.siteInfo) return;

    const footerData = this.data.siteInfo.footer;
    footer.innerHTML = `
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">
              <span class="logo-text">${this.data.siteInfo.company.name}</span>
              <span class="logo-dot">.</span>
            </div>
            <p>${footerData.description}</p>
          </div>
          <div class="footer-links">
            ${footerData.columns.map(column => `
              <div class="footer-column">
                <h4>${column.title}</h4>
                ${column.links.map(link => `
                  <a href="${link.href}">${link.text}</a>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${footerData.copyright}</p>
          <div class="footer-social">
            ${footerData.social.map(social => `
              <a href="${social.url}">${social.name}</a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Populate everything
  async init() {
    await this.loadAll();
    
    this.populateNavigation();
    this.populateHero();
    this.populateServices();
    this.populatePortfolio();
    this.populateProcess();
    this.populateTestimonials();
    this.populateContact();
    this.populateFooter();
  }
}

// Initialize data loader when DOM is ready
let dataLoader;
document.addEventListener('DOMContentLoaded', async () => {
  dataLoader = new DataLoader();
  await dataLoader.init();
  
  // Initialize sliders after data is loaded
  if (window.initSliders) {
    window.initSliders();
  }
});

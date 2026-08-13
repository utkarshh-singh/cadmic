// Theme Switcher System
class ThemeSwitcher {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    // Apply saved theme
    this.applyTheme(this.currentTheme);
    
    // Create theme toggle button
    this.createToggleButton();
    
    // Add event listener
    this.attachEventListeners();
  }

  createToggleButton() {
    const button = document.createElement('button');
    button.id = 'themeToggle';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.innerHTML = `
      <div class="theme-toggle-track">
        <span class="theme-icon sun-icon">☀️</span>
        <span class="theme-icon moon-icon">🌙</span>
        <div class="theme-toggle-thumb"></div>
      </div>
    `;
    document.body.appendChild(button);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      if (theme === 'light') {
        toggleBtn.classList.add('light-mode');
      } else {
        toggleBtn.classList.remove('light-mode');
      }
    }

    // Update particles background opacity
    const particlesBg = document.getElementById('particles-bg');
    if (particlesBg) {
      particlesBg.style.opacity = theme === 'light' ? '0.3' : '1';
    }
  }
}

// Initialize theme switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
});

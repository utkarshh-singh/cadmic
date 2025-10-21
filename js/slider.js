// Slider Configuration and Initialization
window.initSliders = function() {
  // Services Slider
  const servicesSlider = document.getElementById('servicesSlider');
  if (servicesSlider) {
    new Splide('#servicesSlider', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '2rem',
      padding: '2rem',
      autoplay: true,
      interval: 4000,        // Change this for autoplay speed (milliseconds)
      pauseOnHover: true,
      pauseOnFocus: true,
      arrows: true,
      pagination: true,
      breakpoints: {
        1024: {
          perPage: 2,
          gap: '1.5rem',
          padding: '1rem',
        },
        768: {
          perPage: 1,
          gap: '1rem',
          padding: '0.5rem',
        },
      },
    }).mount();
  }

  // Portfolio Slider
  const portfolioSlider = document.getElementById('portfolioSlider');
  if (portfolioSlider) {
    new Splide('#portfolioSlider', {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '2rem',
      padding: '2rem',
      autoplay: true,
      interval: 5000,        // Change this for autoplay speed (milliseconds)
      pauseOnHover: true,
      pauseOnFocus: true,
      arrows: true,
      pagination: true,
      drag: true,
      breakpoints: {
        1024: {
          perPage: 2,
          gap: '1.5rem',
          padding: '1rem',
        },
        768: {
          perPage: 1,
          gap: '1rem',
          padding: '0.5rem',
        },
      },
    }).mount();
  }
};

// Canva Element SDK Integration

const defaultConfig = {
  background_color: "#ffffff",
  surface_color: "#000000",
  text_color: "#000000",
  primary_action_color: "#ff6b35",
  secondary_action_color: "#666666",
  card_background: "#ffffff",
  card_border: "#e0e0e0",
  font_family: "Inter",
  font_size: 16,
  
  // Text content
  hero_name: "Festus",
  hero_tagline: "Visual Designer & Creative Developer",
  hero_button: "View My Work",
  
  about_label: "About",
  about_bio: "[Bio placeholder text goes here. This would typically contain a short paragraph about the designer's background, approach, and passion for visual design and creative development.]",
  
  projects_label: "Projects",
  
  // Project 1
  project1_title: "[Project Title 1]",
  project1_desc: "[One-line description for project 1]",
  case_study_title_1: "[Case Study Title 1]",
  
  // Project 2
  project2_title: "[Project Title 2]",
  project2_desc: "[One-line description for project 2]",
  case_study_title_2: "[Case Study Title 2]",
  
  // Project 3
  project3_title: "[Project Title 3]",
  project3_desc: "[One-line description for project 3]",
  case_study_title_3: "[Case Study Title 3]",
  
  // Project 4
  project4_title: "[Project Title 4]",
  project4_desc: "[One-line description for project 4]",
  case_study_title_4: "[Case Study Title 4]",
  
  contact_label: "Contact",
  footer_copyright: "© 2024 Festus Portfolio"
};

async function onConfigChange(config) {
  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const baseSize = config.font_size || defaultConfig.font_size;

  // Update CSS variables
  document.documentElement.style.setProperty('--primary-color', config.primary_action_color || defaultConfig.primary_action_color);
  document.documentElement.style.setProperty('--secondary-color', config.secondary_action_color || defaultConfig.secondary_action_color);
  document.documentElement.style.setProperty('--background-color', config.background_color || defaultConfig.background_color);
  document.documentElement.style.setProperty('--surface-color', config.surface_color || defaultConfig.surface_color);
  document.documentElement.style.setProperty('--text-color', config.text_color || defaultConfig.text_color);
  document.documentElement.style.setProperty('--card-background', config.card_background || defaultConfig.card_background);
  document.documentElement.style.setProperty('--card-border', config.card_border || defaultConfig.card_border);
  
  // Apply colors to specific elements
  const heroButton = document.querySelector('.hero-button');
  if (heroButton) {
    heroButton.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
  }
  
  const submitButton = document.querySelector('.submit-button');
  if (submitButton) {
    submitButton.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
  }
  
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
  }
  
  // Update navigation logo color
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
  }
  
  // Update badges and active elements
  const badges = document.querySelectorAll('.case-study-badge, .carousel-dot.active');
  badges.forEach(el => {
    el.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
  });
  
  // Update borders
  const secondaryElements = document.querySelectorAll('.bio-placeholder, .section-label');
  secondaryElements.forEach(el => {
    el.style.borderColor = config.primary_action_color || defaultConfig.primary_action_color;
  });
  
  // Update navigation active states
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const afterStyle = link.querySelector('::after');
    if (afterStyle) {
      link.style.setProperty('--after-color', config.primary_action_color || defaultConfig.primary_action_color);
    }
  });

  // Apply fonts
  document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

  // Apply font sizes
  document.querySelectorAll('.hero h1').forEach(el => {
    el.style.fontSize = `${baseSize * 2.5}px`;
  });
  
  document.querySelectorAll('.hero p').forEach(el => {
    el.style.fontSize = `${baseSize * 1.5}px`;
  });
  
  document.querySelectorAll('.project-title').forEach(el => {
    el.style.fontSize = `${baseSize * 1.5}px`;
  });
  
  document.querySelectorAll('.section-label').forEach(el => {
    el.style.fontSize = `${baseSize * 0.9}px`;
  });
  
  document.querySelectorAll('.skill-name, .project-description, .footer-link, .footer-copyright, .nav-link').forEach(el => {
    el.style.fontSize = `${baseSize * 0.9}px`;
  });

  // Update text content
  document.getElementById('hero-name').textContent = config.hero_name || defaultConfig.hero_name;
  document.getElementById('hero-tagline').textContent = config.hero_tagline || defaultConfig.hero_tagline;
  document.getElementById('hero-button').textContent = config.hero_button || defaultConfig.hero_button;
  document.getElementById('about-label').textContent = config.about_label || defaultConfig.about_label;
  document.getElementById('about-bio').textContent = config.about_bio || defaultConfig.about_bio;
  document.getElementById('projects-label').textContent = config.projects_label || defaultConfig.projects_label;
  
  // Project 1
  document.getElementById('project1-title').textContent = config.project1_title || defaultConfig.project1_title;
  document.getElementById('project1-desc').textContent = config.project1_desc || defaultConfig.project1_desc;
  document.getElementById('case-study-title-1').textContent = config.case_study_title_1 || defaultConfig.case_study_title_1;
  
  // Project 2
  document.getElementById('project2-title').textContent = config.project2_title || defaultConfig.project2_title;
  document.getElementById('project2-desc').textContent = config.project2_desc || defaultConfig.project2_desc;
  document.getElementById('case-study-title-2').textContent = config.case_study_title_2 || defaultConfig.case_study_title_2;
  
  // Project 3
  document.getElementById('project3-title').textContent = config.project3_title || defaultConfig.project3_title;
  document.getElementById('project3-desc').textContent = config.project3_desc || defaultConfig.project3_desc;
  document.getElementById('case-study-title-3').textContent = config.case_study_title_3 || defaultConfig.case_study_title_3;
  
  // Project 4
  document.getElementById('project4-title').textContent = config.project4_title || defaultConfig.project4_title;
  document.getElementById('project4-desc').textContent = config.project4_desc || defaultConfig.project4_desc;
  document.getElementById('case-study-title-4').textContent = config.case_study_title_4 || defaultConfig.case_study_title_4;
  
  document.getElementById('contact-label').textContent = config.contact_label || defaultConfig.contact_label;
  document.getElementById('footer-copyright').textContent = config.footer_copyright || defaultConfig.footer_copyright;
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        },
        displayName: "Background Color"
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        },
        displayName: "Surface Color"
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        },
        displayName: "Text Color"
      },
      {
        get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.primary_action_color = value;
            window.elementSdk.setConfig({ primary_action_color: value });
          }
        },
        displayName: "Primary Color"
      },
      {
        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.secondary_action_color = value;
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        },
        displayName: "Secondary Color"
      },
      {
        get: () => config.card_background || defaultConfig.card_background,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.card_background = value;
            window.elementSdk.setConfig({ card_background: value });
          }
        },
        displayName: "Card Background"
      },
      {
        get: () => config.card_border || defaultConfig.card_border,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.card_border = value;
            window.elementSdk.setConfig({ card_border: value });
          }
        },
        displayName: "Card Border"
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        if (window.elementSdk) {
          window.elementSdk.config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      },
      displayName: "Font Family"
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        if (window.elementSdk) {
          window.elementSdk.config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      },
      displayName: "Base Font Size"
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    // Hero Section
    ["hero_name", config.hero_name || defaultConfig.hero_name],
    ["hero_tagline", config.hero_tagline || defaultConfig.hero_tagline],
    ["hero_button", config.hero_button || defaultConfig.hero_button],
    
    // About Section
    ["about_label", config.about_label || defaultConfig.about_label],
    ["about_bio", config.about_bio || defaultConfig.about_bio],
    
    // Projects Section
    ["projects_label", config.projects_label || defaultConfig.projects_label],
    
    // Project 1
    ["project1_title", config.project1_title || defaultConfig.project1_title],
    ["project1_desc", config.project1_desc || defaultConfig.project1_desc],
    ["case_study_title_1", config.case_study_title_1 || defaultConfig.case_study_title_1],
    
    // Project 2
    ["project2_title", config.project2_title || defaultConfig.project2_title],
    ["project2_desc", config.project2_desc || defaultConfig.project2_desc],
    ["case_study_title_2", config.case_study_title_2 || defaultConfig.case_study_title_2],
    
    // Project 3
    ["project3_title", config.project3_title || defaultConfig.project3_title],
    ["project3_desc", config.project3_desc || defaultConfig.project3_desc],
    ["case_study_title_3", config.case_study_title_3 || defaultConfig.case_study_title_3],
    
    // Project 4
    ["project4_title", config.project4_title || defaultConfig.project4_title],
    ["project4_desc", config.project4_desc || defaultConfig.project4_desc],
    ["case_study_title_4", config.case_study_title_4 || defaultConfig.case_study_title_4],
    
    // Contact & Footer
    ["contact_label", config.contact_label || defaultConfig.contact_label],
    ["footer_copyright", config.footer_copyright || defaultConfig.footer_copyright]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}
// In your defaultConfig object, add these new properties:
const defaultConfig = {
  // ... existing properties ...
  
  // New case study text properties
  case_study_title_1: "African Pattern Poster",
  case_study_full_text_1: "PROJECT 1 — African Pattern Poster (Case Study)...", // Add full text here if needed
  case_study_excerpt_1: "This project introduced me to African visual traditions and the fundamentals of 2D design. I explored how textiles, cultural symbols, and geometric forms communicate identity...",
  case_study_tags_1: "2D Design • Cultural Research • Pattern Systems • Visual Identity",
  
  // ... rest of your config ...
};

// In your onConfigChange function, add text updates for the case study:
async function onConfigChange(config) {
  // ... existing code ...
  
  // Update case study content
  const caseStudyPreview = document.querySelector('.case-study-preview h4');
  const caseStudyTags = document.querySelector('.case-study-tags');
  const caseStudyExcerpt = document.querySelector('.case-study-excerpt');
  
  if (caseStudyPreview) {
    caseStudyPreview.textContent = `PROJECT 1 — ${config.case_study_title_1 || defaultConfig.case_study_title_1} (Case Study)`;
  }
  
  if (caseStudyTags) {
    caseStudyTags.textContent = config.case_study_tags_1 || defaultConfig.case_study_tags_1;
  }
  
  if (caseStudyExcerpt) {
    caseStudyExcerpt.textContent = config.case_study_excerpt_1 || defaultConfig.case_study_excerpt_1;
  }
  
  // ... existing code ...
}

// In your mapToEditPanelValues function, add the new text fields:
function mapToEditPanelValues(config) {
  return new Map([
    // ... existing entries ...
    
    // Add these new entries for case study
    ["case_study_title_1", config.case_study_title_1 || defaultConfig.case_study_title_1],
    ["case_study_excerpt_1", config.case_study_excerpt_1 || defaultConfig.case_study_excerpt_1],
    ["case_study_tags_1", config.case_study_tags_1 || defaultConfig.case_study_tags_1],
    
    // ... existing entries ...
  ]);
}

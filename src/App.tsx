import React, { useState, useEffect } from 'react';
import './App.css';

// Types (unchanged)
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
}

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'database' | 'other';
  icon: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

// Main App Component
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);

  // Enhanced sample data (unchanged)
  const skills: Skill[] = [
    { name: 'Node.js', category: 'backend', icon: '⚡' },
    { name: 'JavaScript', category: 'frontend', icon: '🟨' },
    { name: 'Java', category: 'backend', icon: '☕' },
    { name: 'C Programming', category: 'backend', icon: '🔷' },
    { name: 'React', category: 'frontend', icon: '⚛️' },
    { name: 'PostgreSQL', category: 'database', icon: '🐘' },
    { name: 'Redis', category: 'database', icon: '🔴' },
    { name: 'Docker', category: 'tools', icon: '🐳' },
    { name: 'AWS', category: 'tools', icon: '☁️' },
    { name: 'Express.js', category: 'backend', icon: '🚂' },
    { name: 'MongoDB', category: 'database', icon: '🍃' },
    { name: 'Git & GitHub', category: 'tools', icon: '📚' },
    { name: 'RESTful APIs', category: 'backend', icon: '🔗' },
    { name: 'Microservices', category: 'backend', icon: '🏗️' },
    { name: 'Linux/Unix', category: 'tools', icon: '🐧' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Seu India - E-commerce Platform',
      description: 'Developed a comprehensive role-based e-commerce platform with real-time inventory management, payment gateway integration, and advanced user role permissions. Implemented secure authentication and optimized database queries for high performance.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT', 'Socket.io', 'AWS S3'],
      githubUrl: '#',
      demoUrl: '#',
    },
    {
      id: 2,
      title: 'SecureQR - Android Security App',
      description: 'Built a secure decentralized QR code scanning platform utilizing Ethereum smart contracts for authentication. Implemented encrypted data transmission and developed both mobile and web interfaces for seamless user experience.',
      technologies: ['Kotlin', 'Solidity', 'Web3.js', 'Node.js', 'MongoDB', 'Android Studio'],
      githubUrl: '#',
      demoUrl: '#',
    },
  ];

  const experiences: Experience[] = [
    {
      company: 'Nexs Private Ltd.',
      role: 'Back-End Developer',
      period: '2025 - Present',
      description: [
        'Led development of complete scalable backend systems using Node.js and Express framework',
        'Implemented advanced caching strategies with Redis, improving application performance by 40%',
        'Collaborated with Frontend developers for seamless integration of RESTful APIs',
        'Designed and optimized database schemas in PostgreSQL handling 10k+ daily transactions'
      ]
    },
  ];

  const education: Education[] = [
    {
      institution: 'University of Kerala',
      degree: 'Bachelor of Computer Applications',
      period: '2021 - 2024',
      description: 'Graduated with honors, focusing on software engineering, database management, and web technologies. Completed advanced courses in data structures, algorithms, and system design.'
    },
  ];

  // Check mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Scroll effect for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading screen
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-loader">
            <div className="logo-shape"></div>
            <div className="logo-text">VISHNU</div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="grid-overlay"></div>
        <div className="floating-shapes">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="shape" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}></div>
          ))}
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      {/* Mouse Trailer - Only for desktop */}
      {!isMobile && (
        <div 
          className="mouse-trailer"
          style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
        ></div>
      )}

      {/* Navigation */}
      <nav className="glass-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">{"</>"}</div>
            <span className="logo-text">VISHNU</span>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${navOpen ? 'active' : ''}`}
            onClick={() => setNavOpen(!navOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${navOpen ? 'active' : ''}`}>
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
              <li key={item} className="nav-item">
                <a 
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setNavOpen(false);
                    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="link-text">{item}</span>
                  <span className="link-underline"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section with Background Picture */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="profile-background-image"></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Backend Developer & Problem Solver</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Hello, I'm</span>
              <span className="title-main">
                <span className="name-gradient">VISHNU R PILLAI</span>
              </span>
              <span className="title-sub">Building Scalable Digital Solutions</span>
            </h1>
            <p className="hero-description">
              I'm a passionate backend developer with expertise in creating robust, efficient, and scalable systems. 
              With a strong foundation in Node.js, Java, and modern cloud technologies, I specialize in building 
              high-performance applications that solve real-world problems.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>View My Work</span>
                <div className="btn-hover"></div>
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Let's Connect</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">14+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Get to know me better</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a dedicated software developer with a passion for creating efficient and scalable backend systems. 
                My journey in technology started during my computer science studies, and I've been constantly learning 
                and evolving ever since.
              </p>
              <p>
                I specialize in backend development with Node.js and Java, with experience in building RESTful APIs, 
                database design, and cloud infrastructure. I believe in writing clean, maintainable code and following 
                best practices in software development.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and 
                staying updated with the latest trends in software architecture and system design.
              </p>
              <div className="about-highlights">
                <div className="highlight">
                  <div className="highlight-icon">🎯</div>
                  <div className="highlight-text">
                    <h4>Problem Solving</h4>
                    <p>I enjoy tackling complex challenges and finding efficient solutions</p>
                  </div>
                </div>
                <div className="highlight">
                  <div className="highlight-icon">🚀</div>
                  <div className="highlight-text">
                    <h4>Fast Learner</h4>
                    <p>Quick to adapt to new technologies and development methodologies</p>
                  </div>
                </div>
                <div className="highlight">
                  <div className="highlight-icon">🤝</div>
                  <div className="highlight-text">
                    <h4>Team Player</h4>
                    <p>Excellent communication skills and collaborative mindset</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-subtitle">Technologies I work with</p>
          </div>
          <div className="skills-categories">
            <div className="category">
              <h3 className="category-title">Backend Development</h3>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'backend').map((skill, index) => (
                  <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="skill-icon">{skill.icon}</div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="category">
              <h3 className="category-title">Frontend Development</h3>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'frontend').map((skill, index) => (
                  <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="skill-icon">{skill.icon}</div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="category">
              <h3 className="category-title">Database & Tools</h3>
              <div className="skills-grid">
                {skills.filter(skill => skill.category === 'database' || skill.category === 'tools').map((skill, index) => (
                  <div key={skill.name} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="skill-icon">{skill.icon}</div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Some of my recent work</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <div className="image-placeholder">
                    <div className="project-overlay">
                      <div className="project-links">
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="project-link">
                            <span>GitHub</span>
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} className="project-link">
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Professional Experience</h2>
            <p className="section-subtitle">My work journey</p>
          </div>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  {index !== experiences.length - 1 && <div className="marker-line"></div>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-meta">
                      <span className="timeline-company">{exp.company}</span>
                      <span className="timeline-period">{exp.period}</span>
                    </div>
                  </div>
                  <ul className="timeline-description">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">My academic background</p>
          </div>
          <div className="education-grid">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">🎓</div>
                <div className="education-content">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <h4 className="education-institution">{edu.institution}</h4>
                  <span className="education-period">{edu.period}</span>
                  <p className="education-description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Let's work together</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <p className="contact-description">
                I'm always interested in new opportunities and challenging projects. 
                Whether you need a backend developer for your team or want to discuss a potential project, 
                I'd love to hear from you!
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">vishnu.r.pillai@example.com</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Kollam, India</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">💼</div>
                  <div className="contact-text">
                    <span className="contact-label">Freelance</span>
                    <span className="contact-value">Available for Projects</span>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span className="social-icon">📱</span>
                  <span>GitHub</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">💼</span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-link">
                  <span className="social-icon">🐦</span>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Your Name" className="form-input" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" className="form-input" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" className="form-input" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows={5} className="form-textarea" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">{"</>"}</div>
              <span className="logo-text">VISHNU R PILLAI</span>
            </div>
            <p className="footer-text">
              Building the future, one line of code at a time
            </p>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Vishnu R Pillai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
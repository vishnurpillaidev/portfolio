import React, { useState, useEffect } from 'react';
import './App.css';

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  stats?: {
    performance?: string;
    uptime?: string;
    users?: string;
  };
}

interface Skill {
  name: string;
  category: 'backend' | 'frontend' | 'tools' | 'database_tools' | 'infrastructure';
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
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> Initializing system...",
    "> Loading backend modules...",
    "> Establishing database connections...",
    "> Ready for deployment."
  ]);

  // Social media links
  const socialLinks = {
    github: 'https://github.com/vishnu-cepian',
    linkedin: 'https://linkedin.com/in/vishnurpillai007',
    twitter: 'https://x.com/',
    email: 'mailto:vishnurpillai2003@gmail.com'
  };

  // Enhanced sample data with backend focus
  const skills: Skill[] = [
    { name: 'Node.js', category: 'backend', icon: '⚡' },
    { name: 'Express.js', category: 'backend', icon: '🚂' },
    { name: 'Java', category: 'backend', icon: '☕' },
    { name: 'Python', category: 'backend', icon: '🐍' },
    { name: 'C Programming', category: 'backend', icon: '🔷' },
    { name: 'JavaScript', category: 'backend', icon: '🟨' },
    { name: 'PostgreSQL', category: 'database_tools', icon: '🐘' },
    { name: 'MongoDB', category: 'database_tools', icon: '🍃' },
    { name: 'Redis', category: 'database_tools', icon: '🔴' },
    { name: 'Docker', category: 'database_tools', icon: '🐳' },
    { name: 'AWS', category: 'database_tools', icon: '☁️' },
    { name: 'Git & GitHub', category: 'database_tools', icon: '📚' },
    { name: 'RESTful APIs', category: 'backend', icon: '🔗' },
    { name: 'Microservices', category: 'backend', icon: '🏗️' },
    { name: 'Linux/Unix', category: 'database_tools', icon: '🐧' },
    { name: 'React', category: 'frontend', icon: '⚛️' },
    { name: 'JavaScript', category: 'frontend', icon: '🟨' },
    // { name: 'Nginx', category: 'infrastructure', icon: '🔄' },
    // { name: 'CI/CD', category: 'tools', icon: '🔄' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Seu India - E-commerce Platform',
      description: 'Developed a comprehensive role-based e-commerce platform with real-time inventory management, payment gateway integration, and advanced user role permissions. Implemented secure authentication and optimized database queries for high performance.',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT', 'Socket.io', 'AWS S3'],
      githubUrl: 'https://github.com/vishnu-cepain/seu-india',
      demoUrl: '#',
      stats: {
        performance: '40% faster',
        uptime: '99.9%',
        users: '10K+'
      }
    },
    {
      id: 2,
      title: 'SecureQR - Android Security App',
      description: 'Built a secure decentralized QR code scanning platform utilizing Ethereum smart contracts for authentication. Implemented encrypted data transmission and developed both mobile and web interfaces for seamless user experience.',
      technologies: ['Kotlin', 'Solidity', 'Web3.js', 'Node.js', 'MongoDB', 'Android Studio'],
      githubUrl: 'https://github.com/vishnu-cepian/secureqr',
      demoUrl: '#',
      stats: {
        performance: '96% secure',
        // uptime: '24/7',
        // users: '5K+'
      }
    },
    {
      id: 3,
      title: 'Real-time Chat System',
      description: 'Built a real-time chat application with WebSocket support, message persistence, and file sharing capabilities. Implemented scalable architecture with Redis pub/sub and postgreSQL for data storage.',
      technologies: ['Node.js', 'Socket.io', 'Redis', 'MongoDB', 'Docker', 'AWS'],
      githubUrl: 'https://github.com/vishnu-cepian/chat-system',
      demoUrl: '#',
      stats: {
        performance: 'Real-time',
        uptime: '99.8%',
        users: '10K+ messages/day'
      }
    },
  ];

  const experiences: Experience[] = [
    {
      company: 'Infosys Ltd. Mysore,India ',
      role: 'Systems Engineer Trainee',
      period: ' Nov 2025 - Present',
      description: [
        'Completed comprehensive training in Core Java, focusing on Object-Oriented Programming (OOP) principles, data structures, and exception handling. ',
        'Gained a practical understanding of the SDLC.' ,
        'Trained on industry standard development tools, like Eclipse. ',
        ' Participated in daily coding challenges and technical workshops.'
      ]
    },
    {
      company: 'ICE-BAY Franchise ',
      role: 'Full Stack Engineer (Freelance)',
      period: ' Sept 2025 - Nov 2025',
      description: [
        'Single handedly developed a complete Point of Sale (POS) system, built with Node js, Express, TypeORM for PostgreSQL db, and React.js for frontend.',
        'This system included Analytics, Authentication, Inventory Management, Cron job for sending monthly reports to designated Mail Id'
      ]
    },
    {
      company: 'Nexs Private Ltd. ',
      role: 'Back-End Developer (Freelance)',
      period: ' May 2025 - Sept 2025',
      description: [
        'Led development of complete scalable backend systems using Node.js and Express framework',
        'Implemented advanced caching strategies with Redis, improving application performance by 40%',
        'Collaborated with Frontend developers for seamless integration of RESTful APIs',
        'Designed and optimized database schemas in PostgreSQL handling 10k+ daily transactions',
      ]
    },
    
  ];

  const education: Education[] = [
    {
      institution: 'Kerala Technical University',
      degree: 'Bachelor of Technology',
      period: '2021 - 2025',
      description: 'Graduated with GPA of 8.08, focusing on software engineering, database management, and web technologies. Completed advanced courses in data structures, algorithms, and system design.'
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
    
    // Simulate loading with terminal effect
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setTerminalLines(prev => [...prev.slice(0, currentLine + 1)]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, 500);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
            <div className="logo-text">$VISHNU ~</div>
          </div>
          <div className="code-block">
            {terminalLines.map((line, index) => (
              <div key={index} className="code-line">
                <span className="code-comment">$</span> {line}
              </div>
            ))}
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
          {[...Array(20)].map((_, i) => (
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
            <div className="logo-icon">$</div>
            <span className="logo-text">VISHNU R PILLAI ~</span>
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
                  <span className="link-text">$ {item}</span>
                  <span className="link-underline"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Terminal Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="profile-background-image"></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="terminal-title">terminal — bash — 80×24</div>
            </div>
            
            <div className="hero-terminal-body">
              <div className="hero-badge">
                <span>$ backend_developer</span>
              </div>
              <h1 className="hero-title">
                <span className="terminal-prompt">$</span>
                <span className="name-gradient">whoami</span>
                <br />
                <span className="title-main">
                  <span className="name-gradient">VISHNU R PILLAI</span>
                </span>
                <br />
                <span className="title-sub">$ Building Scalable Backend Systems</span>
              </h1>
              <p className="hero-description">
                I'm a passionate <span className="highlight">backend developer</span> with expertise in creating robust, efficient, and scalable systems. 
                With a strong foundation in <span className="highlight">Node.js, Java, and modern technologies</span>, I specialize in building 
                high-performance applications that solve real-world problems. Currently focused on <span className="highlight">System Design, 
                database optimization, and cloud infrastructure</span>.
              </p>
              <div className="hero-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>$ view_projects</span>
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.open(socialLinks.github, '_blank')}
                >
                  <span>$ github</span>
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Major Projects</div>
                </div>
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Technologies</div>
                </div>
                <div className="stat">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">System Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">$ about_me</h2>
            <p className="section-subtitle">// Developer Profile & Philosophy</p>
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
              <div className="code-block">
                <div className="code-line"><span className="code-keyword">const</span> <span className="code-function">developer</span> = {'{'}</div>
                <div className="code-line">&nbsp;&nbsp;name: <span className="code-string">"Vishnu R Pillai"</span>,</div>
                <div className="code-line">&nbsp;&nbsp;role: <span className="code-string">"Backend Developer"</span>,</div>
                <div className="code-line">&nbsp;&nbsp;focus: [ <span className="code-string">"API Design"</span>, <span className="code-string">"System Architecture"</span>],</div>
                <div className="code-line">&nbsp;&nbsp;philosophy: <span className="code-string">"Build scalable, maintainable systems that just work"</span></div>
                <div className="code-line">{'}'};</div>
              </div>
            </div>
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
                  <h4>Performance Focus</h4>
                  <p>Optimizing for speed, scalability, and reliability</p>
                </div>
              </div>
              <div className="highlight">
                <div className="highlight-icon">🔧</div>
                <div className="highlight-text">
                  <h4>Best Practices</h4>
                  <p>Following clean code principles and design patterns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">$ tech_stack</h2>
            <p className="section-subtitle">// Technologies & Tools</p>
          </div>
          <div className="skills-grid">
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">⚡</div>
                <h3 className="category-title">Backend</h3>
              </div>
              <div className="skill-items">
                {skills.filter(skill => skill.category === 'backend').map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-icon">{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">🗃️</div>
                <h3 className="category-title">Database & Tools</h3>
              </div>
              <div className="skill-items">
                {skills.filter(skill => skill.category === 'database_tools').map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-icon">{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skill-category">
              <div className="category-header">
                <div className="category-icon">🏗️</div>
                <h3 className="category-title">Frontend Development</h3>
              </div>
              <div className="skill-items">
                {skills.filter(skill => skill.category === 'frontend').map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-icon">{skill.icon}</div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">$ projects</h2>
            <p className="section-subtitle">// Featured Work</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tech">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-tag">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
                <div className="project-content">
                  <p className="project-description">{project.description}</p>
                  
                  {project.stats && (
                    <div className="project-stats">
                      <div className="project-stat">
                        <div className="stat-value">{project.stats.performance}</div>
                        <div className="stat-label">Performance</div>
                      </div>
                      <div className="project-stat">
                        <div className="stat-value">{project.stats.uptime}</div>
                        <div className="stat-label">Uptime</div>
                      </div>
                      <div className="project-stat">
                        <div className="stat-value">{project.stats.users}</div>
                        <div className="stat-label">Scale</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="project-links">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        $ View Code
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a 
                        href={project.demoUrl} 
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        $ Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">$ experience</h2>
            <p className="section-subtitle">// Career Timeline</p>
          </div>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
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

      {/* Education Section */}
      <section id="education" className="education-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">$ education</h2>
            <p className="section-subtitle">// Academic Background</p>
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

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">$ contact</h2>
            <p className="section-subtitle">// Let's Collaborate</p>
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
                    <a href={socialLinks.email} className="contact-value">vishnurpillai2003@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Kerala, India</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">💼</div>
                  <div className="contact-text">
                    <span className="contact-label">Status</span>
                    <span className="contact-value">Available for Projects</span>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href={socialLinks.github} className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">💻</span>
                  <span>GitHub</span>
                </a>
                <a href={socialLinks.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">💼</span>
                  <span>LinkedIn</span>
                </a>
                <a href={socialLinks.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">🐦</span>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">$ name</label>
                <input type="text" placeholder="Your Name" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">$ email</label>
                <input type="email" placeholder="your.email@example.com" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">$ subject</label>
                <input type="text" placeholder="Project Discussion" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">$ message</label>
                <textarea placeholder="Hello, I'd like to discuss..." rows={5} className="form-textarea" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <span>$ send_message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">$</div>
              <span className="logo-text">VISHNU R PILLAI</span>
            </div>
            <p className="footer-text">
              // Building scalable systems, one line of code at a time
            </p>
            <div className="footer-links">
              <a href="#home">$ home</a>
              <a href="#projects">$ projects</a>
              <a href="#contact">$ contact</a>
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
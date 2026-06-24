import { useEffect, useRef, useState } from 'react';
import profileImg from '../profile.png';
import './App.css';

/* ──────────────────────────────────────────────────────
   Hook: fade-in on scroll using IntersectionObserver
────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ──────────────────────────────────────────────────────
   Data
────────────────────────────────────────────────────── */
const experience = [
  {
    role: 'Senior DevOps Engineer',
    company: 'CloudNova Solutions',
    location: 'La Paz, Bolivia · Remoto',
    period: 'Ene 2024 – Presente',
    achievements: [
      'Diseñé e implementé pipelines CI/CD con GitHub Actions y AWS CodePipeline, reduciendo el tiempo de deploy en un 65%.',
      'Migré infraestructura monolítica a microservicios en EKS, logrando 99.95% de disponibilidad.',
      'Automaticé el aprovisionamiento de infraestructura con Terraform y Ansible para +40 entornos.',
      'Implementé observabilidad completa con CloudWatch, Prometheus y Grafana, reduciendo MTTR en 50%.',
    ],
    tags: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Docker', 'Prometheus'],
  },
  {
    role: 'DevOps Engineer',
    company: 'DataBridge Corp',
    location: 'Santa Cruz, Bolivia · Híbrido',
    period: 'Jun 2022 – Dic 2023',
    achievements: [
      'Gestioné clústeres Kubernetes en AWS EKS para cargas de trabajo de producción con +200k usuarios.',
      'Desarrollé módulos Terraform reutilizables que redujeron el tiempo de onboarding de proyectos en 40%.',
      'Implementé estrategia GitOps con ArgoCD para deployments declarativos y auditoría completa.',
      'Configuré alertas y runbooks automatizados integrando PagerDuty con AWS CloudWatch.',
    ],
    tags: ['EKS', 'ArgoCD', 'Terraform', 'Helm', 'Linux', 'Bash', 'PagerDuty'],
  },
  {
    role: 'Cloud & Infrastructure Engineer Jr.',
    company: 'TechStart Bolivia',
    location: 'La Paz, Bolivia · Presencial',
    period: 'Mar 2023 – May 2024',
    achievements: [
      'Administré servidores Linux (Ubuntu / Amazon Linux 2) y automaticé tareas con Bash y Python.',
      'Desplegué entornos Docker Compose para desarrollo y staging, estandarizando flujos locales.',
      'Colaboré en la migración de aplicaciones on-premise hacia AWS (EC2, RDS, S3, CloudFront).',
      'Documenté arquitecturas y procedimientos operativos, mejorando el onboarding del equipo.',
    ],
    tags: ['AWS', 'Linux', 'Docker', 'Python', 'Bash', 'RDS', 'S3'],
  },
];

const skillCategories = [
  {
    icon: '☁️',
    title: 'Cloud & Plataformas',
    skills: [
      { name: 'Amazon Web Services', level: 90 },
      { name: 'Google Cloud Platform', level: 65 },
      { name: 'Azure (AZ-900)', level: 55 },
    ],
  },
  {
    icon: '🐳',
    title: 'Contenedores & Orquestación',
    skills: [
      { name: 'Kubernetes / EKS', level: 85 },
      { name: 'Docker / Compose', level: 92 },
      { name: 'Helm Charts', level: 78 },
    ],
  },
  {
    icon: '⚙️',
    title: 'IaC & Automatización',
    skills: [
      { name: 'Terraform', level: 88 },
      { name: 'Ansible', level: 80 },
      { name: 'AWS CloudFormation', level: 70 },
    ],
  },
  {
    icon: '🔄',
    title: 'CI/CD & GitOps',
    skills: [
      { name: 'GitHub Actions', level: 90 },
      { name: 'ArgoCD / GitOps', level: 82 },
      { name: 'Jenkins / CodePipeline', level: 75 },
    ],
  },
  {
    icon: '📊',
    title: 'Observabilidad',
    skills: [
      { name: 'Prometheus / Grafana', level: 85 },
      { name: 'AWS CloudWatch', level: 88 },
      { name: 'ELK Stack', level: 70 },
    ],
  },
  {
    icon: '💻',
    title: 'Scripting & Dev',
    skills: [
      { name: 'Bash / Shell', level: 88 },
      { name: 'Python', level: 78 },
      { name: 'Linux Administration', level: 92 },
    ],
  },
];

const certifications = [
  { icon: '🏅', name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services · 2024' },
  { icon: '🏅', name: 'AWS Certified DevOps Engineer – Professional', issuer: 'Amazon Web Services · 2024' },
  { icon: '🎖️', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF · 2023' },
  { icon: '🎖️', name: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp · 2023' },
  { icon: '📜', name: 'Microsoft Azure Fundamentals (AZ-900)', issuer: 'Microsoft · 2022' },
  { icon: '📜', name: 'Docker Certified Associate (DCA)', issuer: 'Docker · 2022' },
];

/* ──────────────────────────────────────────────────────
   Skill Bar component
────────────────────────────────────────────────────── */
function SkillBar({ name, level, animate }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   Main App
────────────────────────────────────────────────────── */
export default function App() {
  const aboutReveal = useReveal();
  const expReveal   = useReveal();
  const skillReveal = useReveal();
  const certReveal  = useReveal();
  const contactReveal = useReveal();

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        {['Inicio', 'Sobre mí', 'Experiencia', 'Skills', 'Certificaciones', 'Contacto'].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
        ))}
      </nav>

      <main className="cv-wrapper">

        {/* ── HERO ────────────────────────────────── */}
        <section id="inicio" className="hero">
          <div className="hero-bg" />
          <div className="hero-content">
            <div className="hero-avatar-ring animate-float animate-pulse-ring animate-fade-up">
              <img
                src={profileImg}
                alt="Oscar Murguías – DevOps Engineer"
                className="hero-avatar"
              />
            </div>

            <div>
              <p className="hero-badge animate-fade-up-delay-1">⚡ Available for new projects</p>
              <h1 className="animate-fade-up-delay-2">Oscar Murguías</h1>
              <p className="hero-subtitle animate-fade-up-delay-3">
                DevOps Engineer · 3 años automatizando infraestructura en la nube, construyendo pipelines y llevando sistemas a producción con confianza.
              </p>
            </div>

            <div className="hero-cta animate-fade-up-delay-4">
              <a className="btn btn-primary" href="#contacto">Contáctame 📬</a>
              <a className="btn btn-outline" href="#experiencia">Ver experiencia</a>
            </div>
          </div>
        </section>

        {/* ── SOBRE MÍ ────────────────────────────── */}
        <section
          id="sobre-mí"
          ref={aboutReveal.ref}
          style={{ opacity: aboutReveal.visible ? 1 : 0, transition: 'opacity 0.7s ease, transform 0.7s ease', transform: aboutReveal.visible ? 'none' : 'translateY(30px)' }}
        >
          <p className="section-label">01 · Sobre mí</p>
          <h2 className="section-title">¿Quién soy?</h2>
          <div className="section-divider" />

          <div className="about-grid">
            <div className="about-card">
              <p>
                Soy un <strong style={{ color: 'var(--text)' }}>DevOps Engineer</strong> apasionado por la automatización y la cultura DevOps.
                Me especializo en diseñar arquitecturas cloud-native confiables, escalables y seguras en AWS,
                usando herramientas como Terraform, Kubernetes y GitHub Actions para acelerar la entrega de valor.
              </p>
              <br />
              <p>
                Mi filosofía: <em style={{ color: 'var(--accent)' }}>infraestructura como código, observabilidad primero, automatiza todo lo repetible</em>.
                Disfruto trabajar en equipos ágiles, compartir conocimiento y mejorar procesos de manera continua.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Años de experiencia</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Certificaciones</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">40+</div>
                <div className="stat-label">Entornos gestionados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime garantizado</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCIA ─────────────────────────── */}
        <section
          id="experiencia"
          ref={expReveal.ref}
          style={{ opacity: expReveal.visible ? 1 : 0, transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s', transform: expReveal.visible ? 'none' : 'translateY(30px)' }}
        >
          <p className="section-label">02 · Experiencia</p>
          <h2 className="section-title">Trayectoria laboral</h2>
          <div className="section-divider" />

          <div className="timeline">
            {experience.map((job, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <span className="timeline-role">{job.role}</span>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                  <p className="timeline-company">
                    <span>{job.company}</span> · {job.location}
                  </p>
                  <ul className="timeline-achievements">
                    {job.achievements.map((a, j) => <li key={j}>{a}</li>)}
                  </ul>
                  <div className="timeline-tags">
                    {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ──────────────────────────────── */}
        <section
          id="skills"
          ref={skillReveal.ref}
          style={{ opacity: skillReveal.visible ? 1 : 0, transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s', transform: skillReveal.visible ? 'none' : 'translateY(30px)' }}
        >
          <p className="section-label">03 · Skills</p>
          <h2 className="section-title">Stack tecnológico</h2>
          <div className="section-divider" />

          <div className="skills-grid">
            {skillCategories.map((cat) => (
              <div className="skill-category" key={cat.title}>
                <div className="skill-cat-header">
                  <span className="skill-cat-icon">{cat.icon}</span>
                  <span className="skill-cat-title">{cat.title}</span>
                </div>
                <div className="skill-bars">
                  {cat.skills.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} animate={skillReveal.visible} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CERTIFICACIONES ─────────────────────── */}
        <section
          id="certificaciones"
          ref={certReveal.ref}
          style={{ opacity: certReveal.visible ? 1 : 0, transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s', transform: certReveal.visible ? 'none' : 'translateY(30px)' }}
        >
          <p className="section-label">04 · Certificaciones</p>
          <h2 className="section-title">Credenciales</h2>
          <div className="section-divider" />

          <div className="certs-grid">
            {certifications.map((cert) => (
              <div className="cert-card" key={cert.name}>
                <span className="cert-icon">{cert.icon}</span>
                <div className="cert-info">
                  <p className="cert-name">{cert.name}</p>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACTO ────────────────────────────── */}
        <section
          id="contacto"
          className="contact-section"
          ref={contactReveal.ref}
          style={{ opacity: contactReveal.visible ? 1 : 0, transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s', transform: contactReveal.visible ? 'none' : 'translateY(30px)' }}
        >
          <p className="section-label">05 · Contacto</p>
          <h2 className="section-title">Hablemos</h2>
          <div className="section-divider" style={{ margin: '0 auto 2.5rem' }} />
          <p style={{ color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 0' }}>
            ¿Tienes un proyecto interesante o quieres hablar de DevOps? Escríbeme por WhatsApp o conéctate en LinkedIn.
          </p>

          <div className="contact-cards">
            <a
              className="contact-card"
              href="https://wa.me/59177133301"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">📱</span>
              <span className="contact-label">WhatsApp / Celular</span>
              <span className="contact-value">+591 77133301</span>
            </a>

            <a
              className="contact-card"
              href="https://www.linkedin.com/in/oscarmurguias/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">💼</span>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">in/oscarmurguias</span>
            </a>
          </div>
        </section>

      </main>

      <footer className="footer">
        <p>Diseñado y desarrollado con React ⚛️ · Oscar Murguías © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

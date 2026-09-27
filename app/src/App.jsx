import { useEffect, useState } from 'react'
import './App.css'
import BlackHole from './components/ui/black-hole'
import { isFirebaseConfigured, submitContactMessage } from './lib/firebase'

const projects = [
  { id: 'safeher', title: 'SafeHer', type: 'Mobile · Concept', description: "A safety-first Android concept for emergency assistance, communication, and intelligent support.", tech: 'Kotlin · Jetpack Compose · Android Studio', tags: ['Mobile', 'Safety'], accent: 'lime', features: ['Login and registration flow', 'Emergency assistance concept', 'Communication features', 'Intelligent support layer'] },
  { id: 'health', title: 'Rural Healthcare Assistance', type: 'AI/ML · Concept', description: 'An offline/online hybrid healthcare concept for multilingual, voice-assisted support in underserved communities.', tech: 'AI/ML concepts · Mobile/Web', tags: ['AI / ML', 'Healthcare'], accent: 'cyan', features: ['Multilingual support', 'Voice-based communication', 'AI-assisted assistance', 'Translation and accessibility'] },
  { id: 'money', title: 'Money Control', type: 'Web · Concept', description: 'A personal finance system for income, expenses, monthly analysis, and export-ready reporting.', tech: 'HTML · CSS · JavaScript · Chart.js · Firebase', tags: ['FinTech', 'Analytics'], accent: 'amber', features: ['Income and expense tracking', 'Monthly analysis charts', 'Excel / PDF export concept', 'Firebase-ready storage'] },
  { id: 'tailoring', title: 'Tailoring Business Websites', type: 'Web · Client work', description: 'Responsive business presences that turn services, contact, and credibility into a clear digital experience.', tech: 'HTML · CSS · JavaScript', tags: ['Web', 'Business'], accent: 'pink' },
  { id: 'cyber', title: 'Cybersecurity Portfolio', type: 'Web · Personal', description: 'A security-focused interface for presenting learning areas, practical work, and technical direction.', tech: 'HTML · CSS · JavaScript', tags: ['Cybersecurity', 'Web'], accent: 'lime' },
  { id: 'services', title: 'Business & Service Systems', type: 'Full-stack · Concept', description: 'A growing set of business system concepts covering authentication, dashboards, APIs, payments, and databases.', tech: 'Python · Flask · MySQL · JavaScript', tags: ['Backend', 'APIs'], accent: 'cyan' },
]

const skills = {
  Programming: ['Python', 'C', 'JavaScript', 'Kotlin'], Web: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'], Backend: ['Python Flask', 'Node.js', 'MySQL', 'Firebase'], Mobile: ['Android Studio', 'Kotlin', 'Jetpack Compose'], 'Cyber + Linux': ['Linux', 'Kali Linux', 'CLI', 'Networking', 'VPN / DNS', 'Ethical Hacking'], Tools: ['VS Code', 'Android Studio', 'Git', 'GitHub', 'Kiro'],
}

const architecture = {
  SafeHer: ['Android interface', 'Kotlin logic', 'Firebase / API', 'User authentication', 'Emergency assistance'],
  'Rural Healthcare': ['Mobile + web client', 'AI-assisted layer', 'Offline data store', 'Identity + access', 'Voice + translation'],
  'Money Control': ['Responsive dashboard', 'Chart.js analytics', 'Firebase storage', 'Authentication', 'Export + reporting'],
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeSkill, setActiveSkill] = useState('Programming')
  const [activeArchitecture, setActiveArchitecture] = useState('SafeHer')
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLines, setTerminalLines] = useState(['Welcome to sanjay@cyberlab', 'Type a safe command to explore the interface.'])
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [contactStatus, setContactStatus] = useState('idle')

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element))
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setCommandOpen(true) }
      if (event.key === 'Escape') { setCommandOpen(false); setSelectedProject(null) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { reveal.disconnect(); window.removeEventListener('keydown', onKeyDown) }
  }, [])

  const filters = ['All', 'Mobile', 'AI / ML', 'FinTech', 'Web', 'Cybersecurity', 'Backend']
  const filteredProjects = projects.filter((project) => activeFilter === 'All' || project.tags.includes(activeFilter))
  const runTerminal = (event) => {
    event.preventDefault()
    const command = terminalInput.trim()
    if (!command) return
    const responses = { pwd: '/home/sanjay/portfolio', ls: 'projects  notes  learning  skills.md', cd: 'Navigation only: this lab does not execute system commands.', mkdir: 'Simulation: directory concept created.', touch: 'Simulation: file concept created.', cat: 'This terminal is a safe visual simulation.', clear: '' }
    setTerminalLines((lines) => command === 'clear' ? [] : [...lines, `sanjay@cyberlab:~$ ${command}`, responses[command] || 'Command recognized as a demo input. Try pwd, ls, cat, or clear.'])
    setTerminalInput('')
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setContactStatus('sending')
    try {
      await submitContactMessage({
        name: form.get('name'),
        email: form.get('email'),
        subject: form.get('subject'),
        message: form.get('message'),
      })
      event.currentTarget.reset()
      setContactStatus('sent')
    } catch {
      setContactStatus(isFirebaseConfigured ? 'error' : 'configure')
    }
  }

  return (
    <div className={lightMode ? 'site light-mode' : 'site'}>
      <div className="noise" />
      <nav className="nav container"><a className="brand" href="#top"><span className="brand-mark">SA</span><span>SANJAY<span className="muted">.DEV</span></span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button><div className={menuOpen ? 'nav-links open' : 'nav-links'}>{['About', 'Skills', 'Projects', 'Cyber Lab', 'Contact'].map((link) => <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)}>{link}</a>)}<button className="command-trigger" onClick={() => setCommandOpen(true)}>⌘ K</button><button className="theme-toggle" onClick={() => setLightMode(!lightMode)} aria-label="Toggle color theme">{lightMode ? '◐' : '◑'}</button></div></nav>
      <main id="top">
        <section className="hero container"><div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line" /></div><p className="hero-kicker">CS ENGINEERING <span>×</span> CYBER SECURITY</p><h1>SANJAY <em>A</em></h1><p className="hero-headline">Building secure, intelligent<br /><span>and practical digital solutions.</span></p><p className="hero-description">Cybersecurity and software development enthusiast focused on ethical hacking, Linux, web development, application development, AI-driven solutions and practical technology projects.</p><div className="hero-actions"><a href="#projects" className="button button-primary">View projects <span>↗</span></a><a href="#contact" className="button button-ghost">Contact me <span>→</span></a><a href="#contact" className="text-link">Download resume <span>↓</span></a></div><div className="hero-socials"><span>BASED IN TAMIL NADU, INDIA</span><a href="https://github.com/sanjayjeev" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/sanjay-a-a3806442b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div><div className="hero-visual reveal"><BlackHole /><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="portrait-frame"><img src="/sanjay-portrait.jpeg" alt="Illustrated portrait of Sanjay A" /><div className="portrait-tag">01 / PROFILE</div></div><div className="signal-card"><span className="signal-label">SYSTEM STATUS</span><strong><i /> SECURE / ONLINE</strong><span className="signal-meta">LAT 11.0168° N · LONG 76.9558° E</span></div><div className="scanline" /></div></section>
        <div className="ticker"><div className="ticker-track"><span>SECURE BY DESIGN</span><b>+</b><span>BUILD WITH PURPOSE</span><b>+</b><span>LEARN IN PUBLIC</span><b>+</b><span>SHIP PRACTICAL</span><b>+</b><span>SECURE BY DESIGN</span><b>+</b></div></div>
        <section id="about" className="section container about"><div className="section-label reveal">01 / ABOUT</div><div className="about-grid"><div className="reveal"><h2>Curiosity with<br /><span>practical intent.</span></h2></div><div className="about-copy reveal"><p className="lead">I’m Sanjay, a B.Tech Computer Science Engineering & Cyber Security student from Tamil Nadu.</p><p>I’m interested in the space where software meets security: making useful products, understanding how systems break, and building better ways to solve real problems with automation and AI-driven technologies.</p><a href="#contact" className="inline-link">Let’s build something useful <span>↗</span></a></div></div><div className="interest-grid">{['Cybersecurity & Ethical Hacking', 'Linux & Networking', 'Web Development', 'Android Development', 'AI / ML', 'Software Projects'].map((item, index) => <div className="interest-card reveal" key={item}><span>0{index + 1}</span><strong>{item}</strong><i>↗</i></div>)}</div></section>
        <section id="skills" className="section section-dark"><div className="container"><div className="section-label reveal">02 / TECHNICAL SKILLS</div><div className="section-heading reveal"><h2>Tools for the<br /><span>next challenge.</span></h2><p>Growing through hands-on projects, documentation, and the discipline of learning how things work.</p></div><div className="skills-layout"><div className="skill-tabs reveal">{Object.keys(skills).map((skill) => <button key={skill} className={activeSkill === skill ? 'active' : ''} onClick={() => setActiveSkill(skill)}><span>↳</span>{skill}<b>→</b></button>)}</div><div className="skill-content reveal"><div className="skill-content-top"><span>SKILLSET / {activeSkill.toUpperCase()}</span><span>LEARNING IN PROGRESS</span></div><div className="skill-items">{skills[activeSkill].map((skill, index) => <div className="skill-item" key={skill}><div><span>{skill}</span><small>{['Building', 'Practicing', 'Exploring'][index % 3]}</small></div><div className="skill-meter"><i style={{ width: `${58 + ((index * 9) % 27)}%` }} /></div></div>)}</div></div></div></div></section>
        <section id="projects" className="section container projects"><div className="section-label reveal">03 / SELECTED PROJECTS</div><div className="projects-head reveal"><h2>Ideas made<br /><span>tangible.</span></h2><p>Concepts and builds shaped around people, access, and better digital experiences.</p></div><div className="filter-row reveal">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="project-grid">{filteredProjects.map((project, index) => <article className={`project-card ${project.accent} reveal`} key={project.id} onClick={() => setSelectedProject(project)} onKeyDown={(event) => event.key === 'Enter' && setSelectedProject(project)} role="button" tabIndex="0"><div className="project-top"><span>0{index + 1} / {project.type}</span><span className="project-arrow">↗</span></div><div className="project-visual"><div className="project-visual-grid" /><strong>{project.title === 'SafeHer' ? 'S/' : project.title === 'Money Control' ? '₹' : project.title === 'Rural Healthcare Assistance' ? '+': '//'}</strong></div><div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><div className="project-tech">{project.tech}</div></div></article>)}</div></section>
        <section id="cyber-lab" className="section lab-section"><div className="container"><div className="section-label reveal">04 / CYBER LAB</div><div className="lab-heading reveal"><div><h2>Learn the system.<br /><span>Respect the system.</span></h2></div><p>A visual lab for the fundamentals I’m actively exploring across Linux, networking, privacy, and ethical hacking.</p></div><div className="lab-grid"><div className="terminal reveal"><div className="terminal-bar"><span><i /> <i /> <i /></span><span>SAFE TERMINAL / DEMO ONLY</span><span>•••</span></div><div className="terminal-body">{terminalLines.map((line, index) => <div className={index % 2 === 0 ? 'terminal-line' : 'terminal-response'} key={`${line}-${index}`}>{line}</div>)}<form onSubmit={runTerminal}><span>sanjay@cyberlab:~$</span><input value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} aria-label="Terminal command input" autoComplete="off" /></form></div></div><div className="lab-topics reveal">{['Linux Fundamentals', 'Kali Linux', 'Command Line', 'Networking', 'DNS + VPN', 'Wi-Fi Security', 'Privacy Fundamentals', 'Ethical Hacking'].map((topic, index) => <div key={topic}><span>0{index + 1}</span><strong>{topic}</strong><i>↗</i></div>)}</div></div></div></section>
        <section className="section container journey"><div className="section-label reveal">05 / DEVELOPMENT JOURNEY</div><div className="journey-heading reveal"><h2>Always <span>forward.</span></h2><p>Every project adds a new lens. Every bug adds a new question.</p></div><div className="timeline reveal">{['Programming', 'Web Development', 'Linux', 'Cybersecurity', 'Android', 'AI / ML', 'Real-world Projects'].map((step, index) => <div className={index === 6 ? 'timeline-item current' : 'timeline-item'} key={step}><span>0{index + 1}</span><i /><strong>{step}</strong></div>)}</div></section>
        <section className="section architecture-section"><div className="container"><div className="section-label reveal">06 / FEATURED VISUALIZATION</div><div className="architecture-head reveal"><h2>See the <span>thinking.</span></h2><div className="architecture-tabs">{Object.keys(architecture).map((item) => <button className={activeArchitecture === item ? 'active' : ''} onClick={() => setActiveArchitecture(item)} key={item}>{item}</button>)}</div></div><div className="architecture-flow reveal">{architecture[activeArchitecture].map((item, index) => <div className="architecture-node" key={item}><small>0{index + 1}</small><strong>{item}</strong>{index < 4 && <span className="flow-arrow">↓</span>}</div>)}</div></div></section>
        <section className="section container activity-section"><div className="section-label reveal">07 / BUILD ACTIVITY</div><div className="activity-head reveal"><h2>Consistency<br /><span>compounds.</span></h2><p>A small snapshot of the habit behind the work: learning, experimenting, and shipping useful increments.</p></div><div className="activity-panel reveal"><div className="activity-meta"><span>PROJECT LOG / 2026</span><strong>24 active weeks</strong></div><div className="activity-grid">{Array.from({ length: 84 }, (_, index) => <i key={index} className={`level-${(index * 7 + index % 5) % 5}`} title={`Activity week ${index + 1}`} />)}</div><div className="activity-legend"><span>LESS</span><i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /><span>MORE</span></div></div></section>
        <section className="section container interests"><div className="section-label reveal">08 / INTERESTS + STRENGTHS</div><div className="interests-layout"><h2 className="reveal">Built around<br /><span>what matters.</span></h2><div className="interest-pills reveal">{['Cybersecurity & Ethical Hacking', 'Linux & Network Security', 'Software Development', 'Android Development', 'Web Development', 'AI / ML', 'Healthcare Technology', 'Women Safety Technology', 'FinTech', 'Automation', 'Problem-solving', 'Quick learning', 'Debugging', 'Creative solution design', 'Team collaboration', 'Hackathon development'].map((interest) => <span key={interest}>{interest}</span>)}</div></div></section>
        <section id="contact" className="section contact-section"><div className="container contact-grid"><div className="reveal"><div className="section-label">08 / CONTACT</div><h2>Let’s make<br /><span>an impact.</span></h2><p>Have an idea, an opportunity, or a problem worth solving? Send a note and let’s start there.</p><div className="contact-links"><a href="mailto:sanjayjeevi2010@gmail.com">sanjayjeevi2010@gmail.com <span>↗</span></a><a href="https://www.linkedin.com/in/sanjay-a-a3806442b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">LinkedIn profile <span>↗</span></a><a href="https://github.com/sanjayjeev" target="_blank" rel="noreferrer">GitHub profile <span>↗</span></a></div></div><form className="contact-form reveal" onSubmit={handleContactSubmit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>Subject<input name="subject" required placeholder="What are we building?" /></label><label>Message<textarea name="message" required rows="4" placeholder="Tell me a little about it..." /></label><button className="button button-primary" type="submit" disabled={contactStatus === 'sending'}>{contactStatus === 'sending' ? 'Sending...' : 'Send message'} <span>↗</span></button>{contactStatus === 'sent' && <p className="form-status success">Message sent. I’ll get back to you soon.</p>}{contactStatus === 'configure' && <p className="form-status">Add Firebase credentials to <code>.env.local</code> to enable submissions.</p>}{contactStatus === 'error' && <p className="form-status">The message could not be sent. Check your Firebase project settings.</p>}</form></div></section>
      </main>
      {commandOpen && <div className="overlay" onClick={() => setCommandOpen(false)}><div className="command-panel" onClick={(event) => event.stopPropagation()}><div className="command-head"><span>QUICK NAVIGATION</span><button onClick={() => setCommandOpen(false)}>ESC</button></div><input autoFocus placeholder="Jump to a section..." /><div className="command-list">{[['About', '#about'], ['Technical skills', '#skills'], ['Selected projects', '#projects'], ['Cyber Lab', '#cyber-lab'], ['Contact', '#contact']].map(([label, href]) => <a href={href} key={label} onClick={() => setCommandOpen(false)}><span>↳ {label}</span><small>ENTER</small></a>)}</div></div></div>}
      {selectedProject && <div className="overlay" onClick={() => setSelectedProject(null)}><div className={`project-modal ${selectedProject.accent}`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button><span className="modal-kicker">{selectedProject.type} / PROJECT BRIEF</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-tech">{selectedProject.tech}</div><div className="modal-features"><span>FEATURES IN SCOPE</span>{selectedProject.features?.map((feature) => <div key={feature}><i>+</i>{feature}</div>)}</div><a href="#contact" className="button button-primary" onClick={() => setSelectedProject(null)}>Discuss a similar build <span>↗</span></a></div></div>}
      <footer className="footer container"><span>© 2026 SANJAY A</span><span>DESIGNED / BUILT WITH INTENT</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  )
}

export default App

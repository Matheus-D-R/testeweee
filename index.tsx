import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Assets ---
// A high-quality image representing barber tools (Razor/Clipper vibe) in dark tones.
const BG_IMAGE_URL = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop";

// --- CSS Styles ---
const css = `
:root {
  --gold: #d4af37;
  --gold-hover: #b5952f;
  --black: #0f0f0f;
  --dark-gray: #1a1a1a;
  --light-gray: #f4f4f4;
  --text-gray: #cccccc;
  --overlay: rgba(0, 0, 0, 0.85);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: var(--black);
  color: var(--light-gray);
  overflow-x: hidden;
}

/* Background Image - Fixed Parallax Style */
.bg-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('${BG_IMAGE_URL}');
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  z-index: -1;
}

/* Typography */
h1, h2, h3 {
  font-family: 'Playfair Display', serif; /* Elegant serif for headings */
  color: white;
}

.text-gold {
  color: var(--gold);
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.section-subtitle {
  text-align: center;
  color: var(--gold);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  letter-spacing: 1px;
}

/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1.5rem 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: all 0.4s ease;
}

header.scrolled {
  background-color: rgba(15, 15, 15, 0.95);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  padding: 1rem 5%;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  position: relative;
  transition: color 0.3s;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: var(--gold);
  transition: width 0.3s;
}

.nav-links a:hover {
  color: var(--gold);
}

.nav-links a:hover::after {
  width: 100%;
}

/* Mobile Menu */
.hamburger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: var(--gold);
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
  opacity: 0;
  animation: fadeUp 1s forwards 0.5s;
}

.hero p {
  font-size: 1.2rem;
  color: var(--text-gray);
  margin-bottom: 2.5rem;
  max-width: 600px;
  opacity: 0;
  animation: fadeUp 1s forwards 0.8s;
}

/* Buttons */
.btn {
  padding: 1rem 2.5rem;
  border: 2px solid var(--gold);
  background: transparent;
  color: var(--gold);
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  letter-spacing: 1px;
}

.btn-primary {
  background-color: var(--gold);
  color: black;
  opacity: 0;
  animation: fadeUp 1s forwards 1.1s;
}

.btn-primary:hover {
  background-color: var(--gold-hover);
  border-color: var(--gold-hover);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);
}

.btn-pulse {
  animation: pulse 2s infinite;
}

/* Services */
section {
  padding: 6rem 5%;
  position: relative;
}

.bg-dark {
  background-color: rgba(15, 15, 15, 0.9);
}

.bg-translucent {
  background-color: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(5px);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: rgba(40, 40, 40, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px);
  border-color: var(--gold);
  background: rgba(40, 40, 40, 0.8);
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Montserrat', sans-serif;
}

.card p {
  color: var(--text-gray);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Benefits */
.benefits-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1 1 300px;
}

.benefit-icon {
  font-size: 2rem;
  color: var(--gold);
}

.benefit-text h4 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: white;
}

.benefit-text p {
  font-size: 0.9rem;
  color: var(--text-gray);
}

/* Schedule CTA Section */
.schedule-cta {
  text-align: center;
  padding: 8rem 5%;
}

/* Location */
.map-container {
  width: 100%;
  height: 400px;
  border: 2px solid var(--dark-gray);
  filter: grayscale(100%) contrast(1.2);
  transition: filter 0.3s;
}

.map-container:hover {
  filter: grayscale(0%);
}

/* Footer */
footer {
  background-color: #000;
  padding: 4rem 5% 2rem;
  text-align: center;
  border-top: 1px solid #222;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-info p {
  margin: 0.5rem 0;
  color: var(--text-gray);
}

.highlight {
  color: var(--gold);
  font-weight: 600;
}

.copyright {
  font-size: 0.8rem;
  color: #555;
  border-top: 1px solid #111;
  padding-top: 2rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.modal-overlay.open {
  opacity: 1;
  pointer-events: all;
}

.modal-content {
  background: var(--dark-gray);
  border: 1px solid var(--gold);
  padding: 3rem 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.modal-overlay.open .modal-content {
  transform: scale(1);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Animations */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  
  .hamburger { display: flex; }
  
  .nav-links {
    position: absolute;
    top: 70px;
    right: 0;
    width: 100%;
    background-color: rgba(10, 10, 10, 0.98);
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    transform: translateY(-150%);
    transition: transform 0.4s ease;
  }
  
  .nav-links.active {
    transform: translateY(0);
  }
}
`;

// --- Components ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="logo">Estilo & <span className="text-gold">Precisão</span></a>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <a href="#home" onClick={() => scrollTo('home')}>Início</a>
        <a href="#servicos" onClick={() => scrollTo('servicos')}>Serviços</a>
        <a href="#agendamento" onClick={() => scrollTo('agendamento')}>Agendamento</a>
        <a href="#contato" onClick={() => scrollTo('contato')}>Contato</a>
      </nav>
    </header>
  );
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const whatsappNumber = "551894553453";
  const message = "Olá! Gostaria de agendar um horário na barbearia.";

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <h2 style={{ marginBottom: '1rem', color: 'var(--gold)' }}>Agende Seu Horário</h2>
        <p style={{ marginBottom: '2rem', color: '#ccc' }}>
          Clique no botão abaixo para ser redirecionado ao nosso WhatsApp e falar diretamente com um de nossos barbeiros.
        </p>
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary btn-pulse"
        >
          Confirmar no WhatsApp
        </a>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Reveal Animation Logic
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      
      {/* Backgrounds */}
      <div className="bg-fixed"></div>
      <div className="bg-overlay"></div>

      <Header />

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1 className="reveal">Barbearia Estilo & <span className="text-gold">Precisão</span></h1>
        <p className="reveal" style={{animationDelay: '0.2s'}}>Cortes que valorizam sua identidade</p>
        <button onClick={openModal} className="btn btn-primary">Agende seu Horário</button>
      </section>

      {/* Services Section */}
      <section id="servicos" className="bg-translucent">
        <h2 className="section-title reveal">Nossos <span className="text-gold">Serviços</span></h2>
        <p className="section-subtitle reveal">Precisão, estilo e cuidado em cada detalhe.</p>
        
        <div className="services-grid">
          {[
            { title: "Corte Masculino", desc: "Tesoura e máquina com acabamento perfeito." },
            { title: "Barba Navalhada", desc: "Ritual tradicional com toalha quente." },
            { title: "Corte + Barba", desc: "O combo completo para renovar o visual." },
            { title: "Sobrancelha", desc: "Limpeza e alinhamento dos fios." },
            { title: "Hidratação", desc: "Tratamento para barbas ressecadas." },
            { title: "Combo Premium", desc: "Corte, barba e hidratação profunda." }
          ].map((service, idx) => (
            <div key={idx} className="card reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
              <h3 className="text-gold">{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-dark">
        <h2 className="section-title reveal">Por que nos <span className="text-gold">Escolher?</span></h2>
        <div className="benefits-container">
          {[
            { title: "Ambiente Moderno", desc: "Um espaço pensado para o seu conforto." },
            { title: "Atendimento Ágil", desc: "Respeitamos o seu tempo." },
            { title: "Produtos Premium", desc: "Qualidade superior em cada aplicação." },
            { title: "Experiência Personalizada", desc: "Cada cliente é único." }
          ].map((benefit, idx) => (
            <div key={idx} className="benefit-item reveal">
              <div className="benefit-icon">✦</div>
              <div className="benefit-text">
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scheduling Section */}
      <section id="agendamento" className="schedule-cta">
        <h2 className="reveal">Sua melhor versão começa <span className="text-gold">aqui</span></h2>
        <p className="reveal" style={{ margin: '2rem 0', color: '#ccc' }}>
          Não perca tempo na fila. Garanta seu horário com apenas um clique.
        </p>
        <button onClick={openModal} className="btn btn-primary btn-pulse reveal">
          Agendar Agora
        </button>
      </section>

      {/* Location Section */}
      <section id="contato" className="bg-dark">
        <h2 className="section-title reveal">Onde <span className="text-gold">Estamos</span></h2>
        <p className="section-subtitle reveal">Avenida Brasil Norte, 1234 – Ilha Solteira</p>
        
        <div className="map-container reveal">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.570188730953!2d-51.34440262496156!3d-20.422722181057865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94977a5e8424e649%3A0x6d691e847038e4a7!2sAv.%20Brasil%20Norte%2C%201234%20-%20Ilha%20Solteira%2C%20SP%2C%2015385-000!5e0!3m2!1spt-BR!2sbr!4v1715421234567!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{border: 0}} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="logo">Estilo & <span className="text-gold">Precisão</span></div>
          <div className="contact-info">
            <p>📍 Avenida Brasil Norte, 1234 - Ilha Solteira</p>
            <p>📱 <span className="highlight">(18) 94553-453</span></p>
            <p>⏰ Seg - Sáb: 09:00 - 20:00</p>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Barbearia Estilo & Precisão. Todos os direitos reservados.
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

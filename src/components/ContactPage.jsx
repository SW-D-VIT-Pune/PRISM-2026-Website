import React, { useEffect, useRef, useState } from 'react';
import { AtSign, Camera, ExternalLink, Globe2, HeartHandshake, MapPin, Navigation, Phone, UsersRound } from 'lucide-react';

const contactPeople = [
  { name: 'Amit Jain', phone: '+91 90210 65817', href: 'tel:+919021065817' },
  { name: 'Falguni Chaudhari', phone: '+91 97630 07984', href: 'tel:+919763007984' },
  { name: 'Kuldeep Dukare', phone: '+91 93733 32969', href: 'tel:+91937332969' },
  { name: 'Aditya Chiparikar', phone: '+91 70570 70071', href: 'tel:+917057070071' },
];

const campuses = [
  {
    id: 'bibwewadi',
    label: 'Bibwewadi Campus',
    address: '666, Upper Indiranagar, Bibwewadi, Pune, Maharashtra 411037',
    query: 'Vishwakarma Institute of Technology, 666 Upper Indiranagar, Bibwewadi, Pune 411037',
  },
  {
    id: 'kondhwa',
    label: 'Kondhwa Campus',
    address: 'Survey No. 3/4, Kapil Nagar, Kondhwa (Budruk), Pune, Maharashtra 411048',
    query: 'Vishwakarma Institute of Technology, Survey No. 3/4 Kapil Nagar, Kondhwa Budruk, Pune 411048',
  },
];

export default function ContactPage() {
  const [selectedCampus, setSelectedCampus] = useState(campuses[0]);
  const pageRef = useRef(null);

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll('[data-reveal]') ?? [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(selectedCampus.query)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCampus.query)}`;

  return (
    <main className="contact-page" ref={pageRef}>
      <section className="contact-hero">
        <div className="container-inner contact-hero-inner">
          <span className="contact-eyebrow" data-reveal><HeartHandshake size={16} /> PRISM ’26 • VIT Pune</span>
          <h1 className="heading-display contact-title">Let’s create impact,<br />together.</h1>
          <p className="contact-hero-copy" data-reveal>
            Connect with the Social Welfare &amp; Development Committee for PRISM ’26 queries, support, and collaboration.
          </p>
          <a className="contact-hero-action" href="mailto:vitswd@vit.edu" data-reveal>
            <AtSign size={18} /> Write to the committee
          </a>
        </div>
      </section>

      <section className="contact-section contact-people-section" aria-labelledby="contact-people-heading">
        <div className="container-inner">
          <div className="contact-section-heading" data-reveal>
            <span className="section-tag">DIRECT CONTACT</span>
            <h2 className="heading-1" id="contact-people-heading">Speak with the PRISM team</h2>
            <p className="text-muted">Our coordinators are here to help you find the right point of contact.</p>
          </div>
          <div className="contact-people-grid">
            {contactPeople.map((person, index) => (
              <article className="contact-person-card" key={person.name} style={{ '--card-index': index }} data-reveal>
                <div className="contact-card-number">0{index + 1}</div>
                <div className="contact-person-icon"><UsersRound size={22} /></div>
                <h3>{person.name}</h3>
                <a href={person.href} className="contact-phone-link" aria-label={`Call ${person.name} at ${person.phone}`}>
                  <Phone size={16} /> {person.phone}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section contact-details-section" aria-labelledby="contact-details-heading">
        <div className="container-inner">
          <div className="contact-details-layout" data-reveal>
            <div className="contact-details-intro">
              <span className="section-tag">CONNECT WITH US</span>
              <h2 className="heading-1" id="contact-details-heading">Keep the conversation moving.</h2>
              <p className="text-muted">Follow the committee, explore our work, or write to us directly. Every connection helps extend PRISM’s social impact.</p>
            </div>
            <div className="contact-details-grid">
              <a className="contact-detail-card" href="mailto:vitswd@vit.edu">
                <span className="contact-detail-icon"><AtSign size={22} /></span>
                <span className="contact-detail-label">Email</span>
                <strong>vitswd@vit.edu</strong>
              </a>
              <a className="contact-detail-card" href="https://www.instagram.com/vitsocials/?hl=en" target="_blank" rel="noopener noreferrer">
                <span className="contact-detail-icon"><Camera size={22} /></span>
                <span className="contact-detail-label">Instagram</span>
                <strong>@vitsocials</strong>
              </a>
              
              <a className="contact-detail-card" href="https://swd.vit.edu/" target="_blank" rel="noreferrer">
                <span className="contact-detail-icon"><Globe2 size={22} /></span>
                <span className="contact-detail-label">Website</span>
                <strong>www.swd.vit.edu <ExternalLink size={14} /></strong>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section contact-location-section" aria-labelledby="contact-location-heading">
        <div className="container-inner">
          <div className="contact-map-layout" data-reveal>
            <div className="contact-location-card">
              <div className="contact-location-mark"><MapPin size={30} /></div>
              <div>
                <span className="section-tag">OUR LOCATIONS</span>
                <h2 className="heading-2" id="contact-location-heading">Vishwakarma Institute of Technology, Pune</h2>
                <p>Select a campus to view its individual location and directions.</p>
              </div>
              <div className="contact-campus-picker" role="tablist" aria-label="Select a VIT Pune campus">
                {campuses.map((campus) => (
                  <button
                    className={`contact-campus-button ${selectedCampus.id === campus.id ? 'active' : ''}`}
                    key={campus.id}
                    type="button"
                    role="tab"
                    aria-selected={selectedCampus.id === campus.id}
                    onClick={() => setSelectedCampus(campus)}
                  >
                    {campus.label}
                  </button>
                ))}
              </div>
              <p className="contact-campus-address">{selectedCampus.address}</p>
              <a className="contact-directions-button" href={directionsUrl} target="_blank" rel="noreferrer">
                <Navigation size={17} /> Get Directions <ExternalLink size={14} />
              </a>
            </div>
            <div className="contact-map-frame">
              <iframe key={selectedCampus.id} src={mapUrl} title={`${selectedCampus.label} map`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-closing-section">
        <div className="container-inner">
          <div className="contact-closing-card" data-reveal>
            <HeartHandshake size={29} aria-hidden="true" />
            <div>
              <h2 className="heading-2">Bring your questions, ideas, and energy.</h2>
              <p>PRISM ’26 is built around people who care enough to take the next step. We look forward to hearing from you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-thank-you-section" aria-labelledby="thank-you-heading">
        <div className="container-inner">
          <div className="contact-thank-you-card" data-reveal>
            <span className="section-tag contact-thank-you-tag"><HeartHandshake size={16} aria-hidden="true" /> PRISM ’26</span>
            <h2 className="heading-1" id="thank-you-heading">Thank You<span className="contact-thank-you-mark">!</span></h2>
            <div className="contact-thank-you-copy">
              <p>We hope this platform offers valuable insights into PRISM 2026 and creates opportunities for meaningful collaboration.</p>
              <p>The PRISM team at VIT Pune looks forward to connecting with your organisation and working together to create a meaningful impact.</p>
              <p>We would be happy to discuss potential collaborations and answer any questions.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-page { background: var(--very-light-bg); overflow: hidden; }
        .contact-hero { min-height: 570px; display: flex; align-items: center; padding: 210px 0 92px; background: linear-gradient(135deg, var(--primary-navy), var(--deep-blue)); color: var(--very-light-bg); position: relative; }
        .contact-hero::after { content: ''; width: min(45vw, 590px); height: min(45vw, 590px); border: 1px solid rgba(179, 207, 229, .34); border-radius: 50%; position: absolute; right: -11vw; bottom: -27vw; }
        .contact-hero-inner { position: relative; z-index: 1; max-width: 1280px; }
        .contact-eyebrow { display: inline-flex; align-items: center; gap: 9px; color: var(--light-blue); font: 800 var(--font-size-caption) var(--font-heading); letter-spacing: .12em; }
        .contact-title { color: var(--very-light-bg); max-width: 820px; margin: 18px 0; animation: contact-rise .65s both; }
        .contact-hero-copy { max-width: 625px; color: var(--light-blue); font-size: var(--font-size-body-lg); line-height: 1.7; }
        .contact-hero-action { display: inline-flex; align-items: center; gap: 9px; margin-top: 30px; padding: 13px 20px; color: var(--primary-navy); background: var(--light-blue); border: 1px solid var(--light-blue); border-radius: var(--radius-pill); font: 700 var(--font-size-sm) var(--font-heading); text-decoration: none; transition: transform var(--transition-base), background-color var(--transition-base); }
        .contact-hero-action:hover { background: var(--very-light-bg); transform: translateY(-3px); }
        .contact-section { padding: var(--space-3xl) 0; }
        [data-reveal] { opacity: 0; transform: translateY(22px); transition: opacity 600ms ease, transform 600ms cubic-bezier(.2, .75, .3, 1); }
        [data-reveal].is-visible { opacity: 1; transform: translateY(0); }
        .contact-hero [data-reveal] { animation: contact-rise .65s both; }
        .contact-hero [data-reveal]:nth-child(1) { animation-delay: 90ms; }
        .contact-hero [data-reveal]:nth-child(3) { animation-delay: 180ms; }
        .contact-hero [data-reveal]:nth-child(4) { animation-delay: 270ms; }
        .contact-section-heading { max-width: 680px; margin-bottom: var(--space-xl); }
        .contact-section-heading .heading-1, .contact-details-intro .heading-1 { color: var(--primary-navy); margin-bottom: 12px; }
        .contact-people-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .contact-person-card { position: relative; min-height: 230px; padding: 26px; background: var(--very-light-bg); border: 1px solid var(--light-blue); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); transition: opacity 600ms calc(var(--card-index) * 80ms) ease, transform 600ms calc(var(--card-index) * 80ms) cubic-bezier(.2, .75, .3, 1), border-color var(--transition-base), box-shadow var(--transition-base); }
        .contact-person-card:hover { transform: translateY(-6px); border-color: var(--medium-blue); box-shadow: var(--shadow-md); }
        .contact-card-number { position: absolute; top: 20px; right: 20px; color: var(--light-blue); font: 800 1.05rem var(--font-heading); }
        .contact-person-icon, .contact-detail-icon { display: grid; place-items: center; width: 46px; height: 46px; background: var(--deep-blue); color: var(--light-blue); border-radius: var(--radius-md); }
        .contact-person-card h3 { margin: 25px 0 10px; color: var(--primary-navy); font: 800 1.2rem var(--font-heading); }
        .contact-phone-link { display: inline-flex; align-items: center; gap: 7px; color: var(--deep-blue); font: 700 var(--font-size-sm) var(--font-body); text-decoration: none; border-bottom: 1px solid var(--medium-blue); padding-bottom: 3px; }
        .contact-phone-link:hover { color: var(--medium-blue); }
        .contact-details-section { background: rgba(179, 207, 229, .22); border-block: 1px solid var(--light-blue); }
        .contact-details-layout { display: grid; grid-template-columns: .9fr 1.35fr; gap: var(--space-2xl); align-items: center; }
        .contact-details-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .contact-detail-card { min-height: 190px; padding: 22px; display: flex; flex-direction: column; justify-content: flex-start; background: var(--very-light-bg); border: 1px solid var(--light-blue); border-radius: var(--radius-md); color: var(--primary-navy); text-decoration: none; transition: transform var(--transition-base), border-color var(--transition-base); }
        .contact-detail-card:hover { transform: translateY(-4px); border-color: var(--medium-blue); }
        .contact-detail-card:hover .contact-detail-icon { transform: scale(1.08) rotate(-4deg); background: var(--primary-navy); }
        .contact-detail-icon { transition: transform var(--transition-base), background-color var(--transition-base); }
        .contact-detail-label { margin-top: 19px; color: var(--deep-blue); font-size: var(--font-size-caption); font-weight: 700; text-transform: uppercase; letter-spacing: .09em; }
        .contact-detail-card strong { margin-top: 5px; color: var(--primary-navy); font: 800 .98rem var(--font-heading); overflow-wrap: anywhere; }
        .contact-detail-card strong svg { vertical-align: -2px; }
        .contact-detail-note { display: block; margin-top: 9px; color: var(--medium-blue); font-size: .71rem; font-weight: 700; line-height: 1.35; }
        .contact-location-section { padding-top: var(--space-2xl); }
        .contact-map-layout { display: grid; grid-template-columns: .82fr 1.18fr; min-height: 468px; background: var(--primary-navy); border: 1px solid var(--medium-blue); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); }
        .contact-location-card { padding: clamp(28px, 5vw, 54px); display: flex; flex-direction: column; align-items: flex-start; gap: 17px; background: var(--primary-navy); color: var(--very-light-bg); }
        .contact-location-mark { display: grid; place-items: center; width: 68px; height: 68px; color: var(--light-blue); border: 1px solid var(--medium-blue); border-radius: 50%; }
        .contact-location-card .section-tag { color: var(--light-blue); margin-bottom: 7px; }
        .contact-location-card .heading-2 { color: var(--very-light-bg); }
        .contact-location-card p { color: var(--light-blue); margin-top: 5px; }
        .contact-campus-picker { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 3px; }
        .contact-campus-button { min-height: 42px; padding: 9px 14px; border: 1px solid var(--medium-blue); border-radius: var(--radius-pill); background: transparent; color: var(--light-blue); cursor: pointer; font: 700 var(--font-size-caption) var(--font-heading); transition: background-color var(--transition-base), color var(--transition-base), transform var(--transition-base); }
        .contact-campus-button:hover, .contact-campus-button.active { background: var(--light-blue); color: var(--primary-navy); }
        .contact-campus-button:hover { transform: translateY(-2px); }
        .contact-campus-address { font-size: var(--font-size-sm); line-height: 1.6; }
        .contact-directions-button { display: inline-flex; align-items: center; gap: 8px; margin-top: auto; padding: 12px 17px; border: 1px solid var(--light-blue); border-radius: var(--radius-pill); background: var(--light-blue); color: var(--primary-navy); text-decoration: none; font: 800 var(--font-size-caption) var(--font-heading); transition: transform var(--transition-base), background-color var(--transition-base); }
        .contact-directions-button:hover { background: var(--very-light-bg); transform: translateY(-3px); }
        .contact-map-frame { min-height: 100%; border-left: 1px solid var(--medium-blue); background: var(--very-light-bg); overflow: hidden; transition: filter var(--transition-base); }
        .contact-map-frame:hover { filter: saturate(1.1); }
        .contact-map-frame iframe { display: block; width: 100%; height: 100%; min-height: 468px; border: 0; }
        .contact-closing-section { padding: var(--space-xl) 0 var(--space-3xl); }
        .contact-closing-card { display: flex; align-items: center; gap: 20px; max-width: 920px; margin: 0 auto; padding: 30px; border-left: 4px solid var(--medium-blue); background: rgba(179, 207, 229, .18); color: var(--primary-navy); }
        .contact-closing-card > svg { flex: 0 0 auto; color: var(--deep-blue); }
        .contact-closing-card .heading-2 { color: var(--primary-navy); font-size: 1.35rem; margin-bottom: 4px; }
        .contact-closing-card p { color: var(--deep-blue); font-size: var(--font-size-sm); }
        .contact-thank-you-section { padding: 0 0 var(--space-3xl); }
        .contact-thank-you-card { max-width: 920px; margin: 0 auto; padding: clamp(32px, 6vw, 62px); text-align: center; background: var(--primary-navy); border: 1px solid var(--medium-blue); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); }
        .contact-thank-you-card .section-tag { color: var(--light-blue); }
        .contact-thank-you-tag { align-items: center; gap: 7px; }
        .contact-thank-you-card .heading-1 { color: var(--very-light-bg); margin: 8px 0 22px; }
        .contact-thank-you-mark { color: var(--very-light-bg); }
        .contact-thank-you-copy { max-width: 720px; margin: 0 auto; display: grid; gap: 14px; }
        .contact-thank-you-copy p { color: var(--light-blue); font-size: var(--font-size-body); line-height: 1.7; }
        @keyframes contact-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 1050px) { .contact-people-grid { grid-template-columns: repeat(2, 1fr); } .contact-details-layout { grid-template-columns: 1fr; gap: var(--space-lg); } }
        @media (max-width: 800px) { .contact-map-layout { grid-template-columns: 1fr; } .contact-map-frame { min-height: 380px; border-top: 1px solid var(--medium-blue); border-left: 0; } .contact-map-frame iframe { min-height: 380px; } }
        @media (max-width: 760px) { .contact-hero { min-height: 530px; padding-top: 155px; padding-bottom: 70px; } .contact-title { font-size: clamp(2.55rem, 12vw, 4rem); } .contact-section { padding: var(--space-2xl) 0; } .contact-details-grid { grid-template-columns: 1fr; } .contact-detail-card { min-height: auto; } .contact-location-card { gap: 16px; } }
        @media (max-width: 520px) { .contact-people-grid { grid-template-columns: 1fr; } .contact-person-card { min-height: 190px; } .contact-closing-card { align-items: flex-start; padding: 24px; } .contact-thank-you-card { padding: 32px 24px; } }
        @media (prefers-reduced-motion: reduce) { [data-reveal] { opacity: 1; transform: none; transition: none; } .contact-title, .contact-hero [data-reveal] { animation: none; } }
      `}</style>
    </main>
  );
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const planZones = {
  proa: {
    num: '01',
    title: 'La Proa y la Torre',
    text: 'La proa representa el avance de la Patria. La torre, de unos 70 metros, se eleva como hito visible desde distintos puntos de la ciudad.',
    extra: 'Altura de la torre: unos 70 m.',
    link: 'https://www.monumentoalabandera.gob.ar/arquitectura/la-proa'
  },
  patio: {
    num: '02',
    title: 'El Patio Cívico',
    text: 'Sus escalinatas conectan los sectores del conjunto y convierten el espacio en un gran escenario para actos y encuentros ciudadanos.',
    extra: 'Es el espacio central de las ceremonias y celebraciones.',
    link: 'https://www.monumentoalabandera.gob.ar/page/arquitectura'
  },
  propileo: {
    num: '03',
    title: 'El Propileo Triunfal',
    text: 'Sus columnas monumentales enmarcan la llama votiva y la Galería de Honor de las Banderas de América.',
    extra: 'Aloja la llama votiva y la Galería de Honor.',
    link: 'https://www.monumentoalabandera.gob.ar/arquitectura/galeria-de-honor'
  }
};

const planMap = document.querySelector('.plan-map');
if (planMap) {
  const zones = planMap.querySelectorAll('.plan-zone');
  const tip = planMap.querySelector('.plan-tip');
  const info = document.querySelector('.plan-info');
  const infoNum = info.querySelector('.plan-info-num');
  const infoTitle = info.querySelector('.plan-info-title');
  const infoText = info.querySelector('.plan-info-text');
  const infoExtra = info.querySelector('.plan-info-extra');
  const infoLink = info.querySelector('.plan-info-link');

  function showZone(zone) {
    const data = planZones[zone.dataset.zone];
    if (!data) return;
    zones.forEach(z => z.classList.toggle('is-active', z === zone));
    infoNum.textContent = data.num;
    infoTitle.textContent = data.title;
    infoText.textContent = data.text;
    infoExtra.textContent = data.extra;
    infoLink.href = data.link;
    infoLink.hidden = false;
    info.classList.remove('swap');
    void info.offsetWidth; // reinicia la animación
    info.classList.add('swap');
  }

  zones.forEach(zone => {
    zone.addEventListener('mouseenter', () => showZone(zone));
    zone.addEventListener('focus', () => showZone(zone));
    zone.addEventListener('click', () => showZone(zone)); // para pantallas táctiles
    zone.addEventListener('mousemove', e => {
      const box = planMap.getBoundingClientRect();
      tip.textContent = planZones[zone.dataset.zone].num + ' · ' + planZones[zone.dataset.zone].title;
      tip.style.left = (e.clientX - box.left) + 'px';
      tip.style.top = (e.clientY - box.top) + 'px';
      tip.classList.add('show');
    });
    zone.addEventListener('mouseleave', () => tip.classList.remove('show'));
  });
}

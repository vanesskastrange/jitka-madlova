const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const main = document.querySelector('main');
const homepage = main.innerHTML;

const aboutView = `<section class="detail-page about-page"><a class="back-link" href="#portfolio">&#8592; Zpět do portfolia</a><p class="eyebrow">Studio / Bio</p><h1>Jitka <em>Mádlová</em></h1><div class="about-layout"><div class="about-image"></div><div><p class="lead">„Mám ráda svou práci interiérové designérky a architektky.“</p><p>Věřím, že dobrý design a příjemné prostředí nejsou jen otázkou estetiky. Ovlivňují, jak se cítíme, jak vnímáme svět i jak žijeme. Právě tím se zabývám.</p><p>Za sebou mám desítky dokončených projektů a realizací různého zaměření, spokojené klienty, kteří se vracejí, i nové klienty přicházející na doporučení. Opírám se o spolupráci s osvědčenými řemeslníky a spolehlivými dodavateli.</p></div></div><div class="bio-experience"><div><p class="eyebrow">Praxe a vzdělání</p><p><strong>Od 2001</strong><br />Samostatná činnost jako interiérová designérka.</p><p><strong>1996–2001</strong><br />Spolupráce s architektonickými ateliéry.</p><p><strong>2001</strong><br />Ukončení studia na FA VUT.</p></div><div><p class="eyebrow">Výuka a obor</p><p>Od roku 2009 vedu ateliér Design nábytku a interiéru na Střední škole designu interiéru Kateřinky v Liberci. Od roku 2015 vedu také obor Design interiéru.</p><p>Podílím se na výstavách, koncepcích prezentace oboru a školy, soutěžích studentských projektů i stážích Erasmus+.</p></div></div></section>`;
const servicesView = `<section class="detail-page services-page"><a class="back-link" href="#portfolio">&#8592; Zpět do portfolia</a><p class="eyebrow">Studio / Služby</p><h1>Od první<br /><span class="accent-word">myšlenky.</span></h1><p class="services-lead">Každý projekt začíná důkladnou diskusí o vašich představách a potřebách. Společně hledáme řešení, které je osobité, příjemné a dobře funguje.</p><div class="services-list"><article><span>01</span><h2>Konzultace</h2><p>Ujasnění představ, potřeb, možností a směru projektu.</p></article><article><span>02</span><h2>Studie</h2><p>Prostorový koncept, atmosféra, materiály a konkrétní varianty.</p></article><article><span>03</span><h2>Realizační projekt</h2><p>Podklady a koordinace pro hladký přechod od návrhu k realizaci.</p></article><article><span>04</span><h2>Realizace</h2><p>Spolupráce s ověřenými řemeslníky a spolehlivými dodavateli.</p></article></div></section>`;
const cvView = `<section class="detail-page cv-page"><a class="back-link" href="#about">&#8592; Zpět do studia</a><p class="eyebrow">Studio / Životopis</p><h1>Zkušenosti<br />v čase.</h1><div class="cv-grid"><div><p class="eyebrow">Praxe a vzdělání</p><p><strong>Od 2001</strong><br />Samostatná činnost jako interiérová designérka.</p><p><strong>1996–2001</strong><br />Spolupráce s architektonickými ateliéry.</p><p><strong>2001</strong><br />Ukončení studia na FA VUT.</p></div><div><p class="eyebrow">Výuka a obor</p><p>Od roku 2009 vedu ateliér Design nábytku a interiéru na Střední škole designu interiéru Kateřinky v Liberci. Od roku 2015 vedu také obor Design interiéru.</p><p>Podílím se na výstavách, koncepcích prezentace oboru a školy, soutěžích studentských projektů i stážích Erasmus+.</p><p class="cv-note">Design má smysl tehdy, když dobře slouží životu.</p></div></div></section>`;
const reviewsView = `<section class="detail-page reviews-page"><a class="back-link" href="#portfolio">&#8592; Zpět do portfolia</a><p class="eyebrow">Studio / Slova zákazníků</p><h1>Co říkají<br />klienti.</h1><div class="reviews-list"><blockquote>„Jitka dokázala dát našemu domu klid, který jsme hledali, a zároveň mu vtiskla úplně vlastní charakter.“<cite>— Petra a Martin, Praha</cite></blockquote><blockquote>„Od prvního návrhu až po poslední detail jsme měli pocit, že prostor opravdu poslouchá náš život.“<cite>— Klára, Brno</cite></blockquote><blockquote>„Citlivost, přesnost a výsledek, který funguje každý den. Přesně tak jsme si spolupráci představovali.“<cite>— Tomáš, Vinohrady</cite></blockquote></div></section>`;

const route = () => {
  const hash = window.location.hash || '#portfolio';
  const category = hash === '#portfolio-residential' ? 'Bydlení' : hash === '#portfolio-public' ? 'Veřejný prostor' : '';
  if (hash === '#about') {
    main.innerHTML = aboutView;
  } else if (hash === '#services') {
    main.innerHTML = servicesView;
  } else if (hash === '#reviews') {
    main.innerHTML = reviewsView;
    bindReviewPreviews();
  } else {
    main.innerHTML = homepage;
    bindProjects(category);
  }
  if (hash === '#contact') {
    document.querySelector('#contact')?.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
  header.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
};

const bindProjects = (category = '') => {
  const materials = ['Dřevo / světlo', 'Kámen / beton', 'Textil / klid', 'Objem / světlo', 'Dřevo / měkkost', 'Barva / detail', 'Kámen / zahrada', 'Linie / práce', 'Světlo / zeleň', 'Dřevo / proporce'];
  document.querySelectorAll('.project').forEach((project, index) => {
    project.classList.toggle('is-filtered-out', Boolean(category) && !project.dataset.meta.startsWith(category));
    if (!project.querySelector('.project-signature')) {
      const signature = document.createElement('span');
      signature.className = 'project-signature';
      signature.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><small>${materials[index] || 'Materiál / detail'}</small>`;
      project.appendChild(signature);
    }
  });
};

const bindReviewPreviews = () => {
  const images = ['photo-1600210492486-724fe5c67fb0','photo-1600607688969-a5bfcd646154','photo-1618221195710-dd6b41faaea6'];
  document.querySelectorAll('.reviews-list blockquote').forEach((review, index) => {
    review.style.setProperty('--review-image', `url(https://images.unsplash.com/${images[index]}?auto=format&fit=crop&w=900&q=85)`);
    const imageLayer = document.createElement('span');
    imageLayer.className = 'review-image-layer';
    imageLayer.style.backgroundImage = `url(https://images.unsplash.com/${images[index]}?auto=format&fit=crop&w=900&q=85)`;
    review.appendChild(imageLayer);
    review.addEventListener('mouseenter', () => {
      review.classList.add('is-image');
      imageLayer.classList.add('is-visible');
    });
    review.addEventListener('mouseleave', () => {
      review.classList.remove('is-image');
      imageLayer.classList.remove('is-visible');
    });
  });
};

toggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Poptávka od ${form.get('name')}`;
  const body = `Jméno: ${form.get('name')}\nE-mail: ${form.get('email')}\n\n${form.get('message')}`;
  window.location.href = `mailto:j.madlova@volny.cz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
window.addEventListener('hashchange', route);
route();

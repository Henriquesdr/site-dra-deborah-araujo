/* Site Dra. Déborah Araújo
   CONFIG
   whatsapp: só números, com DDI e DDD. Todos os botões "Agendar" e o formulário abrem esta conversa.
   respostas: e-mail que recebe uma cópia de cada formulário enviado (serviço gratuito FormSubmit).
     No primeiro envio, o FormSubmit manda um e-mail de ativação para este endereço: é preciso clicar
     em "Activate Form" uma única vez. Para não receber cópias, deixe vazio: ''. */
const CONFIG = {
  whatsapp: '5531983125089',
  respostas: 'dra.deboraharaujod@hotmail.com',
  email: 'dra.deboraharaujod@hotmail.com',
  instagram: 'dra.deboraharaujod',
  mensagemPadrao: 'Olá, Dra. Déborah! Vim pelo site e gostaria de agendar uma consulta.'
};

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;

  /* ---------- links de agendamento ---------- */
  const wa = (txt) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;
  if (CONFIG.whatsapp) {
    $$('[data-cta]').forEach(a => { a.href = wa(CONFIG.mensagemPadrao); a.target = '_blank'; a.rel = 'noopener'; });
    const n = CONFIG.whatsapp.replace(/^55/, '');
    const t = $('#waText');
    if (t) { const link = document.createElement('a'); link.href = wa(CONFIG.mensagemPadrao); link.target = '_blank'; link.rel = 'noopener';
      link.textContent = n.length === 11 ? `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}` : n; t.replaceWith(link); }
    $('#formBtn').textContent = 'Enviar pelo WhatsApp';
  }

  /* ---------- abertura ---------- */
  const finish = () => { root.classList.add('loaded'); setTimeout(() => $('#loader')?.remove(), 1300); };
  if (reduce) finish();
  else {
    let done = false; const go = () => { if (!done) { done = true; finish(); } };
    window.addEventListener('load', () => setTimeout(go, 1500));
    setTimeout(go, 2600); // nunca segura o site por mais que isso
  }

  /* ---------- topo: fundo ao rolar, esconde ao descer ---------- */
  const top = $('#top'); let lastY = 0;
  const totop = $('.totop'), totopFill = $('#totopFill'), floatCta = $('.float-cta');
  const onScroll = () => {
    const y = scrollY;
    top.classList.toggle('scrolled', y > 30);
    top.classList.toggle('hide', y > 500 && y > lastY && !root.classList.contains('menu-open'));
    lastY = y;
    const max = document.body.scrollHeight - innerHeight;
    totop.classList.toggle('show', y > 700);
    totopFill.style.strokeDashoffset = 125.7 * (1 - Math.min(1, y / max));
    const contato = $('#contato').getBoundingClientRect();
    floatCta.classList.toggle('show', y > 600 && contato.top > innerHeight * .6);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- menu do celular ---------- */
  const burger = $('#burger');
  const setMenu = (open) => { root.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); document.body.style.overflow = open ? 'hidden' : ''; };
  burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $$('#nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- item ativo do menu ---------- */
  const navLinks = $$('#nav a');
  const secObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => secObs.observe(s));

  /* ---------- entrada ao rolar ---------- */
  const revObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.remove('pre'); revObs.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  if (!reduce) $$('[data-reveal]').forEach((el, i) => {
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); el.style.transitionDelay = (i % 4) * 70 + 'ms'; revObs.observe(el); }
  });

  /* ---------- manifesto: palavras acendem com a rolagem ---------- */
  const man = $('#manifest');
  if (man && !reduce) {
    const emWords = ['entender', 'tratar', 'construir'];
    man.innerHTML = man.textContent.trim().split(/\s+/).map(w =>
      `<span class="w${emWords.some(k => w.startsWith(k)) ? ' em' : ''}">${w}</span>`).join(' ');
    const words = $$('.w', man);
    const paint = () => {
      const r = man.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .4)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    addEventListener('scroll', paint, { passive: true }); paint();
  }

  /* ---------- painéis das áreas ---------- */
  const panels = $$('.panel');
  const open = (p) => panels.forEach(x => x.classList.toggle('is-open', x === p));
  panels.forEach(p => {
    p.addEventListener('click', () => open(p));
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(p); } });
    if (fine) p.addEventListener('mouseenter', () => { if (innerWidth > 960) open(p); });
  });

  /* ---------- jornada: linha de progresso ---------- */
  const steps = $$('.step'), fillLine = $('#stepsFill'), stepsBox = $('#steps');
  const paintSteps = () => {
    const r = stepsBox.getBoundingClientRect();
    const mid = innerHeight * .55;
    const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
    fillLine.style.setProperty('--p', (p * 100) + '%');
    steps.forEach(s => s.classList.toggle('on', s.getBoundingClientRect().top < mid));
  };
  addEventListener('scroll', paintSteps, { passive: true }); paintSteps();

  /* ---------- lipedema: checklist ---------- */
  const signs = $$('#signs button'), meterFill = $('#meterFill'), meterN = $('#meterN'), lipMsg = $('#lipMsg'), lipCta = $('#lipCta');
  const msgs = [
    'Toque nos itens com os quais você se identifica.',
    'Esse sinal pode ter outras causas. Se ele incomoda, vale conversar com um médico.',
    'Alguns sinais podem ter outras causas. Se eles incomodam, vale conversar com um médico.',
    'Você marcou vários sinais associados ao lipedema. Uma avaliação médica pode esclarecer o diagnóstico.'
  ];
  const paintLip = () => {
    const n = signs.filter(b => b.getAttribute('aria-pressed') === 'true').length;
    meterN.textContent = n;
    meterFill.style.strokeDashoffset = 326.7 * (1 - n / signs.length);
    lipMsg.textContent = msgs[n === 0 ? 0 : n === 1 ? 1 : n < 3 ? 2 : 3];
    lipCta.hidden = n < 3;
  };
  signs.forEach(b => b.addEventListener('click', () => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); paintLip(); }));

  /* ---------- formulário: envia uma cópia por e-mail e abre o WhatsApp com as respostas ---------- */
  const form = $('#form'), formMsg = $('#formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = $('#f-nome'), f = nome.closest('.field');
    if (!nome.value.trim()) { f.classList.add('err'); formMsg.textContent = 'Escreva seu nome para continuarmos.'; nome.focus(); return; }
    f.classList.remove('err');
    const dados = {
      nome: nome.value.trim(),
      telefone: $('#f-tel').value.trim(),
      interesse: form.querySelector('input[name="area"]:checked').value,
      mensagem: $('#f-msg').value.trim()
    };
    const txt = `Olá, Dra. Déborah! Vim pelo site.\n\n*Nome:* ${dados.nome}` +
      (dados.telefone ? `\n*Telefone:* ${dados.telefone}` : '') +
      `\n*Interesse:* ${dados.interesse}` +
      (dados.mensagem ? `\n*Mensagem:* ${dados.mensagem}` : '') +
      `\n\nGostaria de agendar uma consulta.`;

    // cópia das respostas por e-mail (não trava o WhatsApp se falhar)
    // Envio como formulário simples (sem JSON): o navegador não faz pré-verificação
    // e o pedido continua mesmo quando o WhatsApp abre por cima da página.
    if (CONFIG.respostas) {
      const corpo = new URLSearchParams({
        Nome: dados.nome,
        Telefone: dados.telefone || '(não informado)',
        Interesse: dados.interesse,
        Mensagem: dados.mensagem || '(sem mensagem)',
        _subject: `Novo contato pelo site: ${dados.nome} (${dados.interesse})`,
        _template: 'table',
        _captcha: 'false'
      });
      const url = `https://formsubmit.co/ajax/${CONFIG.respostas}`;
      try {
        fetch(url, { method: 'POST', body: corpo, keepalive: true, headers: { Accept: 'application/json' } })
          .catch(() => { try { navigator.sendBeacon && navigator.sendBeacon(url, corpo); } catch (_) {} });
      } catch (_) {
        try { navigator.sendBeacon && navigator.sendBeacon(url, corpo); } catch (_) {}
      }
    }

    // abre a conversa no WhatsApp com tudo preenchido
    const url = wa(txt);
    const w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;
    formMsg.textContent = 'Abrimos o WhatsApp com a sua mensagem pronta. É só tocar em enviar.';
    form.reset();
  });

  /* ---------- ano ---------- */
  $('#year').textContent = new Date().getFullYear();

  if (reduce) return;

  /* ---------- hero: parallax e arco que segue o mouse ---------- */
  const heroVis = $('#heroVis'), arch = $('.arch');
  addEventListener('scroll', () => { if (scrollY < innerHeight * 1.2) arch.style.setProperty('--py', (scrollY * -.08) + 'px'); }, { passive: true });
  if (fine) $('.hero').addEventListener('mousemove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    heroVis.style.setProperty('--mx', (x * -26) + 'px'); heroVis.style.setProperty('--my', (y * -20) + 'px');
  });

  /* ---------- foto do sobre com inclinação 3D ---------- */
  const tilt = $('#tilt');
  if (fine && tilt) {
    tilt.addEventListener('mousemove', e => {
      const r = tilt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      tilt.style.setProperty('--ry', ((x - .5) * 10) + 'deg'); tilt.style.setProperty('--rx', ((.5 - y) * 10) + 'deg');
      tilt.style.setProperty('--sx', x * 100 + '%'); tilt.style.setProperty('--sy', y * 100 + '%');
    });
    tilt.addEventListener('mouseleave', () => { tilt.style.setProperty('--rx', 0); tilt.style.setProperty('--ry', 0); });
  }

  /* ---------- instagram: holofote no padrão ---------- */
  const insta = $('#insta');
  insta.addEventListener('pointermove', e => {
    const r = insta.getBoundingClientRect();
    insta.style.setProperty('--x', (e.clientX - r.left) + 'px'); insta.style.setProperty('--y', (e.clientY - r.top) + 'px');
    insta.classList.add('lit');
  });
  insta.addEventListener('pointerleave', () => insta.classList.remove('lit'));

  if (!fine) return;

  /* ---------- botões magnéticos ---------- */
  $$('.magnet').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('mouseleave', () => { b.style.transition = 'transform .6s cubic-bezier(.22,.8,.2,1), color .5s'; b.style.transform = ''; setTimeout(() => b.style.transition = '', 600); });
  });

  /* ---------- cursor personalizado ---------- */
  root.classList.add('has-cursor');
  const cur = $('.cursor'), dot = $('.cursor-dot'), ring = $('.cursor-ring'), ringTxt = $('em', ring);
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; });
  (function loop() { rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = `translate(${rx}px,${ry}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('mouseover', e => {
    const lab = e.target.closest('[data-cursor]');
    const link = e.target.closest('a,button,summary,label');
    const dark = e.target.closest('.journey,.insta,.foot,.band,.panel.is-open');
    cur.classList.toggle('is-label', !!lab && !lab.classList.contains('is-open'));
    ringTxt.textContent = lab ? lab.dataset.cursor : '';
    cur.classList.toggle('is-link', !!link && !lab);
    cur.classList.toggle('is-dark', !!dark);
  });
  document.addEventListener('mouseleave', () => cur.style.opacity = 0);
  document.addEventListener('mouseenter', () => cur.style.opacity = 1);
})();

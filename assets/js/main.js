

/* ----- Smooth scroll for internal links ----- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* ----- Year in footer ----- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ----- Copy PGP ----- */
document.getElementById('copyPGP')?.addEventListener('click', ()=>{
  const key = 'FAKE-KEY-1234-REPLACE';
  navigator.clipboard.writeText(key).then(()=>alert('PGP key copied!'));
});

/* ----- Matrix code rain background ----- */
(function matrix(){
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
  resize(); addEventListener('resize', resize);

  const chars = 'アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSize = 14;
  const columns = () => Math.floor(canvas.width / fontSize);
  let drops = new Array(columns()).fill(1);

  function draw(){
    ctx.fillStyle = 'rgba(10,15,20,0.08)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#00ff9c';
    ctx.font = fontSize + 'px Fira Code, monospace';
    for (let i=0; i<drops.length; i++){
      const text = chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text, i*fontSize, drops[i]*fontSize);
      if (drops[i]*fontSize > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 33);
})();

/* ----- Project data (edit this) ----- */
const projects = [
  {
    title: "Threat Modeling: Payment Microservice",
    desc: "STRIDE + DFDs, attack trees, mapped mitigations to OWASP ASVS.",
    tags: ["threat-modeling"],
    tech: ["DFD","STRIDE","ASVS"],
    links: [
      {label:"Repo", url:"https://github.com/your-username/threat-model-webapp"},
      {label:"Read", url:"#"}
    ]
  },
  {
    title: "SOC Detections: Credential Dumping (T1003)",
    desc: "Sysmon + Sigma → Splunk queries; playbook & validation steps.",
    tags: ["defensive"],
    tech: ["Sigma","Splunk","Sysmon"],
    links: [
      {label:"Repo", url:"https://github.com/your-username/soc-playbooks"},
      {label:"Rule", url:"#"}
    ]
  },
  {
    title: "VAPT Lab: Web Exploitation",
    desc: "Recon → SQLi → session issues → fix recommendations + retest.",
    tags: ["offensive"],
    tech: ["Nmap","Burp","ZAP"],
    links: [
      {label:"Repo", url:"https://github.com/your-username/vapt-web-lab"},
      {label:"Report", url:"#"}
    ]
  },
  {
    title: "Password Auditor (CLI)",
    desc: "Python tool for weak policy checks; CSV report; demo dataset.",
    tags: ["offensive","defensive"],
    tech: ["Python","CSV","Regex"],
    links: [
      {label:"Repo", url:"https://github.com/your-username/pwd-auditor"}
    ]
  }
];

/* ----- Render project cards ----- */
const grid = document.getElementById('project-grid');

function renderCards(filter = 'all'){
  grid.innerHTML = '';
  projects
    .filter(p => filter === 'all' ? true : p.tags.includes(filter))
    .forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';
      const badges = (p.tech||[]).map(t=>`<span class="badge">${t}</span>`).join('');
      const links = (p.links||[]).map(l=>`${l.url}${l.label} ↗</a>`).join('');
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="badges">${badges}</div>
        <div class="links">${links}</div>
      `;
      grid.appendChild(card);
    });
}
renderCards();

/* ----- Filters ----- */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(btn.dataset.filter);
  });
});

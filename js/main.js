const roles=["a Full Stack Developer","an API Engineer","an AI Enthusiast","a Cyber Security Enthusiast"];
let roleIndex=0,charIndex=0,deleting=false;
const typingText=document.getElementById("typingText");
function typeRole(){
  const current=roles[roleIndex];
  typingText.textContent=deleting?current.slice(0,--charIndex):current.slice(0,++charIndex);
  if(!deleting && charIndex===current.length){deleting=true;setTimeout(typeRole,1500);return}
  if(deleting && charIndex===0){deleting=false;roleIndex=(roleIndex+1)%roles.length}
  setTimeout(typeRole,deleting?45:80);
}
typeRole();

const header=document.getElementById("header"),progress=document.getElementById("scrollProgress");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",scrollY>20);
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${max>0?(scrollY/max)*100:0}%`;
  updateActiveNav();
});
function updateActiveNav(){
  const sections=[...document.querySelectorAll("main section[id]")];
  let current="home";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
  document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const themeToggle=document.getElementById("themeToggle"),themeIcon=document.getElementById("themeIcon");
const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme)document.documentElement.dataset.theme=savedTheme;
function refreshThemeIcon(){themeIcon.textContent=document.documentElement.dataset.theme==="light"?"☀":"☾"}
refreshThemeIcon();
themeToggle.addEventListener("click",()=>{
  const light=document.documentElement.dataset.theme==="light";
  document.documentElement.dataset.theme=light?"dark":"light";
  localStorage.setItem("portfolio-theme",light?"dark":"light");
  refreshThemeIcon();
});

const mobileMenu=document.getElementById("mobileMenu"),nav=document.getElementById("nav");
mobileMenu.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");mobileMenu.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

document.querySelectorAll(".magnetic").forEach(btn=>{
  btn.addEventListener("mousemove",e=>{
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`;
  });
  btn.addEventListener("mouseleave",()=>btn.style.transform="");
});

const canvas=document.getElementById("digitalCore"),ctx=canvas.getContext("2d"),wrap=document.getElementById("coreWrap");
let cw,ch,dpr,mouseX=0,mouseY=0;
function resizeCore(){dpr=Math.min(devicePixelRatio||1,2);const r=wrap.getBoundingClientRect();cw=r.width;ch=r.height;canvas.width=cw*dpr;canvas.height=ch*dpr;canvas.style.width=cw+"px";canvas.style.height=ch+"px";ctx.setTransform(dpr,0,0,dpr,0,0)}
resizeCore();addEventListener("resize",resizeCore);
wrap.addEventListener("mousemove",e=>{const r=wrap.getBoundingClientRect();mouseX=(e.clientX-r.left-r.width/2)/r.width;mouseY=(e.clientY-r.top-r.height/2)/r.height});
wrap.addEventListener("mouseleave",()=>{mouseX=mouseY=0});
const nodes=Array.from({length:38},(_,i)=>({a:Math.random()*Math.PI*2,r:55+Math.random()*150,z:Math.random()*Math.PI*2,s:.0015+Math.random()*.004}));
function drawCore(t){
  ctx.clearRect(0,0,cw,ch);const cx=cw/2+mouseX*20,cy=ch/2+mouseY*20;
  const g=ctx.createRadialGradient(cx,cy,2,cx,cy,170);g.addColorStop(0,"rgba(98,230,255,.25)");g.addColorStop(1,"rgba(98,230,255,0)");
  ctx.fillStyle=g;ctx.fillRect(0,0,cw,ch);
  const pts=nodes.map(n=>{n.a+=n.s;const depth=Math.sin(n.z+t*.0005),x=cx+Math.cos(n.a)*n.r*(.72+.28*depth),y=cy+Math.sin(n.a)*n.r*.42*(.72+.28*depth);return{x,y,depth}});
  ctx.lineWidth=1;
  pts.forEach((p,i)=>pts.slice(i+1).forEach(q=>{const d=Math.hypot(p.x-q.x,p.y-q.y);if(d<85){ctx.strokeStyle=`rgba(98,230,255,${(1-d/85)*.18})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}));
  pts.forEach((p,i)=>{const size=1.5+((p.depth+1)/2)*2;ctx.fillStyle=i%7===0?"#7b8cff":"#62e6ff";ctx.globalAlpha=.35+((p.depth+1)/2)*.55;ctx.beginPath();ctx.arc(p.x,p.y,size,0,Math.PI*2);ctx.fill()});
  ctx.globalAlpha=1;
  const pulse=20+Math.sin(t*.002)*5;ctx.strokeStyle="rgba(98,230,255,.55)";ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(cx,cy,pulse,0,Math.PI*2);ctx.stroke();
  requestAnimationFrame(drawCore);
}
requestAnimationFrame(drawCore);
document.getElementById("year").textContent=new Date().getFullYear();

const certificates=[
 {title:"Building a Competitive Profile Before 30",provider:"PPI Jepang",year:"2026",image:"assets/certificates/ppi-jepang.jpeg"},
 {title:"2nd Place in ACLEC",provider:"HMP S1 Teknik Informatika",year:"2026",image:"assets/certificates/aclec.jpeg"}
];
const wall=document.getElementById("certificateWall");
wall.innerHTML=certificates.map((c,i)=>`
 <article class="certificate reveal visible" data-index="${i}">
  <span class="cert-badge">${c.year}</span>
  <div class="certificate-image"><img src="${c.image}" alt="${c.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="placeholder-cert" style="display:none">CERT ${String(i+1).padStart(2,"0")}</span></div>
  <div class="certificate-meta"><span class="tag">${c.provider}</span><h3>${c.title}</h3><p>Click to view credential ↗</p></div>
 </article>`).join("");
const modal=document.getElementById("certificateModal");
function openCertificate(c){
 document.getElementById("modalCertificateImage").src=c.image;
 document.getElementById("modalCertificateImage").onerror=()=>{document.getElementById("modalCertificateImage").style.display="none"};
 document.getElementById("modalCertificateProvider").textContent=c.provider;
 document.getElementById("modalCertificateTitle").textContent=c.title;
 document.getElementById("modalCertificateYear").textContent=c.year;
 modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
}
wall.addEventListener("click",e=>{const card=e.target.closest(".certificate");if(card)openCertificate(certificates[Number(card.dataset.index)])});
document.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeModal));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";document.getElementById("modalCertificateImage").style.display=""}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

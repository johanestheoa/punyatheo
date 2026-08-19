const projects=[
 {title:"Sia.SAT Reborn",description:"Revamping Sia.SAT as an integrated digital platform to help students manage their various academic and administrative needs more easily, quickly, and efficiently.",url:"https://sia-sat-reborn.vercel.app/",image:"assets/projects/SIASAT.png",tags:["HTML","CSS","JavaScript, Figma, Supabase"]},
 {title:"Gift Card",description:"A romantic interactive digital birthday gift website featuring a heartfelt love story, personal memories, a special message, and an interactive birthday wish experience.",url:"https://gift-card-tan.vercel.app/",image:"assets/projects/GIFTCARD.png",tags:["JavaScript","CSS","HTML"]},
 ];
const projectsGrid=document.getElementById("projectsGrid");
projectsGrid.innerHTML=projects.map(p=>`
<a class="project-card reveal visible" href="${p.url}" target="_blank" rel="noopener">
 <div class="project-image"><img src="${p.image}" alt="${p.title}" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<span class="placeholder-cert">PROJECT</span>')"><div class="project-overlay"><span class="btn btn-primary">Visit Project ↗</span></div></div>
 <div class="project-body"><span class="tag">PROJECT</span><h3>${p.title}</h3><p>${p.description}</p><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div></div>
</a>`).join("");

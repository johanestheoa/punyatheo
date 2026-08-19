const projects=[
 {title:"Project Alpha",description:"Placeholder business website with a responsive interface and modern user experience.",url:"https://example.com",image:"assets/projects/project-01.svg",tags:["HTML","CSS","JavaScript"]},
 {title:"Project Beta",description:"Placeholder API-driven web application focused on clean data flow and useful interactions.",url:"https://example.com",image:"assets/projects/project-02.svg",tags:["JavaScript","API","MySQL"]},
 {title:"Project Gamma",description:"Placeholder developer experiment combining backend logic, UI and automation.",url:"https://example.com",image:"assets/projects/project-03.svg",tags:["PHP","Laravel","Database"]}
];
const projectsGrid=document.getElementById("projectsGrid");
projectsGrid.innerHTML=projects.map(p=>`
<a class="project-card reveal visible" href="${p.url}" target="_blank" rel="noopener">
 <div class="project-image"><img src="${p.image}" alt="${p.title}" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<span class="placeholder-cert">PROJECT</span>')"><div class="project-overlay"><span class="btn btn-primary">Visit Project ↗</span></div></div>
 <div class="project-body"><span class="tag">PROJECT</span><h3>${p.title}</h3><p>${p.description}</p><div class="project-tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div></div>
</a>`).join("");

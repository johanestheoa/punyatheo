const GITHUB_USER="johanestheoa";
const githubProfile=document.getElementById("githubProfile"),githubGrid=document.getElementById("githubGrid");
const githubHeaders={"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2026-03-10"};
function esc(v){const d=document.createElement("div");d.textContent=v??"";return d.innerHTML}
async function loadGithub(){
  try{
    const [profileRes,reposRes]=await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`,{headers:githubHeaders}),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&direction=desc`,{headers:githubHeaders})
    ]);
    if(!profileRes.ok||!reposRes.ok)throw new Error("GitHub API request failed");
    const profile=await profileRes.json(),repos=await reposRes.json();
    githubProfile.innerHTML=`<img src="${profile.avatar_url}" alt="${esc(profile.login)} avatar"><div><h3>${esc(profile.name||profile.login)}</h3><p>${esc(profile.bio||"GitHub developer profile")} · ${profile.public_repos} public repositories · ${profile.followers} followers</p></div>`;
    if(!repos.length){githubGrid.innerHTML='<div class="loading-card">No public repositories found.</div>';return}
    githubGrid.innerHTML=repos.filter(r=>!r.fork).slice(0,9).map(repo=>`
      <a class="repo-card reveal visible" href="${repo.html_url}" target="_blank" rel="noopener">
        <h3>${esc(repo.name)}</h3>
        <p>${esc(repo.description||"No repository description.")}</p>
        <div class="repo-meta"><span class="repo-lang">${esc(repo.language||"Code")}</span><span>★ ${repo.stargazers_count} · ⑂ ${repo.forks_count}</span></div>
      </a>`).join("");
  }catch(err){
    githubProfile.innerHTML=`<div><h3>GitHub connection unavailable</h3><p>Check your internet connection or GitHub API rate limit.</p></div>`;
    githubGrid.innerHTML=`<div class="loading-card">Unable to load repositories right now. <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener">Open GitHub directly ↗</a></div>`;
  }
}
loadGithub();

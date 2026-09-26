const TOTAL_MEMORIES = 15;

const gallery = [
  {
    id: 1, image: "assets/images/01-shinchan.jpg", character: "Shinchan",
    title: "The Little Trouble Maker", caption: "Idi mana Shinchan ra! 😌",
    captions: ['Mana childhood hero! ❤️', 'Ee scene chusthe navvu aagadu.', 'Shinchan vibes forever.']
  },
  {
    id: 2, image: "assets/images/02-shinchan.jpg", character: "Shinchan",
    title: "Mischief Mode", caption: "Malli oka chinna mischief start ayindi.",
    captions: ['Mischief ki king!', 'Inko plan ready aa?', 'Ayyo, malli start chesadu! 😂']
  },
  {
    id: 3, image: "assets/images/03-shinchan.jpg", character: "Shinchan",
    title: "Childhood Chaos", caption: "Childhood ante ilanti chaos eh!",
    captions: ['Chaos + comedy = Shinchan.', 'Ilaanti days malli raavu.', 'Pure childhood energy.']
  },
  {
    id: 4, image: "assets/images/04-shinchan.jpg", character: "Shinchan",
    title: "That Classic Smile", caption: "Aa smile chusthe old memories automatic ga vastayi.",
    captions: ['Aa expression ultimate!', 'Classic Shinchan moment.', 'Old memories unlocked.']
  },
  {
    id: 5, image: "assets/images/05-shinchan.jpg", character: "Shinchan",
    title: "Our Everyday Adventure", caption: "Simple days... big memories. ❤️",
    captions: ['Everyday life, unforgettable memories.', 'Small moment, big nostalgia.', 'Idi childhood magic.']
  },
  {
    id: 6, image: "assets/images/06-misae.jpg", character: "Misae",
    title: "Misae Moments", caption: "Misae ante strict love + full care.",
    captions: ['Misae mode: ON 😤', 'Strict ga unna, heart full love.', 'Amma love is different.']
  },
  {
    id: 7, image: "assets/images/07-hiroshi.jpg", character: "Hiroshi",
    title: "Hiroshi After Work", caption: "Hiroshi garu... work ayyaka konchem peace kavali 😂",
    captions: ['Office stress pakkana pettu boss!', 'Hiroshi gariki one peaceful moment.', 'Family time is best.']
  },
  {
    id: 8, image: "assets/images/08-himawari.jpg", character: "Himawari",
    title: "Tiny Himawari", caption: "Chinna Himawari, pedda cuteness!",
    captions: ['Tiny cuteness overload!', 'Himawari steals the scene.', 'Baby chaos incoming!']
  },
  {
    id: 9, image: "assets/images/09-shiro.jpg", character: "Shiro",
    title: "Shiro's Secret", caption: "Shiro tho secret mission start.",
    captions: ['Shiro is always part of the adventure.', 'Silent ga untadu... kani important!', 'Best pet ever.']
  },
  {
    id: 10, image: "assets/images/10-shinchan-shiro.jpg", character: "Shinchan + Shiro",
    title: "Best Buddies", caption: "Iddaru kalisthe chaos guarantee!",
    captions: ['Dynamic duo ready!', 'Together = double trouble.', 'Best buddy energy.']
  },
  {
    id: 11, image: "assets/images/11-shinchan-misae.jpg", character: "Shinchan + Misae",
    title: "Mother & Son", caption: "Amma-son bond always special.",
    captions: ['Amma-son memories hit different.', 'Love with a little chaos.', 'Family first. ❤️']
  },
  {
    id: 12, image: "assets/images/12-shinchan-hiroshi.jpg", character: "Shinchan + Hiroshi",
    title: "Father & Son", caption: "Nanna-son moments are priceless.",
    captions: ['Nanna-son time!', 'Small moments, lifetime memories.', 'Classic family vibes.']
  },
  {
    id: 13, image: "assets/images/13-shinchan-himawari.jpg", character: "Shinchan + Himawari",
    title: "Sibling Chaos", caption: "Sibling fights... but love always wins.",
    captions: ['Sibling chaos unlocked!', 'Fight chesina, love same.', 'Family madness 😂']
  },
  {
    id: 14, image: "assets/images/14-shinchan-kazama.jpg", character: "Shinchan + Kazama",
    title: "Best Friend Energy", caption: "Kazama tho friendship ante full entertainment.",
    captions: ['Kazama + Shinchan = guaranteed fun.', 'Friendship with full comedy.', 'School days forever.']
  },
  {
    id: 15, image: "assets/images/15-shinchan-nene.jpg", character: "Shinchan + Nene",
    title: "School-Day Memories", caption: "Nene tho school memories vere level!",
    captions: ['School memories, endless fun.', 'Nene tho scenes always memorable.', 'Childhood friendship forever.']
  }
];

const $ = s => document.querySelector(s);
const app = $("#app"), loader = $("#loader"), img = $("#memoryImage");
const caption = $("#memoryCaption"), title = $("#memoryTitle"), character = $("#memoryCharacter");
const indexEl = $("#memoryIndex"), progressNumber = $("#progressNumber"), progressRail = $("#progressRail");
const audio = $("#bgAudio"), toast = $("#toast");
let current = 0, lastScroll = 0, started = false, nightTimer, captionCursor = {};
let favorites = JSON.parse(localStorage.getItem("shinchan-favorites") || "[]");

function showToast(msg){ toast.textContent=msg; toast.classList.add("show"); clearTimeout(showToast.t); showToast.t=setTimeout(()=>toast.classList.remove("show"),1800); }
function accentFromIndex(i){
  const hues=[350,205,48,130,28,350,205,48,130,285,18,205,48,28,350,205,130,285,18,350,205,48,28,350,205];
  const h=hues[i]||350;
  app.style.setProperty("--accent",`hsl(${h} 90% 62%)`);
  app.style.setProperty("--accent2",`hsl(${(h+48)%360} 88% 70%)`);
}
function nextCaption(i){
  const arr=gallery[i].captions || [gallery[i].caption];
  captionCursor[i]=(captionCursor[i]??-1)+1;
  return arr[captionCursor[i]%arr.length];
}
function update(i, direction=1){
  i=Math.max(0,Math.min(gallery.length-1,i)); current=i;
  const {image:src, character:char, title:ttl}=gallery[i];
  const old=img.getBoundingClientRect();
  img.animate([{filter:"blur(0)",transform:"scale(1) rotate(0deg)",opacity:1},{filter:"blur(16px)",transform:`scale(${direction>0?1.08:.94}) rotate(${direction>0?2:-2}deg)`,opacity:.15}],{duration:380,easing:"cubic-bezier(.65,0,.35,1)"});
  setTimeout(()=>{
    img.src=src;
    img.alt=`${char} — Shinchan memory ${String(i+1).padStart(2,"0")}`;
    img.onerror=()=>{ showToast(`Image not found: ${src.split("/").pop()}`); };
    title.textContent=ttl; character.textContent=char.toUpperCase();
    caption.textContent=nextCaption(i);
    indexEl.textContent=`${String(i+1).padStart(2,"0")} / ${TOTAL_MEMORIES}`; progressNumber.textContent=String(i+1).padStart(2,"0");
    progressRail.style.setProperty("--progress",`${((i+1)/TOTAL_MEMORIES)*100}%`);
    accentFromIndex(i);
    img.animate([{filter:"blur(14px)",transform:`scale(${direction>0?.96:1.06}) rotate(${direction>0?-2:2}deg)`,opacity:.1},{filter:"blur(0)",transform:"scale(1) rotate(0deg)",opacity:1}],{duration:700,easing:"cubic-bezier(.2,.8,.2,1)"});
    preload(i+1); preload(i-1); updateFavorite();
    if(i===TOTAL_MEMORIES-1){setTimeout(()=>document.body.classList.add("final-memory"),300)}
  },160);
}
function preload(i){if(i<0||i>=gallery.length)return;const im=new Image();im.src=gallery[i].image;}
function updateFavorite(){const active=favorites.includes(current);$("#favoriteBtn").textContent=active?"♥":"♡";$("#favoriteBtn").setAttribute("aria-label",active?"Unfavorite memory":"Favorite memory")}
function scrollToMemory(i){const y=(i/(gallery.length-1))*((document.documentElement.scrollHeight-innerHeight)*.93); window.scrollTo({top:y,behavior:"smooth"});}
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const p=Math.max(0,Math.min(1,scrollY/max));
  const target=Math.min(TOTAL_MEMORIES-1,Math.floor(p*TOTAL_MEMORIES));
  if(target!==current) update(target,target>current?1:-1);
  const within=(p*TOTAL_MEMORIES)%1;
  const scale=1+within*.025;
  img.style.transform=`translate3d(var(--mx),var(--my),0) scale(${scale})`;
  lastScroll=scrollY;
}
function startAudio(){
  audio.volume=Number($("#volume").value);
  audio.play().then(()=>$("#musicBtn").textContent="Ⅱ").catch(()=>showToast("Add an authorized audio file to assets/audio."));
}
function particles(){
  const box=$("#particles");
  for(let i=0;i<28;i++){const p=document.createElement("i");p.className="particle";p.style.left=Math.random()*100+"%";p.style.top=(30+Math.random()*70)+"%";p.style.animationDuration=(5+Math.random()*10)+"s";p.style.animationDelay=(-Math.random()*10)+"s";p.style.opacity=(.15+Math.random()*.45);box.appendChild(p)}
}
function setupLenis(){
  if(window.Lenis){
    const lenis=new Lenis({duration:1.05,smoothWheel:true,syncTouch:false});
    function raf(t){lenis.raf(t);requestAnimationFrame(raf)} requestAnimationFrame(raf);
  }
}
$("#enterBtn").addEventListener("click",()=>{
  if(started)return; started=true; loader.animate([{opacity:1,filter:"blur(0)"},{opacity:0,filter:"blur(12px)"}],{duration:850,easing:"ease-in"}).finished.then(()=>{loader.style.display="none";app.classList.remove("is-hidden");startAudio();setupLenis();preload(1);});
});
$("#musicBtn").addEventListener("click",()=>{if(audio.paused){startAudio();$("#musicBtn").textContent="Ⅱ"}else{audio.pause();$("#musicBtn").textContent="♫"}});
$("#volume").addEventListener("input",e=>audio.volume=e.target.value);
$("#muteBtn").addEventListener("click",()=>{audio.muted=!audio.muted;$("#muteBtn").textContent=audio.muted?"×":"⌁";showToast(audio.muted?"Sound muted":"Sound on")});
$("#favoriteBtn").addEventListener("click",()=>{favorites=favorites.includes(current)?favorites.filter(x=>x!==current):[...favorites,current];localStorage.setItem("shinchan-favorites",JSON.stringify(favorites));updateFavorite();showToast(favorites.includes(current)?"Memory saved ❤️":"Memory removed")});
$("#randomBtn").addEventListener("click",()=>scrollToMemory(Math.floor(Math.random()*TOTAL_MEMORIES)));
$("#fullscreenBtn").addEventListener("click",async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch{}});
$("#shareBtn").addEventListener("click",async()=>{const data={title:"SHINCHAN — Childhood Memories",text:`Memory ${current+1}: ${gallery[current].title}`,url:location.href};try{if(navigator.share)await navigator.share(data);else throw 0}catch{try{await navigator.clipboard.writeText(location.href);showToast("Memory link copied! 😎")}catch{showToast("Copy the page URL to share it.")}}});
$("#downloadBtn").addEventListener("click",()=>{showToast("Download is available only for authorized image assets.");});
$("#replayBtn").addEventListener("click",()=>{document.body.classList.remove("final-memory");scrollToMemory(0)});
$("#exploreBtn").addEventListener("click",()=>scrollToMemory(Math.floor(Math.random()*TOTAL_MEMORIES)));
$("#crayonBtn").addEventListener("click",()=>{app.classList.toggle("crayon-mode");showToast(app.classList.contains("crayon-mode")?"Crayon mode! ✎":"Glass mode restored")});
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("pointermove",e=>{if(innerWidth<800)return;const x=(e.clientX/innerWidth-.5)*18,y=(e.clientY/innerHeight-.5)*18;app.style.setProperty("--mx",`${x}px`);app.style.setProperty("--my",`${y}px`)},{passive:true});
window.addEventListener("touchstart",()=>{clearTimeout(nightTimer);document.body.classList.remove("night")},{passive:true});
window.addEventListener("touchend",()=>{nightTimer=setTimeout(()=>{document.body.classList.add("night");showToast("Childhood memories never sleep... 🌙")},18000)},{passive:true});
let taps=0,tapTimer;
img.addEventListener("click",()=>{taps++;clearTimeout(tapTimer);tapTimer=setTimeout(()=>taps=0,900);if(taps>=3){taps=0;showToast(["Nenu hero! 😎","Ammaaa... nannu chudaledu kada? 😂","Shiro, secret mission! 🐶"][Math.floor(Math.random()*3)]);img.animate([{transform:"scale(1)"},{transform:"scale(1.07) rotate(-2deg)"},{transform:"scale(1) rotate(0)"}],{duration:650,easing:"cubic-bezier(.2,.8,.2,1)"})}});
const shiro=$("#shiroEgg"); setInterval(()=>{if(Math.random()<.28){shiro.classList.add("visible");shiro.setAttribute("aria-hidden","false");setTimeout(()=>shiro.classList.remove("visible"),3200)}},11000);
shiro.addEventListener("click",()=>showToast("Shirooo! Ekkuvasepu hide avvaku ra! 😂"));
document.addEventListener("keydown",e=>{if(e.key==="ArrowDown")scrollToMemory(Math.min(TOTAL_MEMORIES-1,current+1));if(e.key==="ArrowUp")scrollToMemory(Math.max(0,current-1));if(e.key==="r")scrollToMemory(Math.floor(Math.random()*TOTAL_MEMORIES));if(e.key==="m")$("#muteBtn").click()});
particles(); update(0); updateFavorite();

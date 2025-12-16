// Birthday page interactions and animations
const MESSAGE = `Barakallahu fi umrikk dekk🥳🥳. Ciee.. ada yang ulang tahunn uhuyyy, ada yangg nambahh umurnyaa.

Mogaa dengan nambah umurr ke bisa makinn baik kedepannya, dekat sama Allah, rajin ibadah, rajin sedekah, selalu nolong orng, selalu buat baikk, sayangg ayah sama mimii, sayang keluarga🩵. Semoga makin semangatt yaa kedepannya semakin baikk, makin berkembang💪🏻💪🏻Ke kerenn udh berhasil ngelewatin dan bertahan sampe akhir 2025 nii.

Pesan aku ya gabanyak, jaga diri, jaga kesehatann, istirahatt yang ckupp ya, jgn paksain diri, ga semua hal juga harus dipendam sendiri, makan minum yang sehat dan tepat waktu. Fokus sekolah ke, krn bntr lagi udh mau snbt. Klo dah capek tuh istirahatt.

Aku jg minta maaf sebesar besar nya, aku tau aku banyak salah sama ke, mau itu sengaja ataupun engga, aku tau aku udh banyak buat ke gaenakan ataupun sedih, bahkan mngkn sampai detik ini aku masih punya salah sama ke, jdi aku minta maaf sebesar besarnya. Maaf jg aku gabisa kasih apa apa buat ke, padahal ke lgi ultah yakan. Aku cmn bisa effort buatin ginian, aku jg mau ucapin makasih banyak ya atas semua hal dari awal kita kenal sampai detik ini, aku merasa banyak berhutang sama ke.

Ur pity, Zain's✨`;

// Lightweight progressive reveal (chunked) to keep performance
(function showMessage(){
  const el = document.getElementById('message');
  let idx = 0;
  const chunk = 4; // chars per frame
  function step(){
    if(idx < MESSAGE.length){
      el.innerText += MESSAGE.substr(idx, chunk);
      idx += chunk;
      requestAnimationFrame(step);
    }
  }
  step();
})();

// Spawn hearts on button click
function spawnHearts(){
  for(let i=0;i<18;i++){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random()*90 + 'vw';
    h.style.animationDuration = (4 + Math.random()*4) + 's';
    h.textContent = ['💙','🤩','🎂','💌'][Math.floor(Math.random()*4)];
    document.body.appendChild(h);
    setTimeout(()=>h.remove(), 7000);
  }
}

// Continuous floating emojis (panda, dolphin, blue hearts)
(function floaters(){
  const pool = document.getElementById('floaters');
  const emojis = ['🤩','🎂','💙','💌','🩵'];
  setInterval(()=>{
    const e = document.createElement('div');
    e.className = 'floater';
    e.style.position = 'fixed';
    e.style.left = Math.random()*94 + 'vw';
    e.style.bottom = '-40px';
    e.style.fontSize = (16 + Math.random()*28) + 'px';
    e.style.opacity = 0.95;
    e.style.pointerEvents = 'none';
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.zIndex = 30;
    e.style.animation = `floatUp ${6 + Math.random()*6}s linear forwards`;
    pool.appendChild(e);
    setTimeout(()=>e.remove(), 12000);
  }, 800);
})();

// Define keyframes dynamically for floatUp to avoid missing CSS in some contexts
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `@keyframes floatUp {from{transform:translateY(0) rotate(0deg);opacity:1} to{transform:translateY(-120vh) rotate(360deg);opacity:0}}`;
document.head.appendChild(styleSheet);

// Scroll nav controls
const scrollBox = document.getElementById('scrollBox');
document.getElementById('upBtn').addEventListener('click', ()=> scrollBox.scrollBy({top:-120,behavior:'smooth'}));
document.getElementById('downBtn').addEventListener('click', ()=> scrollBox.scrollBy({top:120,behavior:'smooth'}));
document.getElementById('topBtn').addEventListener('click', ()=> scrollBox.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('bottomBtn').addEventListener('click', ()=> scrollBox.scrollTo({top:scrollBox.scrollHeight,behavior:'smooth'}));

// Audio handling with graceful fallback
(function audioInit(){
  const audio = document.getElementById('bgm');
  const cta = document.getElementById('audio-cta');
  const btn = document.getElementById('play-btn');
  const muteBtn = document.getElementById('muteBtn');
  audio.muted = true;
  const tryPlay = () => audio.play().then(()=>{ setTimeout(()=>{ audio.muted = false; }, 600); cta.classList.add('hidden'); }).catch(()=>{ cta.classList.remove('hidden'); });
  document.addEventListener('click', function once(){ if(audio.paused){ audio.muted = false; audio.play().then(()=>cta.classList.add('hidden')).catch(()=>cta.classList.remove('hidden')); } document.removeEventListener('click', once); }, {once:true});
  btn.addEventListener('click', ()=>{ audio.muted = false; audio.play().then(()=>cta.classList.add('hidden')).catch(()=>cta.classList.remove('hidden')); });
  muteBtn.addEventListener('click', ()=>{ audio.muted = !audio.muted; muteBtn.setAttribute('aria-pressed', String(!audio.muted)); muteBtn.textContent = audio.muted ? '🔇 Muted' : '🔊 Unmuted'; });
  tryPlay();
})();

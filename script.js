// Birthday page interactions and animations
const MESSAGE = `Assalamualaikum dedekk, barakallah fi umrikk... Pibesdeyyy yg ke 20🥳🥳🫶🏻, ciee ada yang nambah umur di akhir taun iniii.🐬🩵🐼

Semogaa dengan bertambah nyaa umurr dedekk, dedekk bisa makinn dekatt sama Allah, rajin ibadah, rajin sedekah, slalu nolong orng, berbuat baikk, sayangg abi and umii, sayangg keluargaa🩵🫂🥰 Semoga makinn cemungutt kedepann nya, semakinn baikk, lantakk lajuu, hantamm smuanyaa💪🏻💪🏻 dek kerenn bisa survive sampai akhir tahun 2025 yang sangatt luar biasa beratt, bigg hugg dlu🫂🫂. 

Pesan babangg jaga dirii yaaw, jagaa kesehatann, rawatt diriii, kasiann ama badaannya teyy, istirahatt yg ckupp teyy, makann tepatt waktuu jgn telatt" minumm jgn yg anehh"😠, minum nya air putiss sahajaa. Klo capek istirahatt, healingg tapi jan kebanyakann, mager nnti ke😒. Fokuss ke kuliahh nyaa teyy, klo da lomba" kegiatann" pendaftaran" lantakk lajuu tross sabett smua juaraanya jan maluww", kan dh gada lagi abg jdi gada siapa yg kekangg, dek bebas kembanginn diri dekk😊😊

Abg jg minta maaf sebesarr" nyaa se gedee"nya. Abg tau abg banyak salah sama dek bahkan sampai detik ini abg masih bersalah sama dek, abg gabisa kasih apa" buat dek, abg bkn apa" bkn siapa" bkn keluarga terpandang apalagi kayaraya. Abg cmn bisa kasih ini buat dedek tercintahh🥹 maap yaa, ga seberapaa ga se wahh cwok lain ga semahal cwok lainn. Cwok lain bisa bahagiain cwek nya dgn tulus, hadiahin cwek nya IP tpi abg cmn bisa effort hal kyk gini. Sekali lagi bg minta maaff😔. Dan terimakasih buat dedek yang udh hadir di kehidupan abg yg ga seberapa ini menjadi pelengkap bgi abg🥹😚. Makasih banyaa yaa dekk. Love u🩵

Ur lumbaa🩵🐬`;

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
    h.textContent = ['💙','🐼','🐬','💌'][Math.floor(Math.random()*4)];
    document.body.appendChild(h);
    setTimeout(()=>h.remove(), 7000);
  }
}

// Continuous floating emojis (panda, dolphin, blue hearts)
(function floaters(){
  const pool = document.getElementById('floaters');
  const emojis = ['🐼','🐬','💙','💌','🩵'];
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

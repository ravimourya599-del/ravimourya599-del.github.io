// Helper: randomly place the No button inside the parent area
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttonArea = document.getElementById('buttonArea');
const overlay = document.getElementById('messageOverlay');
const msgText = document.getElementById('msgText');
const closeBtn = document.getElementById('closeBtn');
const confettiRoot = document.getElementById('confetti');

function placeNoRandom() {
  const area = buttonArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const padding = 8;
  const maxX = Math.max(0, area.width - btn.width - padding);
  const maxY = Math.max(0, area.height - btn.height - padding);
  const x = Math.floor(Math.random() * (maxX + 1));
  const y = Math.floor(Math.random() * (maxY + 1));
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// Move away on hover / pointerenter
noBtn.addEventListener('pointerenter', (e) => {
  placeNoRandom();
});

// For touch devices, move on touchstart and on focus
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  placeNoRandom();
});

noBtn.addEventListener('click', (e) => {
  // Prevent accidental clicks: move away instead
  e.preventDefault();
  placeNoRandom();
});

// Ensure initial layout and on resize
window.addEventListener('load', () => {
  // center initially
  noBtn.style.transition = 'transform 120ms ease';
  yesBtn.style.transition = 'transform 120ms ease';
  // try placing near left to start
  noBtn.style.transform = 'translate(0,0)';
});
window.addEventListener('resize', () => {
  noBtn.style.transform = 'translate(0,0)';
});

// Yes button shows messages
const messages = [
  "I love you more than words can say.",
  "You fill my days with joy and my heart with roses.",
  "Your laugh is my favorite sound.",
  "I promise to always be there for you — in big moments and small.",
  "I dream of making beautiful memories together every day.",
  "Will you make every day special with me? ❤️"
];

function showOverlay() {
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  runConfetti();
}

function hideOverlay(){
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
  confettiRoot.innerHTML = '';
}

yesBtn.addEventListener('click', () => {
  // type messages sequentially
  showOverlay();
  let idx = 0;
  msgText.textContent = '';
  const showNext = () => {
    if (idx >= messages.length) return;
    typeText(messages[idx], msgText, () => {
      idx++;
      setTimeout(showNext, 700);
    });
  };
  showNext();
});

closeBtn.addEventListener('click', hideOverlay);
// Japanese quotes with meanings
const japaneseQuotes = [
  {quote: "月が綺麗ですね", english: "The moon is beautiful, isn't it?", meaning: "A poetic way to confess love — it means 'I love you' in the most subtle, poetic way."}, 
  {quote: "君を好きになってよかった", english: "I'm glad I fell in love with you.", meaning: "A honest expression of gratitude for having you in their life."},
  {quote: "運命なんて信じなかった。あなたに会うまで", english: "I didn't believe in destiny... until I met you.", meaning: "You changed my entire worldview; you are my destiny."},
  {quote: "あなたがいれば、何も怖くない", english: "With you, I'm not afraid of anything.", meaning: "Your presence gives me strength and courage."},
  {quote: "毎日があなたのおかげで輝いている", english: "Every day shines because of you.", meaning: "You bring light and joy into my ordinary days."}
];

function createFloatingHearts(){
  const container = document.getElementById('heartsContainer');
  const count = 8;
  for(let i = 0; i < count; i++){
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    // Make 3 hearts special/glowing
    if(i < 3){
      heart.classList.add('glow');
      heart.dataset.special = 'true';
      heart.addEventListener('click', showJapaneseQuote);
    }
    
    container.appendChild(heart);
  }
}

function showJapaneseQuote(e){
  e.stopPropagation();
  const quote = japaneseQuotes[Math.floor(Math.random() * japaneseQuotes.length)];
  const section = document.getElementById('jpQuoteContainer');
  const quoteText = document.getElementById('jpQuote');
  const meaning = document.getElementById('jpMeaning');
  
  quoteText.textContent = `"${quote.quote}" — ${quote.english}`;
  meaning.textContent = `✨ ${quote.meaning}`;
  meaning.classList.add('hidden');
  
  section.classList.remove('hidden');
  
  // Scroll to show quote
  section.scrollIntoView({behavior: 'smooth', block: 'nearest'});
}

document.getElementById('replyBtn').addEventListener('click', function(){
  const meaning = document.getElementById('jpMeaning');
  meaning.classList.toggle('hidden');
  this.textContent = meaning.classList.contains('hidden') ? 'Reply 💭' : 'Hide 🤫';
});

window.addEventListener('load', createFloatingHearts);
function typeText(text, node, cb){
  node.textContent = '';
  let i = 0;
  const t = setInterval(()=>{
    node.textContent += text[i++] || '';
    if(i>text.length){
      clearInterval(t);
      cb && cb();
    }
  }, 36);
}

// Simple confetti generator: creates falling colored pieces
function runConfetti(){
  confettiRoot.innerHTML = '';
  const colors = ['#ff4da6','#ffd166','#ff7ab6','#ffb3c6','#ffd6e0'];
  const count = 24;
  const area = confettiRoot.getBoundingClientRect();
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = Math.random()*100 + '%';
    el.style.top = -(Math.random()*20 + 2) + 'px';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    el.style.animationDuration = (1200 + Math.random()*800) + 'ms';
    el.style.width = (6 + Math.random()*12) + 'px';
    el.style.height = (8 + Math.random()*16) + 'px';
    confettiRoot.appendChild(el);
  }
  // remove after animation
  setTimeout(()=>{ confettiRoot.innerHTML = ''; }, 2200);
}

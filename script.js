//const button = document.getElementsByTagName('button')[0];
const pad = document.getElementsByTagName('svg')[0];
let currentDegree;

window.speechSynthesis.onvoiceschanged = () => pad.addEventListener('click', spinPad);

function spinPad() {
  // const degrees = [45, 90, 135, 180, 225, 270, 315];
  const degrees = [45, 90, 135, 180, 225, 270, 315];
  const randomDegree = degrees[Math.floor(Math.random()*degrees.length)];
  const rotationDegree = currentDegree ? randomDegree - Math.abs(360 - currentDegree) + 360 : randomDegree + 360;
  currentDegree = rotationDegree;
  
  pad.style.transform = 'rotate(' + rotationDegree + 'deg)';
  getPhrase(randomDegree);
}

function getPhrase(degree) {
  const phrases = [
    { degree: 45,
      phrase: "I can't feel a thing. Jackpot." },
    { degree: 90,
      phrase: "Well this is bloody annoying" },
    { degree: 135,
      phrase: "Jesus, get me some painkillers" },
    { degree: 180,
      phrase: "Neurofen, why have you forsaken me?" },
    { degree: 225,
      phrase: "Is this what it feels like to have a miscarriage" },
    { degree: 270,
      phrase: "What did I do to deserve this?" },
    { degree: 315,
      phrase: "Fuck this shit, I’m getting a hysterectomy" },
  ];

  const selectedItem= phrases.filter(phrase => phrase.degree === degree)[0];
  playAudio(selectedItem.phrase);
}

function playAudio(phrase) {
  const utterance = new SpeechSynthesisUtterance(phrase);
  const voices = [...window.speechSynthesis.getVoices()];
  utterance.voice = voices.filter(voice => voice.name == 'Samantha')[0];
  // Interupt any speech already playing
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

(function() {
  //const data = require('./data.js');

  const pad = document.getElementsByClassName('pad')[0];

  let currentDegree;

  window.speechSynthesis.onvoiceschanged = () => pad.addEventListener('click', spinPad);

  function spinPad() {
    const degrees = data.map(item => item.degree);
    const randomDegree = degrees[Math.floor(Math.random()*degrees.length)];
    const selectedItem= data.filter(item => item.degree === randomDegree)[0]; 
    const rotationDegree = currentDegree ? randomDegree - Math.abs(360 - currentDegree) + 360 : randomDegree + 360;
    currentDegree = rotationDegree;
    
    pad.style.transform = 'rotate(' + rotationDegree + 'deg)';
    animateBlood(selectedItem);
    getPhrase(selectedItem);
  }

  function animateBlood(selectedItem) {
    const blood = document.getElementsByClassName('blood')[0];
    const snapEl = Snap(blood);
    blood.classList.remove('blood--hidden');
    snapEl.animate({
      height: selectedItem.svg.height,
      width: selectedItem.svg.width,
      x: selectedItem.svg.x,
      y: selectedItem.svg.y
    }, 1000);
  }

  function getPhrase(selectedItem) {
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
})();
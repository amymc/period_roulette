(function() {
  const pad = document.getElementsByClassName('pad')[0];

  const data = [
     { degree: 45,
        phrase: "I can't feel a thing. Jackpot.",
        svg: {
          width: '6px',
          height: '7px',
          x: '45%',
          y: '45%'
        }
      },
      { degree: 90,
        phrase: "Well this is bloody annoying",
        svg: {
          width: '8px',
          height: '10px',
          x: '45%',
          y: '45%'
        }
      },
      { degree: 135,
        phrase: "Jesus, get me some painkillers",
        svg: {
          width: '13px',
          height: '15px',
          x: '40%',
          y: '40%'
        }
      },
      { degree: 180,
        phrase: "Neurofen, why have you forsaken me?",
        svg: {
          width: '16px',
          height: '19px',
          x: '35%',
          y: '40%'
        }
      },
      { degree: 225,
        phrase: "Is this what it feels like to have a miscarriage",
        svg: {
          width: '20px',
          height: '24px',
          x: '35%',
          y: '40%'
        }
      },
      { degree: 270,
        phrase: "What did I do to deserve this torture?",
        svg: {
          width: '23px',
          height: '27px',
          x: '30%',
          y: '35%'
        }
      },
      { degree: 315,
        phrase: "Fuck this shit, I’m getting a hysterectomy",
        svg: {
          width: '26px',
          height: '30px',
          x: '30%',
          y: '35%'
        }
      },
    ];

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
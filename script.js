(function() {
  const pad = document.getElementsByClassName('pad')[0];
  const blood = document.getElementsByClassName('blood')[0];

  const data = [
     { degree: 45,
        phrase: "I can't feel a thing. Jackpot.",
        svg: {
          width: '6px',
          height: '7px'
        }
      },
      { degree: 90,
        phrase: "Well this is bloody annoying",
        svg: {
          width: '8px',
          height: '10px'
        }
      },
      { degree: 135,
        phrase: "Jesus, get me some painkillers",
        svg: {
          width: '13px',
          height: '15px'
        }
      },
      { degree: 180,
        phrase: "Neurofen, why have you forsaken me?",
        svg: {
          width: '16px',
          height: '19px'
        }
      },
      { degree: 225,
        phrase: "Is this what it feels like to have a miscarriage",
        svg: {
          width: '20px',
          height: '24px'
        }
      },
      { degree: 270,
        phrase: "What did I do to deserve this torture?",
        svg: {
          width: '23px',
          height: '27px'
        }
      },
      { degree: 315,
        phrase: "Fuck this shit, I’m getting a hysterectomy",
        svg: {
          width: '26px',
          height: '30px'
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
    blood.classList.remove('blood--hidden');
    blood.setAttribute('width', selectedItem.svg.width);
    blood.setAttribute('height', selectedItem.svg.height);
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
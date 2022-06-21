//this a free keyboard typing sound effects
const prod = true;
const keystrokeSound = new Audio(
  prod ? "./assets/keytap.mp3" : "../assets/keytap.mp3"
);

const soundLoaded = new Event("SOUND_LOADED");
const typingStarted = new Event("TYPING_STARTED");
const typingComplete = new Event("TYPING_COMPLETE");

keystrokeSound.addEventListener("canplaythrough", (event) => {
  /* the audio is now playable; play it if permissions allow */

  document.dispatchEvent(soundLoaded);
});

function playSound() {
  if (typeof keystrokeSound.loop == "boolean") {
    keystrokeSound.loop = true;
  }
  keystrokeSound.play();
}

function stopSound() {
  keystrokeSound.pause();
}

function setSoundPos(pos) {
  keystrokeSound.pause();
  keystrokeSound.currentTime = pos;
}

const introOps = {
  strings: [
    `Hey^80,^120 My Name is Mohamed Wajih Tagourty. 🖐`,
    `You can address me as <strong>Mohamed</strong> or <strong>Wajih</strong>. ^600\n You can also call me <b>hqshtag</b>^70,^130 that's my alias. 👾`,
    `I'm looking forward to getting to know you and I appreciate your interest,^300 Thanks^50!`,
  ],
  typeSpeed: 30,
  backSpeed: 4,
  startDelay: 800,
  backDelay: 800,
  onBegin: function (self) {
    keystrokeSound.currentTime = 0.04; //eating up some timelapses
    playSound();
    document.dispatchEvent(typingStarted);
  },
  preStringTyped: function (index, self) {
    if (index !== 0) playSound(); //no need for playing twice at first string
  },
  onStringTyped: function (index, self) {
    if (index === 1) {
      setSoundPos(3.3);
    } else stopSound();

    //resetSound();
  },

  onTypingPaused: function (pos, self) {
    stopSound();
  },
  onTypingResumed: function (pos, self) {
    playSound();
  },
  onComplete: function (self) {
    document.dispatchEvent(typingComplete);
  },
};

$(() => {
  console.log("Yay, a fellow developer! 🥳");
  console.log("Let's get in touche, and develop something together 🤝 ");
  console.log("I'll really appreciate your feedback");
  $(document).on("SOUND_LOADED", () => {
    $(".fulldisplaybutton").on("click", () => {
      console.log("on");
      //keystrokeSound.play();
      $(".fulldisplaybutton").fadeOut();
      $("#playBtn").hide();
      new Typed(".welcome-text", introOps);
    });
  });

  $(document).on("TYPING_STARTED", () => {
    console.time("TYPING DURATION");
  });

  $(document).on("TYPING_COMPLETE", () => {
    $("section.contact").addClass("showup");

    console.timeEnd("TYPING DURATION");
  });
});

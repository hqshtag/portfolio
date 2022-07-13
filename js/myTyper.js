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
  $('.notice>p').css('opacity', '1');
  $(".loading-screen").css('desplay', 'none');

});

keystrokeSound.addEventListener('canplay', (event)=> {
  $(".loading-screen").delay(250).queue(function(){
  //  $(this).css('display', 'none');
  $(this).css('opacity','0');

    $(this).dequeue();

    $('.notice>h3').css('opacity', '1');


});


})

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
    `Hey^80,^120 I'm a <span class="highlight"> Software Developer</span>. 🖐`,
    `You can address me as <span class="highlight">Mohamed</span> or <span class="highlight">Wajih</span>. ^600\n You can also call me <span class="highlight">hqshtag</span>^70,^130 That's my alias.`,
    `I'm <span class="highlight">looking forward </span> to getting to know you and  I appreciate your <span class="highlight">interest</span>,^300 Thanks^50!`,
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

    $("body").keypress(function(e) {
      $(".fulldisplaybutton").fadeOut();
      $("#playBtn").hide();
      new Typed(".welcome-text", introOps);
    });
    
    $(".fulldisplaybutton").on("click", () => {
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

    procedeureDanimation();


    console.timeEnd("TYPING DURATION");
  });
});

function procedeureDanimation(){
  //show up contact links
  $("section.contact").addClass("showup");


  //realign  & fadeout welcome text
  setTimeout(function() {
    $("h1.welcome-text").css('margin-top', "0");
    $("h1.welcome-text").css("opacity", "0");
   }, 2000);
  //display the name title header
  setTimeout(function() {
    $("div#IdHeader").css("top", "3rem");
      
    $("div#IdHeader>#name").css("opacity", "1");
    $("div#IdHeader>#title").css("opacity", "1");
    $("div#IdHeader>#description").css("opacity", "1");

  }, 3000);




}


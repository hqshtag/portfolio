$(() => {
  console.log("Yay, a fellow developer! 🥳");
  console.log("Let's get in touche, and develop something together 🤝 ");
  console.log("I'll really appreciate your feedback");

  $('body').mPageTransition({

    // the color valuethat the page will fade to
    color: "#722ACD",
  
    // animation speed in milliseconds
    fadeOutTime: 300,
    fadeInTime: 500
  
  });

  let animationDone = localStorage.getItem('typingAnimationDone');
  if(animationDone && animationDone == "true"){
    $(".fulldisplaybutton").fadeOut();
    //display the name title header

    $("div#IdHeader").css("top", "3rem");
    //show up contact links
    $("section.contact").addClass("showup");     

    $("div#IdHeader>#name").css("opacity", "1");
    $("div#IdHeader>#title").css("opacity", "1");
    $("div#IdHeader>#description").css("opacity", "1");

    $("div#IdHeader>.actions").addClass("appear");
  }
})
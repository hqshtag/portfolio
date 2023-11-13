$(() => {
  console.log("Yay, a fellow developer! 🥳");
  console.log("Let's get in touche, and code something together 🤝 ");
  //console.log("I'll really appreciate your feedback");

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

    $("div.actions").addClass("appear");
  }

  $('#messageMe').on('click', (event)=>{
    event.preventDefault();
    $('#myModal').addClass('show');

    return false;
  })

  $('#cancelMessage').on('click', (event)=>{
    event.preventDefault();
    $('#myModal').removeClass('show');

    return false;
  })


  let form = document.getElementById("contact-me-form");
    
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  async function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(data);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        new SnackBar({
          message: "Message Sent!",
          timeout: 1500,
          status: "info",
          position: isMobile ? 'bc' : 'br',
          width: isMobile && '80vw'

        });

        setTimeout(()=>{
          new SnackBar({
            message: "Thank you for reaching out!",
            timeout: 1800,
            position: isMobile ? 'bc' : 'br',
            width: isMobile && '80vw'

          });
        }, 2000)

        /*setTimeout(()=>{
          new SnackBar({
            message: "I shall contact you soon!",
            timeout: 2200,
            position: isMobile ? 'bc' : 'br',
            width: isMobile && '80vw'

          });
        }, 3000)*/

        form.reset()
        $('#myModal').removeClass('show');
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            let error = data['errors'][0];
            if(error.code === "TYPE_EMAIL"){
              new SnackBar({
                message: "Verify you entered a valid email",
                status: "warning",
                timeout: 2000,
                position: isMobile ? 'bc' : 'br',
                width: isMobile && '80vw'
              });
            } else {
              new SnackBar({
                message: error.message,
                status: "warning",
                timeout: 2000,
                position: isMobile ? 'bc' : 'br',
                width: isMobile && '80vw'
              });
            }
          
          } else {
            new SnackBar({
              message: "Oops! There was a problem submitting your form",
              status: "error",
              timeout: 2000,
              position: isMobile ? 'bc' : 'br',
              width: isMobile && '80vw'


          });
         
          }
        })
      }
    }).catch(error => {
      new SnackBar({
        message: "Oops! There was a problem submitting your form",
        status: "error",
        timeout: 2000,
        position: isMobile ? 'bc' : 'br',
        width: isMobile && '80%'

    });
    });
  }






  form.addEventListener("submit", handleSubmit)
})
const cardNumber = ['one', 'two', 'three', 'four'];
const keyWords = ['Professional', 'Projects', 'Skills', 'Education'];
    
$(() => {
  const BG_COLORS = ['103247', '23465b', '2b3a43', '183e65', '0d2139', '314951', '0c284b'];
  let currentIndex = 0;
  
  function changeBackgroundColor() {
      $('body').css('background-color', '#' + BG_COLORS[currentIndex]);
      $('main.explore-m').css('background-color', '#' + BG_COLORS[currentIndex]);
      //console.log('current background:', BG_COLORS[currentIndex])
      currentIndex = (currentIndex + 1) % BG_COLORS.length;
  }
  setInterval(changeBackgroundColor, 8000);
  
  
    $('body').mPageTransition({
  
      // the color valuethat the page will fade to
      color: "#00d0ff",
    
      // animation speed in milliseconds
      fadeOutTime: 300,
      fadeInTime: 300
    
    });

    appearCards();
    
    /**
     * 
     * 
        let circle = $('<div id="red-circle"></div>');
     
        $(this).append(circle);

        
        
        
        //use the circle coordinates to add a clickable span on top of it
        

        //add a click event to the span
        $('#red-circle').click(function () {
          $(this).css('opacity', '0');
        //find the selected card number
        const selectedCard = $('.card.selected').attr('class').split(' ')[1];
        //remove the selected class from the card
        $('.card.selected').removeClass('selected');

        const skip = selectedCard.split('-')[1];
        appearCards(skip);

        });

  //get the card title and passed to shortcut function to get the corresponding class
        let cardTitle = $(this).find('.card-title').text();
        let srt = shortcut(cardTitle);




       
        //display the positions above in the console

        console.log(srt);

       
     */

   

    //clicking a card will hide the cards and show the next one


    function cardClickHandler(card){
      $(card).addClass('selected');
      $(card).css('pointer-events', 'none');
      $(card).off('click');
      $('.cards').trigger('CARD_SELECTED', [card])
    }

    if(!isMobile()) {

      $('.cards').on('CARD_SELECTED', (evnt, elemt) => {

       // let cardTitle = $(elemt).find('.card-title').text();
       // whatWillHappen(whichIsWhich(cardTitle))

        const classess = $(elemt).attr('class').split(' ');
        for (let i = 0; i < cardNumber.length; i++) {
          if (classess[1] !== `card-${cardNumber[i]}`) {
            $(`.card-${cardNumber[i]}`).css('pointer-events', 'none').css('transition-duration', '700ms');
            $(`.card-${cardNumber[i]}`).removeClass('appear');
          }
        }

        let circle = $('<div id="red-circle"></div>');
        circle.click(function () {
          $(this).css('opacity', '0');
          $('.card.selected').css('pointer-events', 'none');
          const selectedCard = $('.card.selected').attr('class').split(' ')[1];
          $('.card.selected').removeClass('selected');
          
          const skip = selectedCard.split('-')[1];
          appearCards(skip);
          $('.cards').trigger('CARD_UNSELECTED', [elemt])


        });

        //set circle opacity to 1

        $(elemt).append(circle);

        delay(200, () => {
          circle.css('opacity', '1');
        });

      })


      $('.card').click(function (){
         cardClickHandler(this);
      });

      $('.cards').on('CARD_UNSELECTED', (evnt, elemt) => {
        //enable click handler on the card
        delay(800, () => {
          $(elemt).click(function (){
            cardClickHandler(this);
         });
        })
       

      })

     

       /* $('.card').mouseleave(function() {
         if($(this).hasClass('selected')) {
           $(this).removeClass('selected');
          const skip = $(this).attr('class').split(' ')[1].split('-')[1];
           appearCards(skip);
         }
        
       }) */
   

    }

    

    


  
    $(".explore-m>.actions").addClass("appear");
  
  });

  // Function to generate the HTML structure for a single event
function generateEvent(title, date, description) {
  return `
      <div class="event">
          <div class="title">${title}</div>
          <div class="date">${date}</div>
          <div class="description">${description}</div>
      </div>
  `;
}

  function whatWillHappen(result) {
    switch (result) {
        case 'Professional':
            console.log('Perform actions related to Professional');
            // Add your specific actions for the "Professional" keyword
            $('.timeline').css('visibility', "visible");
            $('.timeline').addClass('pro')

            const proEventsArray = [
              {
                title: 'UpWork ~ Top Rated',
                date: 'Aug 2019 - Present',
                description: 'Experienced Fullstack Developer with a proven track record, offering top-notch services in web, mobile, and desktop application development. Committed to client satisfaction with a diverse skill set and a history of successful projects.'
              },
              {
                title: 'Tutosh ~ Lead Software Developer',
                date: 'Nov 2022 - Aug 2023',
                description: 'I played a key role in collaborative development and feature maintenance. My focus involved working with microservices using NestJS in a Dockerized environment. Additionally, I contributed to the refactoring and integration of components and features within the Angular Invy framework. I demonstrated proficiency in managing deployments through Continuous Deployment and Integration (CDI) pipelines on AWS, ensuring smooth operations in both production and development environments.'
              },
              {
                title: 'Oxygen Media Group ~ Mobile & Web Developer',
                date: 'Apr 2021 - Oct 2021',
                description:  'I played a key role in developing versatile applications, leading the Financial Accounting app\'s ReactJS development and mentoring junior developers. I also contributed significantly to the Live Streaming Social Media App, enhancing Flutter functionalities with Agora RTC and integrating new features into the Laravel Backend. My work demonstrated adaptability, proficiency across diverse technologies, and a commitment to fostering a collaborative and innovative development environment.'
              }
            ]

            for (let i = 0; i < proEventsArray.length; i++) {
              const event = proEventsArray[i];
              const eventHTML = generateEvent(event.title, event.date, event.description);
              $('.timeline').append(eventHTML);
          }
            break;

        case 'Projects':
            console.log('Perform actions related to Projects');
            // Add your specific actions for the "Projects" keyword
            break;

        case 'Skills':
            console.log('Perform actions related to Skills');
            // Add your specific actions for the "Skills" keyword
            break;

        case 'Education':
            console.log('Perform actions related to Education');
            // Add your specific actions for the "Education" keyword
            break;

        case 'No corresponding keyword found':
            console.log('No corresponding keyword found. Handle accordingly.');
            // Add your handling for the case when no corresponding keyword is found
            break;

        default:
            console.log('Unexpected result');
            // Handle any unexpected result
            break;
    }
}


  //function to check if the user is on a mobile device
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  function appearCards(skipNumber){

    let cardNumberCopy = cardNumber;
    if(skipNumber) {
      cardNumberCopy = cardNumber.slice();
      cardNumberCopy.splice(cardNumberCopy.indexOf(skipNumber), 1);
    }
    $('.card').css('pointer-events', 'none');
    $('.card').css('transition-duration', '700ms');
    for (let i = 0; i < cardNumberCopy.length; i++) {
      if(!$(`.card-${cardNumberCopy[i]}`).hasClass('selected') && !$(`.card-${cardNumberCopy[i]}`).hasClass('appear')) {
        setTimeout(() => {
            $(`.card-${cardNumberCopy[i]}`).addClass('appear');
            delay(1000, () => {
              $(`.card-${cardNumberCopy[i]}`).css('pointer-events', 'auto');
            });
        }, (i+1) * (440 + i * 10));
      }
    }

     //once the cards are all visible
     setTimeout(() => {
      $('.card').css('pointer-events', 'auto');

      $('.card').css('transition-duration', '220ms');
    }, (cardNumber.length + 1) * (440 + cardNumber.length * 10));
  }

  //funciton delay with a callback function
  function delay(ms, callback) {
    setTimeout(callback, ms);
  }


  function whichIsWhich(title) {
    // Convert the title to lowercase for case-insensitive comparison
    const lowercaseTitle = title.toLowerCase();

    // Iterate through the keyWords array
    for (let i = 0; i < keyWords.length; i++) {
        // Convert the keyword to lowercase for case-insensitive comparison
        const lowercaseKeyword = keyWords[i].toLowerCase();

        // Check if the lowercase title contains the lowercase keyword
        if (lowercaseTitle.includes(lowercaseKeyword)) {
            return keyWords[i];
        }
    }

    // If no match is found
    return 'No corresponding keyword found';
}

  // a function to check what string was passed ('Experiences', 'Projects', 'Skills', 'Education') and return the corresponding class
  function shortcut(string) {
    switch (string) {
      case 'Experiences':
        return 'exp';
      case 'Projects':
        return 'pjt';
      case 'Skills':
        return 'skl';
      case 'Education':
        return 'edu';
    }
  }
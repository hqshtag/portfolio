const cardNumber = ['one', 'two', 'three', 'four'];
    
$(() => {

    $('body').mPageTransition({
  
      // the color valuethat the page will fade to
      color: "#722ACD",
    
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
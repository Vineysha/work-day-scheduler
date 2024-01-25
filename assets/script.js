const localeSettings = {};
  dayjs.locale(localeSettings);

  $(function () {
    
  // This will get the current hour of the day with the dayjs library

    const currentHour = dayjs().format('H');

  // This function will be able to change the color of the time blocks based on whether its past, present, or future

    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }

  // This will save the user's input to the localStorage when the save button is clicked

    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }

  // This will refresh the color of the time blocks to grey for past, red for present, and green for future depending on the current time 

    function refreshColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }

  // Takes the input from localStorage and sets textarea for the time blocks

    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
  //Display current date and time 
   
    function updateTime() {
      const dateElement = $('#date');
      const timeElement = $('#time');
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');
      const currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
    
    hourlyColor();
    textEntry();                
    refreshColor();
    
  // Updates the time per second

    setInterval(updateTime, 1000);
  });
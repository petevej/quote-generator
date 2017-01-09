$(document).ready(function() {                          // fire upon page ready
  $('#newQuote').on('click', function(e) {              // add event listener for when the newQuote button is pressed
    e.preventDefault();                                 // prevent default function
    var url = "http://api.forismatic.com/api/1.0/";     // API for quote matchine
    var $content = $('#quoteContent');                  // cache content section to DOM
    var $source = $('#quoteSource');                    // cache source section to DOM
    var quoteTweet = '';                                // initialize empty quote var for tweet button
    var sourceTweet = '';                               // same for source var

    // remove current texts
    $('#quoteContent p').remove();
    $('#quoteSource p').remove();
    // ajax GET procedure
    $.ajax({
      type: "GET",
      url: url,
      jsonp: "jsonp",
      dataType: "jsonp",
      // forismatic API requires these additional selections
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      // update source and content in html
      success: function(data) {
        $content.prepend('<p><em>' + data.quoteText + '</em></p>').hide().fadeIn(700);          // inject quote into the content div with transition
        $source.prepend('<p> - ' + data.quoteAuthor + '</p>').hide().fadeIn(700);               // inject source
        saveQuote(data.quoteText);                                                              // save quote
        saveSource(data.quoteAuthor);                                                           // save source
        // remove button
        $('.twitter-share-button').remove();                                                    // remove tweet button
        // crate new button with right attr
        var newTweet = $('<a></a>')
            .addClass('twitter-share-button')
            .attr('href', 'http://twitter.com/share')
            .attr('data-url', '1')
            .attr('data-text', quoteTweet)
            .attr('data-hashtags', sourceTweet)
            .attr('data-via', 'petevejanurug')
            .attr('data-count', 'none');
        $('#quoteText').append(newTweet);                                                      // append to the text section
        twttr.widgets.load();                                                                  // reload twitter widgets IMPORTANT
      },
      fail: function() {
        alert('Quote got stuck in the pipe, check your connection!');
      }
    });
      function saveQuote(data){
        if(data.length > 100) {
          // trim to 100 characters
          data = data.substr(0, 100);
          // re-trim if in the middle of a word
          data = data.substr(0, Math.min(data.length, data.lastIndexOf(" ")));
          // add elipses if longer than 100 characters
          quoteTweet = data + "...";
        } else {
          // otherwise save full text
          quoteTweet = data;
        }
      }
      function saveSource(data){
        // get rid of space in between first and last name of author
        sourceTweet = data.replace(/ +/g, "");
      }
  });
});

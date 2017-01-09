$(document).ready(function() {
  $('#newQuote').on('click', function(e) {
    e.preventDefault();
    var url = "http://api.forismatic.com/api/1.0/";
    var $content = $('#quoteContent');
    var $source = $('#quoteSource');
    var quoteTweet = '';
    var sourceTweet = '';

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
        $content.prepend('<p><em>' + data.quoteText + '</em></p>').hide().fadeIn(700);
        $source.prepend('<p> - ' + data.quoteAuthor + '</p>').hide().fadeIn(700);
        saveQuote(data.quoteText);
        saveSource(data.quoteAuthor);
        // remove button
        $('.twitter-share-button').remove();
        // crate new button with right attr
        var newTweet = $('<a></a>')
            .addClass('twitter-share-button')
            .attr('href', 'http://twitter.com/share')
            .attr('data-url', '1')
            .attr('data-text', quoteTweet)
            .attr('data-hashtags', sourceTweet)
            .attr('data-via', 'petevejanurug')
            .attr('data-count', 'none');
        $('#quoteText').append(newTweet);
        twttr.widgets.load();
        // reload twitter widget
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
          quoteTweet = data + "...";
        } else {
          quoteTweet = data;
        }  
      }
      function saveSource(data){
        sourceTweet = data.replace(/ +/g, "");
      }
  });
});

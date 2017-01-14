// quote API
$(document).ready(function() {                          // fire upon page ready
  $('#newQuote').on('click', function(e) {              // add event listener for when the newQuote button is pressed
    e.preventDefault();                                 // prevent default function
    var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?';      // API for quote matchine
    var $quoteBox = $('#quoteBox');                     // cache jumbotron box to DOM
    var $content = $('#quoteContent');                  // cache content section to DOM
    var $source = $('#quoteSource');                    // cache source section to DOM
    var quoteTweet = '';                                // initialize empty quote var for tweet button
    var sourceTweet = '';                               // same for source var

    $('#quoteContent p').remove();                      // remove current texts
    $('#quoteSource p').remove();
    // ajax GET procedure
    $.getJSON(url, function(data) {
        $quoteBox.hide().fadeIn(1000);
        $content.prepend('<p><em>' + data.quoteText + '</em></p>').hide().fadeIn(1200);          // inject quote into the content div with transition
        $source.prepend('<p> - ' + data.quoteAuthor + '</p>').hide().fadeIn(1200);               // inject source
        saveQuote(data.quoteText);                                                              // save quote
        saveSource(data.quoteAuthor);                                                           // save source
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
      });
      function saveQuote(data){
        if(data.length > 100) {
          data = data.substr(0, 100);                                                         // trim to 100 characters
          data = data.substr(0, Math.min(data.length, data.lastIndexOf(" ")));                // re-trim if in the middle of a word
          quoteTweet = data + "...";                                                          // add elipses if longer than 100 characters
        } else {
          quoteTweet = data;                                                                  // otherwise save full text
        }
      }
      function saveSource(data){
        sourceTweet = data.replace(/ +/g, "");                                                // get rid of space in between first and last name of author
      }
  });
});

// Twitter JS share widget code
	window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
  t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

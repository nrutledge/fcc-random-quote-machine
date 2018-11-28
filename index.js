// Remove highlighting effect on button (it's ugly)
$('.btn').mouseup(function() {
  this.blur();
});

////////////////////////////////////////////////
//  Center main container vertically on screen
////////////////////////////////////////////////
function centerVertically() {
  var marginTop = $(window).height() / 2 - 160; 
  
  if (marginTop >= 30) {
    $('#main').css('padding-top', marginTop + 'px');
  }
}

// Center vertically on load and resize
$(document).ready(centerVertically);
$(window).resize(centerVertically);


////////////////////////////////////////////////
//  Get quote via API and display in quote box
////////////////////////////////////////////////

// Callback function for getQuote function
function displayQuote(response) {
  var quote = response.quoteText;
  var author = response.quoteAuthor;
  // Log quote
  console.log(response);
  
  // Display quote text in quote box
  $('#quote').html(quote);
  $('#author').html(author); 
 
  // Update quote and author text for url in Tweet button link 
  if (quote.length + author.length > 133) {
    quote = quote.slice(0, 134 - author.length) + '...';
  }
  // Encode quote text for URL
  quote = quote.replace(/;/g, '-')
  quote = encodeURI(quote);
  // Encode author text for URL if it exists
  if (author !== '') {
    author = '- ' + encodeURI(author);
  }
  
  // Update twitter button link to include quote
  $('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?text=' + quote + '%0D' + author);
}

// Get quote from forismatic API
function getQuote() {
  $.ajax({
    method: 'GET',
    url: 'https://api.forismatic.com/api/1.0/',
    dataType: 'jsonp',
    format: 'jsonp',
    jsonp: 'jsonp',
    jsonpCallback: 'displayQuote', 
    data: {
      method: 'getQuote',
      format: 'jsonp',
      lang: 'en'
    }
  });
}

// Get and display quote when page loads
$(document).ready(function() {
  getQuote();                  
});
// Get and display quote when button clicked
$('#btn-generate-quote').click(function() {
  getQuote();
});


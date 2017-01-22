(function() {
  var queries = window.location.search.substr(1).split('&'),
    queryObj = [];
  queries.forEach(function(query) {
    var key = query.split('=')[0],
      value = query.split('=')[1];
    queryObj[key] = value;
  })
  var tag = queryObj.tag;
  $('.tag-posts').each(function() {
    if ($(this).attr('id').substr(4) !== decodeURI(tag)) {
      $(this).hide();
    }
  });
})();

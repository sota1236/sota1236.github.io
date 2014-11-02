(function() {
  var feeds, init, urls;

  google.load("feeds", 1);

  urls = ["http://sota1235.com/feed.xml", "https://github.com/sota1235.atom"];

  feeds = [];

  init = function() {
    var feed, url, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = urls.length; _i < _len; _i++) {
      url = urls[_i];
      feed = new google.feeds.Feed(url);
      _results.push(feed.load(function(result) {
        var entry, i, _j, _ref, _results1;
        if (result.error) {
          console.log(error);
        }
        _results1 = [];
        for (i = _j = 0, _ref = result.feed.entries.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
          entry = result.feed.entries[i];
          _results1.push(feeds.push({
            'site': result.feed.title,
            'title': entry.title,
            'link': entry.link,
            'content': entry.contentSnippet.substr(0, 20),
            'date': entry.publishedDate
          }));
        }
        return _results1;
      }));
    }
    return _results;
  };

  google.setOnLoadCallback(init);

}).call(this);

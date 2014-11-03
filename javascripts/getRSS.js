(function() {
  var init, makeActivity, urls;

  google.load("feeds", 1);

  urls = {
    "github": "https://github.com/sota1235.atom",
    "blog": "http://sota1235.com/feed.xml"
  };

  init = function(url) {
    return new Promise(function(resolve, reject) {
      var feed, feeds;
      feed = new google.feeds.Feed(url);
      feeds = [];
      return feed.load(function(result) {
        var entry, i, _i;
        if (result.error) {
          reject(error);
        }
        for (i = _i = 0; _i <= 5; i = ++_i) {
          entry = result.feed.entries[i];
          if (!entry) {
            break;
          }
          feeds.push({
            'link': entry.link,
            'title': entry.title,
            'content': entry.contentSnippet,
            'date': entry.publishedDate
          });
        }
        return resolve(feeds);
      });
    });
  };

  makeActivity = function(class_name, feeds) {
    var content, feed, root, span, title, _i, _len, _results;
    $(class_name + " .loader").fadeOut(1000);
    $(class_name).append($('<div class="activity"></div>'));
    _results = [];
    for (_i = 0, _len = feeds.length; _i < _len; _i++) {
      feed = feeds[_i];
      root = $(class_name + " .activity");
      root.hide();
      title = $('<a class="activity_title"></div>').attr('href', feed.link).text(feed.title);
      span = $('<span class="activity_date"></div>').text(feed.date);
      content = $('<div class="activity_content"></div>').text(feed.content);
      root.append(title).append(span).append(content);
      _results.push(setTimeout(function() {
        return root.show();
      }, 1000));
    }
    return _results;
  };

  google.setOnLoadCallback(function() {
    return init(urls["github"]).then(function(result) {
      console.log("Get feed from github is completed");
      makeActivity(".github_activity", result);
    }).then(function(result) {
      return init(urls["blog"]);
    }).then(function(result) {
      console.log("Get feed from blog is copmleted");
      makeActivity(".blog_activity", result);
    })["catch"](function(error) {
      return console.error(error);
    });
  });

}).call(this);

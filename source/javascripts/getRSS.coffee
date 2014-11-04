google.load "feeds", 1

urls =
  "github": "https://github.com/sota1235.atom"
  "blog"  : "http://sota1235.com/feed.xml"

init = (url) ->
  dfd = $.Deferred()
  feed = new google.feeds.Feed url
  feeds = []
  feed.load (result) ->
    if result.error
      dfd.reject error
    for i in [0..5]
      entry = result.feed.entries[i]
      if !entry
        break
      feeds.push
        'link'   : entry.link
        'title'  : entry.title
        'content': entry.contentSnippet + '...'
        'date'   : entry.publishedDate
    dfd.resolve feeds
  return dfd.promise()

makeActivity = (class_name, feeds) ->
  $(class_name + " .loader").fadeOut 1000
  $(class_name)
    .append $('<div class="activity"></div>')
  for feed in feeds
    root = $(class_name + " .activity")
    root.hide()
    title = $('<a class="activity_title"></div>')
      .attr 'href', feed.link
      .text feed.title
    span = $('<span class="activity_date"></div>')
      .text feed.date
    content = $('<div class="activity_content"></div>')
      .text feed.content
    root
      .append title
      .append span
      .append content
    setTimeout () ->
      root.show()
    , 1000

google.setOnLoadCallback () ->
  init urls["github"]
    .then (result) ->
      console.log "Get feed from github is completed"
      makeActivity ".github_activity", result
      return
    .then (result) ->
      init urls["blog"]
    .then (result) ->
      console.log "Get feed from blog is copmleted"
      makeActivity ".blog_activity", result
      return
    .fail (error) ->
      console.error error

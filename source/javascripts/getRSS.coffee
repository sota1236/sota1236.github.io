google.load "feeds", 1

urls = [
  "http://sota1235.com/feed.xml"
  "https://github.com/sota1235.atom"
]
feeds = []

init = () ->
  for url in urls
    feed = new google.feeds.Feed url
    feed.load (result) ->
      if result.error
        console.log error
      for i in [0..result.feed.entries.length - 1]
        entry = result.feed.entries[i]
        feeds.push
          'site'   : result.feed.title
          'title'  : entry.title
          'link'   : entry.link
          'content': entry.contentSnippet.substr 0, 20
          'date'   : entry.publishedDate

google.setOnLoadCallback init

(function(){var t,e,o;google.load("feeds",1),o={github:"https://github.com/sota1235.atom",blog:"http://sota1235.com/feed.xml",gyazz:"http://gyazz.masuilab.org/sota1235/rss.xml"},t=function(t){var e,o,n;return e=$.Deferred(),setTimeout(function(){return e.resolve(!1),e.promise()},3e3),o=new google.feeds.Feed(t),n=[],o.load(function(t){var o,i,r;for(t.error&&e.reject(error),i=r=0;5>=r&&(o=t.feed.entries[i],o);i=++r)n.push({link:o.link,title:o.title,content:o.contentSnippet+"...",date:o.publishedDate});return e.resolve(n)}),e.promise()},e=function(t,e){var o,n,i,r,a,l,c,s;if($(t+" .loader").fadeOut(1e3),!e)return void $(t).text("Gettting feeds failed...");for($(t).append($('<div class="activity"></div>')),a=[],i=0,r=e.length;r>i;i++)n=e[i],l=$(t+" .activity"),l.hide(),s=$('<a class="activity_title"></div>').attr("href",n.link).text(n.title),c=$('<span class="activity_date"></div>').text(n.date),o=$('<div class="activity_content"></div>').text(n.content),l.append(s).append(c).append(o),a.push(setTimeout(function(){return l.show()},1e3));return a},google.setOnLoadCallback(function(){return t(o.github).then(function(t){console.log("Get feed from github completed"),e(".github_activity",t)}).then(function(){return t(o.blog)}).then(function(t){console.log("Get feed from blog copmleted"),e(".blog_activity",t)}).then(function(){return t(o.gyazz)}).then(function(t){console.log("Get feed from gyazz/sota1235 completed"),e(".gyazz_activity",t)}).fail(function(t){return console.error(t)})})}).call(this);
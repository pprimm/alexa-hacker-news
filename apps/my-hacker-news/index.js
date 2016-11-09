var alexa = require('alexa-app');
var scraperjs = require('scraperjs');

var latestHNews = {
  timeStamp: Date.now(),
  newsItems: {}
};

// Allow this module to be reloaded by hotswap when changed
module.change_code = 0;

// Define an alexa-app
var app = new alexa.app('my-hacker-news');

app.launch(function(req,res) {
  res.say('Here are the latest hacker news .');
  scraperjs.StaticScraper.create('https://news.ycombinator.com/')
    .scrape(function($) {
      return $(".title a").map(function() {
        return $(this).text();
      }).get();
    })
    .then(function(news) {
      latestHNews.timeStamp = Date.now();
      latestHNews.newsItems = news;
      //console.log(latestHNews.timeStamp);
      //console.log(latestHNews.newsItems);
      //res.say('Done retrieveing results.').send();
      console.log();
      console.log('Post number one. ' + latestHNews.newsItems[0]);
      console.log('Post number two. ' + latestHNews.newsItems[2]);
      console.log('Post number three. ' + latestHNews.newsItems[4]);
      console.log('Post number four. ' + latestHNews.newsItems[6]);
      console.log('Post number five. ' + latestHNews.newsItems[8]);

      res.say('<p>Post number one. ' + latestHNews.newsItems[0] + '.</p>')
      .say('<p>Post number two. ' + latestHNews.newsItems[2] + '.</p>')
      .say('<p>Post number three. ' + latestHNews.newsItems[4] + '.</p>')
      .say('<p>Post number four. ' + latestHNews.newsItems[6] + '.</p>')
      .say('<p>Post number five. ' + latestHNews.newsItems[8] + '.</p>')
      .send();
      return true;
    });
    return false;
});

app.intent('LatestIntent', {
    "slots":{},
    "utterances":['read the latest news']
  },function(req,res) {
    res.say('You asked me to read the latest news');
  }
);

/*
https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference
*/
app.intent('ItemIndex', {
    "slots":{"ITEM":"NUMBER"},
    "utterances":['read news item number {1-10|ITEM}']
  },function(req,res) {
    res.say('You asked me to <w role="ivona:VB">read</w> news item number '+req.slot('ITEM'));
  }
);

module.exports = app;

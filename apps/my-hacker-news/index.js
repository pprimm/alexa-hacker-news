var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 0;

// Define an alexa-app
var app = new alexa.app('my-hacker-news');

app.launch(function(req,res) {
  res.say('Welcome to my hacker news service');
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

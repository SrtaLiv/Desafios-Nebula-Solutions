require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi(process.env.X_BEARER_TOKEN);

async function tweet(text) {
  return twitterClient.v2.tweet(text);
}
module.exports = { tweet };
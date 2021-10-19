import tweepy

import keys

#informazioni di accesso
consumer_key = keys.consumer_key()
consumer_secret = keys.consumer_secret()
access_token = keys.access_token()
access_token_secret = keys.access_token_secret()
#autorizzazione via tweepy
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
#oggetto API per interazione con twitter
api = tweepy.API(auth)
print(type(api))
public_tweets: tweepy.models.ResultSet = api.home_timeline()
print(type(public_tweets))
for tweet in public_tweets:
    #print(type(tweet))
    """print('////////////////////////////////////////')
    print(tweet.user.screen_name)
    print(tweet.text)
    print('////////////////////////////////////////', end='\n\n')"""

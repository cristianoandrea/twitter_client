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
#public_tweets: tweepy.models.ResultSet = api.home_timeline()

#tweet_mode = extended così da ottenere i tweet senza testo troncato
public_tweets = api.search_tweets('Roma', tweet_mode='extended')
#public_tweets = tweepy.Cursor(api.search, q='Roma').items(15)
tot = 0
done = False
for tweet in public_tweets:
    print('////////////////////////////////////////')
    print('url: ', tweet.user.screen_name, '/status/', tweet.id, sep='')
    #quando fai la richiesta con tweet_mode=extended il testo sta nel campo full_text
    print(tweet.full_text)
    #se è un retweet (<=> il testo inizia con RT) è definito la proprietà retweeted_status
    #e il testo del tweet originale sta dentro a full_text (credo debba essere text se non
    #si usa tweet_mode='extended' nella richiesta)
    try:
        print(tweet.retweeted_status.full_text)
    #se non è un retweet retweeted_status non è definito e si entra qui dentro
    except Exception as e:
        print(e)
    print('////////////////////////////////////////')
    print('\n\n')

    tot += 1

print('trovati', tot, 'tweets')

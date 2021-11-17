import tweepy

import keys

MAX_TWEETS = 100


def jsonify(tweets):
    for tweet in tweets:
        pass


def printTweet(tweet):
    print('////////////////////////////////////////')
    print(f'@{tweet.user.screen_name}')
    #quando fai la richiesta con tweet_mode=extended il testo sta nel campo full_text
    try:
        print(f'è un retweet di @{tweet.retweeted_status.user.screen_name}')
        print(tweet.retweeted_status.full_text)
    #se non è un retweet retweeted_status non è definito e si entra qui dentro
    except AttributeError:
        print(tweet.full_text)
    print('////////////////////////////////////////')
    print(end='\n\n')


#autorizzazione via tweepy con informazioni di accesso
auth = tweepy.OAuthHandler(keys.consumer_key(), keys.consumer_secret())
auth.set_access_token(keys.access_token(), keys.access_token_secret())
#oggetto API per interazione con twitter
api = tweepy.API(auth)
#public_tweets: tweepy.models.ResultSet = api.home_timeline()


while True:
    print('Inserisci una stringa da cercare (% per uscire)')
    keyword = input()
    if keyword == '%':
        break
    #questo evita di ritornare tweet che contengono la keyword nello username del twittatore
    keyword += f'-from:{keyword}'
    #tweet_mode = extended così da ottenere i tweet senza testo troncato
    public_tweets = api.search_tweets(keyword, tweet_mode='extended', count=100)
    for tweet in public_tweets:
        if keyword in tweet.user.screen_name:
            print(f'LA KEYWORD STA NELLO USERNAME PD [{tweet.user.screen_name}]')
            printTweet(tweet)
            break
        else:
            printTweet(tweet)
    print(f'scaricati in tutto {len(public_tweets)} tweet')


def search_by_content(content: str, amount: int=MAX_TWEETS):
    query = content + f'-from:{content}'
    found_tweets = api.search_tweets(query, tweet_mode='extended', count=amount)
    return found_tweets


def search_by_username(username: str, amount: int=MAX_TWEETS):
    query = f'from:{username}'
    found_tweets = api.search_tweets(query, tweet_mode='extended', count=amount)
    return found_tweets

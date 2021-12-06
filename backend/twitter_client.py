import tweepy

import keys

MAX_TWEETS = 100


def is_retweet(tweet) -> bool:
    """ Ritorna True tweet è lo status di un retweet,
        False altrimenti"""
    try:
        #prova a sollevare un'eccezione accedendo a campi definiti
        #sse si tratta di un retweet
        tweet.retweeted_status.full_text
        return True
    #se non è un retweet retweeted_status non è definito e si entra qui dentro
    except AttributeError:
        return False


def dictify_user(user) -> dict:
    """ Ritorna una rappresentazione in forma di dizionario di python
        del record di user ottenuto dallo status di un tweet"""
    user_dict = { }
    user_dict['screen_name'] = user.screen_name
    user_dict['profile_image_url_https'] = user.profile_image_url_https
    return user_dict


def dictify_single_tweet(tweet) -> dict:
    """ Ritorna una rappresentazione in forma di dizionario di python
        dello status di tweet"""
    tweet_dict = { }
    tweet_dict['user'] = dictify_user(tweet.user)
    if is_retweet(tweet):
        tweet_dict['retweeted_status'] = dictify_single_tweet(tweet.retweeted_status)
    else:
        tweet_dict['full_text'] = tweet.full_text

    return tweet_dict


def listify_tweets(tweets) -> list[dict]:
    """ Ritorna una rappresentazione in forma di lista di tweets"""
    tweets_list = []

    for tweet in tweets:
        tweet_dict = dictify_single_tweet(tweet)
        tweets_list.append(tweet_dict)

    return tweets_list


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

def inutile():
    #while True:
    #    print('Inserisci una stringa da cercare (% per uscire)')
    #    keyword = input()
    #    if keyword == '%':
    #        break
    #    #questo evita di ritornare tweet che contengono la keyword nello username del twittatore
    #    keyword += f'-from:{keyword}'
    #    #tweet_mode = extended così da ottenere i tweet senza testo troncato
    #    public_tweets = api.search_tweets(keyword, tweet_mode='extended', count=100)
    #    for tweet in public_tweets:
    #        if keyword in tweet.user.screen_name:
    #            print(f'LA KEYWORD STA NELLO USERNAME PD [{tweet.user.screen_name}]')
    #            printTweet(tweet)
    #            break
    #        else:
    #            printTweet(tweet)
    #    print(f'scaricati in tutto {len(public_tweets)} tweet')
    pass


def search_by_content(content: str, amount: int = MAX_TWEETS) -> dict[dict]:
    """ Interroga l'API di twitter per la ricerca di tweet che nel loro testo
        includono content. Il numero di tweet richiesti è specificato da amount
        settato di default a MAX_TWEETS, il massimo; qualsiasi quantitativo
        superiore sarà limitato a MAX_TWEETS.
        I tweets sono ritornati in una lista sottoforma di dizionario"""
    query = content + f'-from:{content} -filter:retweets'
    found_tweets = api.search_tweets(query, tweet_mode='extended', count=amount)
    return listify_tweets(found_tweets)


def search_by_username(username: str, amount: int = MAX_TWEETS) -> dict[dict]:
    """ Interroga l'API di twitter per la ricerca di tweet postati dall'account
        username. Il numero di tweet richiesti è specificato da amount
        settato di default a MAX_TWEETS, il massimo; qualsiasi quantitativo
        superiore sarà limitato a MAX_TWEETS.
        I tweets sono ritornati in una lista sottoforma di dizionario"""
    query = f'from:{username} -filter:retweets'
    found_tweets = api.search_tweets(query, tweet_mode='extended', count=amount)
    return listify_tweets(found_tweets)

from crypt import methods
import flask as fl
from flask import jsonify
from flask_cors import CORS
import os
import stream as s
from info import data
import twitter_client as tc
import trivia
import contest
import threading

FRONT_DIR = '../frontend/'
CONTENT_MODE = 'content'
USER_MODE = 'user'
PLACE_MODE='place'
BUILD_DIR = '../frontend/build/'
server = fl.Flask(__name__, template_folder=FRONT_DIR, static_folder=BUILD_DIR)
#serve per eliminare i problemi di richieste a porte diverse in fase
#di testing
CORS(server)
server.config['CORS_HEADERS'] = 'Content-Type'

class Thread (threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)

    def run(self, query):
        s.use_stream(query)



@server.route('/', defaults={'path': ''})
@server.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(server.static_folder + '/' + path):
        return fl.send_from_directory(server.static_folder, path)
    else:
        return fl.send_from_directory(server.static_folder, 'index.html')


@server.route('/tweets', methods=['GET'])
def tweets():
    """ Endpoint di API per la richiesta dei tweet da parte dei clients.
        Il parametro query mode specifica che tipo di ricerca va fatta (tra
        content, user).
        Il parametro query by specifica il contenuto sulla base del quale
        va fatta la richiesta"""
    mode = fl.request.args.get('mode')
    query = fl.request.args.get('by')
    amount = fl.request.args.get('amount')
    print(f'mode={mode}', f'query={query}', f'amount={amount}')
    if amount == None or amount == '':
        amount = tc.MAX_TWEETS

    if not mode:
        pass
    if mode == CONTENT_MODE:
        content = tc.search_by_content(query, amount)
    elif mode == USER_MODE:
        content = tc.search_by_username(query, amount)
    elif mode == PLACE_MODE:
        content = tc.search_by_geotag(query, amount)

    return fl.jsonify(content)


@server.route('/stream', methods=['GET'])
def stream():
    t=Thread()
    query=fl.request.args.get('by')
    t.run(query)
    
@server.route('/data')
def stream_data():
    try:
        new_data=[]
        for tweet in data:
            print(tweet.text)
            tweets.append(tweet)

        global prev_list
        if prev_list == []:
            prev_list = new_data[:]
            return jsonify(new_data)
        else:
            d = []
            for item in new_data:
                if item not in prev_list:
                    d.append(item)
            prev_list = new_data[:]
            return jsonify(d)
    except Exception:
        pass


@server.route('/question', methods=['POST'])
def post_question():
    quiz = fl.request.form.get('quiz')
    right = fl.request.form.get('right')
    wrongs = fl.request.form.getlist('wrongs[]')
    new_question = trivia.add_question(quiz, right, wrongs)

    response = {}
    response['id'] = new_question.id
    response['suggested_text'] = new_question.suggested_text
    return response


@server.route('/answers', methods=['GET'])
def get_number_of_answers():
    trivia_id = fl.request.args.get('triviaId')
    how_many = -1
    if trivia.is_registered(trivia_id):
        answers = tc.search_by_content(f'{trivia.ANSWER_TAG} #{trivia_id}')
        how_many = len(answers)

    return str(how_many)


@server.route('/score', methods=['GET'])
def score_of():
    username = fl.request.args.get('username')
    answers = tc.search_by_username_with_content(username, trivia.ANSWER_TAG)
    return str(trivia.total_score(answers))


@server.route('/myAnswers', methods=['GET'])
def answers_of():
    username = fl.request.args.get('username')
    answers = tc.search_by_username_with_content(username, trivia.ANSWER_TAG)
    return fl.jsonify(answers)


@server.errorhandler(404)
def not_found():
    """Page not found."""
    return fl.make_response(
        fl.render_template("404.html"),
        404
    )

@server.route('/tales', methods=['POST'])
def post_tale():
    creator: str = fl.request.form.get('creator')
    text: str = fl.request.form.get('text')
    new_tale: str = contest.register_tale(creator, text)
    return new_tale.toDict()


@server.route('/contests/tales', methods=['POST'])
def add_tale_to_contest():
    tale_id: int = int(fl.request.form.get('tale'))
    contest_id: int = int(fl.request.form.get('contest'))
    retVal = None
    #controllare che gli id siano registrati
    if contest.is_tale_registered(tale_id) and contest.is_contest_registered(contest_id):
        contest.add_tale_to(tale_id, contest_id)
        retVal = True
    else:
        retVal = False

    return fl.jsonify(retVal)


if __name__ == '__main__':
    server.run()

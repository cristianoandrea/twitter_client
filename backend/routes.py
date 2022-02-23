import flask as fl
from flask_cors import CORS
import os

import twitter_client as tc
import trivia
import contest


FRONT_DIR = '../frontend/'
CONTENT_MODE = 'content'
USER_MODE = 'user'
BUILD_DIR = '../frontend/build/'
server = fl.Flask(__name__, template_folder=FRONT_DIR, static_folder=BUILD_DIR)
#serve per eliminare i problemi di richieste a porte diverse in fase
#di testing
CORS(server)


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

    return fl.jsonify(content)


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


@server.route('/contests', methods=['POST'])
def post_contest():
    organizer = fl.request.form.get('organizer')
    name = fl.request.form.get('name')
    new_contest = contest.register_contest(organizer, name)
    return new_contest.toDict()


@server.route('/contests', methods=['GET'])
def get_contests():
    return fl.jsonify(contest.get_contest_list(True))


@server.route('/contests/votes', methods=['GET'])
def get_votes_of():
    contest_id: str = fl.request.args.get('contest')
    tweets = tc.search_votes(contest_id)
    obj = contest.make_vote_object(int(contest_id), tweets)
    print(obj)
    return obj


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


@server.errorhandler(404)
def not_found():
    """Page not found."""
    return fl.make_response(
        fl.render_template("404.html"),
        404
    )


if __name__ == '__main__':
    server.run()

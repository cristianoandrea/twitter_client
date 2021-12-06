import flask as fl
from flask_cors import CORS
import os

import twitter_client as tc

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


@server.errorhandler(404)
def not_found():
    """Page not found."""
    return fl.make_response(
        fl.render_template("404.html"),
        404
    )


if __name__ == '__main__':
    server.run()

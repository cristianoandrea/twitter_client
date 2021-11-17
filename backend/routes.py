import flask as fl
import twitter_client as tc

FRONT_DIR = '../frontend/'
server = fl.Flask(__name__, template_folder=FRONT_DIR)


@server.route('/', methods=['GET'])
def home():
    return fl.render_template("main_page.html")


@server.route('/styles/<string:fileName>', methods=['GET'])
def style(fileName: str):
    try:
        return fl.send_from_directory(FRONT_DIR, fileName, as_attachment=True)
    except FileNotFoundError:
        fl.abort(404)


@server.route('/tweets', methods=['GET'])
def tweets():
    headers = {"Content-Type": "application/json"}
    content = tc.search_by_content('')
    return make_response(
        'Tweets found',
        200,
        content
    )


@server.errorhandler(404)
def not_found():
    """Page not found."""
    return fl.make_response(
        fl.render_template("404.html"),
        404
    )


if __name__ == '__main__':
    server.run()

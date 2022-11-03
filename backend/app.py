from flask import Flask, jsonify, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text(100))
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


db.init_app(app=app)

class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/set-table', methods=['GET'])
def create_table():
    db.create_all()
    return jsonify({"Table": "Created"})


@app.route('/', methods=['GET'])
def home_view():
    return jsonify({"Hello": "World"})

@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Article.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)

@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Article.query.get(id)
    return article_schema.jsonify(article)

@app.route('/add', methods=['POST', 'GET'])
def add_articles():

    if request.method == "POST":
        title = request.json['title']
        body = request.json['body']

        articles = Article(title, body)
        db.session.add(articles)
        db.session.commit()
        return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Article.query.get(id)

    title = request.json['title']
    body = request.json['body']

    article.title = title
    article.body = body

    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def article_delete(id):
    article = Article.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)
    

if __name__=="__main__":
    app.run(debug=True)
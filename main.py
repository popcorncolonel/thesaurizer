import re
import os
import json
import urllib
import random
import jinja2
import webapp2
import urllib2
import logging

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


def thesaurize(word):
    try:
        response = urllib2.urlopen('http://words.bighugelabs.com/api/2/f42ad92ef7fc3e15b479c2e6b15fe62a/'+word+'/json').read()
    except urllib2.HTTPError:
        logging.info('error due to: ' + word)
        return word # error => couldn't find a synonym
    response = json.loads(response)
    suggestions = []
    for part_of_speech in response:
        try:
            for suggestion in response[part_of_speech]['syn']: 
                #TODO: Maybe only include single word synonyms in the possible suggestions?
                suggestions.append(suggestion)
        except KeyError:
            try:
                for suggestion in response[part_of_speech]['sim']: 
                    suggestions.append(suggestion)
            except KeyError:
                pass
    return random.choice(suggestions) or word

class Convert(webapp2.RequestHandler):
    def post(self):
        text = self.request.get('text', '')
        word_list = text.split()
        converted_word_list = [thesaurize(word) for word in word_list]
        converted_text = " ".join(converted_word_list)
        self.response.write(converted_text)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        template_values = {}
        self.response.write(template.render(template_values))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/convert', Convert)
], debug=True)

from flask import Flask
from flask import request
import NLP as NLP
import json

app = Flask(__name__)

@app.route('/', methods = ['POST'])
def getSummary():
    if request.method == 'POST':
        body = request.data
        response = ''

        try:
            nlp = NLP.NLP(str(body))
            response = json.dumps({
                "Summary": str(nlp.summary)
            })
        except Exception as e:
            print(str(e))
            response = json.dumps({
                "Summary": "Something went wrong."
            })

        return response

app.run(host='0.0.0.0', debug=True, port=8000)

"""

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, world!')

    def do_POST(self): 
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        self.send_response(200)
        self.end_headers()
        response = BytesIO()
        
        try:
            nlp = NLP.NLP(str(body))
            summary = json.dumps({
                "Summary": str(nlp.summary) 
                })
            response.write(summary.encode())
        except Exception as e:
            response.write
                json.dumps({
                    "Error":str(e).encode() 
                }))
        self.wfile.write(response.getvalue())

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

httpd = HTTPServer(('localhost', 8000), CORSRequestHandler)

httpd.serve_forever()
"""
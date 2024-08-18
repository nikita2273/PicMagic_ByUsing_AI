from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def home():
    # Fetch a random dog image
    response = requests.get('https://dog.ceo/api/breeds/image/random')
    data = response.json()
    dog_image_url = data['message']
    
    return render_template('index.html', dog_image_url=dog_image_url)

if __name__ == "__main__":
    app.run(debug=True)

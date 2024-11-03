from flask import Flask, request, jsonify
from flask_cors import CORS  # Make sure you have flask-cors installed
import base64
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/analyze": {
        "origins": ["http://localhost:3000"],  # Allow your React dev server
        "methods": ["POST"],  # Allow POST method
        "allow_headers": ["Content-Type"]  # Allow Content-Type header
    }
})

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/analyze', methods=['POST'])
def analyze_image():
    try:
        data = request.json
        base64_image = data.get('image')

        # Create a response using OpenAI's API
        response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Analyze the following image of food and assess its healthiness in relation to heart health. Provide a category ranking of 'Bad', 'Neutral', or 'Good', and assign a score between -5 to 10 based on the following criteria: Bad: score of -5 through -1 Neutral: score of 1 through 5 Good: score of 6 through 10 Format the response as follows: Category: score"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
            max_tokens=300
        )

        result = response.choices[0].message.content
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
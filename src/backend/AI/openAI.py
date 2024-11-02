import base64
from openai import OpenAI

client = OpenAI()

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "images/IMG_8317.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "Analyze the following image of food and assess its healthiness in relation to heart health. Provide a category ranking of 'Bad', 'Neutral', or 'Good', and assign a score between -5 to 10 based on the following criteria: Bad: score of -5 through -1 Neutral: score of 1 through 5 Good: score of 6 through 10 Format the response as follows: Category: score"},
        {
          "type": "image_url",
          "image_url": {
            "url":  f"data:image/jpeg;base64,{base64_image}"
          },
        },
      ],
    }
  ],
)

print(response.choices[0])
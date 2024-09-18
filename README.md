# GenAI Model Integration with Express.js Backend

This project demonstrates the integration of a GenAI model with an Express.js backend. 


## Setup

1. Clone this repository:
   ```
   git clone https://github.com/Ayush200704/express-genai-model.git
   cd express-genai-model
   ```
2. Making Authkey in ngrok website `https://ngrok.com/` and signup 

3. Open Google Colab:
   ```
   !pip install transformers
   !pip install torch
   !pip install flask-ngrok
   !pip install flask
   !pip install pyngrok
   ```
   ```
   !ngrok authtoken YOUR_AUTH_KEY
   ```
   ```python
    from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer

    model_name = "microsoft/DialoGPT-medium"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(model_name)

    def chatbot(prompt):
        inputs = tokenizer.encode(prompt + tokenizer.eos_token, return_tensors="pt")
        reply_ids = model.generate(inputs, max_length=100, pad_token_id=tokenizer.eos_token_id)
        reply = tokenizer.decode(reply_ids[:, inputs.shape[-1]:][0], skip_special_tokens=True)
        return reply

    user_input = "Hello, how are you?"
    response = chatbot(user_input)
    print("Chatbot response:", response)

    from flask import Flask, request, jsonify
    from flask_cors import CORS
    from pyngrok import ngrok

    app = Flask(__name__)
    CORS(app)

    public_url = ngrok.connect(5000)
    print(" * ngrok tunnel \"{}\" -> \"http://127.0.0.1:5000\"".format(public_url))

    @app.route("/predict", methods=["POST"])
        def predict():
        data = request.json
        user_input = data['input']
        response = chatbot(user_input)  # Your chatbot function here
        return jsonify({'reply': response})

    app.run()
    ```

4. copy the URL and put /predict after it in server.js

5. Install Node.js dependencies:
   ```
   npm install
   ```

## Running the Application

### 1. Express.js Server

start the Express.js server:

```
npm run dev
```

The server should start and you'll see a message like "Server running on port 3000".

## Testing the API

You can test the API using Postman or any HTTP client. Here's how to do it with Postman:

1. Open Postman
2. Create a new POST request
3. Set the URL to `http://localhost:3000/chat` 
4. Set the request body to raw JSON and input the following:

```json
{
  "input": "Hi ChatBot"
}

```

5. Send the request

You should receive a result.




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# Load our saved model and vocabulary
vectorizer = joblib.load('vectorizer.pkl')
model = joblib.load('model.pkl')

app = FastAPI()

# This allows your React app to communicate with this Python API without security blocks
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define what the incoming data looks like
class EmailRequest(BaseModel):
    text: str

# Create the endpoint that React will call
@app.post("/predict")
def predict_spam(request: EmailRequest):
    # Transform the text into math
    matrix = vectorizer.transform([request.text])
    
    # Make the prediction (1 for spam, 0 for ham)
    prediction = int(model.predict(matrix)[0])
    
    # Send the result back as JSON
    if prediction == 1:
        return {"result": "SPAM", "message": "🚨 Warning: This looks like spam!"}
    else:
        return {"result": "SAFE", "message": "✅ This email looks safe."}
from flask import Flask, render_template, jsonify, request, Markup
from model import predict_image
import utils

app = Flask(__name__)

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        try:
            file = request.files['file']
            img = file.read()
            prediction = predict_image(img)
            print(prediction)
            res = Markup(utils.disease_dic[prediction])
            return res
        except:
            pass
    return {"error": "Something went wrong"}

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from firebase_admin import credentials, initialize_app, firestore
import datetime

# Initialize Flask app
app = Flask(__name__)
api = Api(app)
CORS(app)  # Enable CORS for all routes

# Initialize Firebase Admin SDK and Firestore
cred = credentials.Certificate("serviceAccountKey.json")
initialize_app(cred)
db = firestore.client()

class RegisterBuyer(Resource):
    @cross_origin(origins='*')
    def post(self):
        try:
            data = request.get_json()
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            phone = data.get('phone')
            address = data.get('address')
            preferred_products = data.get('preferredProducts')
            
            if not all([name, email, password, phone, address, preferred_products]):
                return jsonify({"error": "All fields are required"}), 400

            # Add new entry to Firestore
            db.collection('buyers').add({
                "name": name,
                "email": email,
                "password": password,
                "phone": phone,
                "address": address,
                "preferredProducts": preferred_products,
                "registrationDate": datetime.datetime.utcnow().isoformat()
            })
            
            return jsonify({"message": "Buyer registered successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class GetUsers(Resource):
    @cross_origin(origins='*')
    def get(self):
        try:
            users_ref = db.collection('users')
            users = users_ref.stream()
            users_list = {user.id: user.to_dict() for user in users}
            
            if users_list:
                return jsonify({"users": users_list})
            return jsonify({"error": "No users found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class CreateChat(Resource):
    @cross_origin(origins='*')
    def post(self):
        try:
            data = request.get_json()
            print(data)
            user1_id = data.get('user1_id')
            user2_id = data.get('user2_id')
            
            if not user1_id or not user2_id:
                return jsonify({"error": "Missing user IDs"}), 400

            # Create a chat ID based on user IDs
            chat_id = sorted([user1_id, user2_id])
            chat_id = '-'.join(chat_id)

            # Create chat in Firestore if not exists
            chat_ref = db.collection('chats').document(chat_id)
            chat = chat_ref.get()
            if not chat.exists:
                chat_ref.set({
                    "participants": {
                        user1_id: True,
                        user2_id: True
                    }
                })

            return jsonify({"chat_id": chat_id}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class SendMessage(Resource):
    @cross_origin(origins='*')
    def post(self):
        try:
            data = request.get_json()
            chat_id = data.get('chat_id')
            sender_id = data.get('sender_id')
            message = data.get('message')
            print(data)
            
            if not chat_id or not sender_id or not message:
                return jsonify({"error": "Missing fields"}), 400

            # Create a new message
            chat_ref = db.collection('chats').document(chat_id)
            chat_ref.collection('messages').add({
                "sender": sender_id,
                "message": message,
                "timestamp": datetime.datetime.utcnow().isoformat()
            })

            return jsonify({"message": "Message sent successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class GetMessages(Resource):
    @cross_origin(origins='*')
    def get(self, chat_id):
        try:
            messages_ref = db.collection('chats').document(chat_id).collection('messages')
            messages = messages_ref.stream()
            messages_list = {msg.id: msg.to_dict() for msg in messages}
            
            if messages_list:
                return jsonify({"messages": messages_list})
            return jsonify({"error": "No messages found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class GetData(Resource):
    @cross_origin(origins='*')
    def get(self):
        try:
            data_ref = db.collection('data')
            data = data_ref.stream()
            transformed_data = {doc.id: doc.to_dict() for doc in data}
            
            # Filter data to only include farmers
            farmers_data = {key: value for key, value in transformed_data.items() if value.get('type') == 'Farmer'}
            print(farmers_data)
            if farmers_data:
                return jsonify({"data": farmers_data})
            return jsonify({"error": "No farmers found"})
        except Exception as e:
            return jsonify({"error": str(e)})

class AddData(Resource):
    @cross_origin(origins='*')
    def post(self):
        try:
            data = request.get_json()
            name = data.get('name')
            email = data.get('email')
            age = data.get('age')
            
            if not name or not email or not age:
                return jsonify({"error": "Missing fields"}), 400

            # Add new entry to Firestore
            db.collection('users').add({"name": name, "email": email, "age": age})
            
            return jsonify({"message": "Data added successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class Login(Resource):
    @cross_origin(origins='*')
    def post(self):
        try:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
            
            if not email or not password:
                return jsonify({"error": "Missing email or password"}), 400

            users_ref = db.collection('data')
            # Using filter keyword argument to avoid deprecated usage
            users_query = db.collection('data').where('email', '==', email).where('password', '==', password)
            user_list = list(users_query.stream())
            
            if user_list:
                user = user_list[0].to_dict()
                user_id = user_list[0].id
                return jsonify({
                    "success": True,
                    "user": {
                        "id": user_id,
                        "name": user.get('name'),
                        "type": user.get('type'),
                        "email":user.get('email'),
                    }
                }), 200

            return jsonify({"success": False}), 401  # Unauthorized
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
class GetFarmerDetails(Resource):
    @cross_origin(origins='*')
    def get(self, email):
        try:
            # Query Firestore for the farmer with the given email
            farmers_query = db.collection('data').where('email', '==', email).where('type', '==', 'Farmer')
            farmer_docs = farmers_query.stream()

            farmer_list = [doc.to_dict() for doc in farmer_docs]

            if farmer_list:
                # Assuming there is only one farmer with the given email
                return jsonify(farmer_list[0])
            return jsonify({"error": "Farmer not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

class AddAction(Resource):
    @cross_origin(origins='*')
    def post(self, email):
        try:
            data = request.get_json()
            crop = data.get('crop')
            date = data.get('date')
            price = data.get('price')
            quantity = data.get('quantity')

            if not all([crop, date, price, quantity]):
                return jsonify({"error": "All fields are required"}), 400

            user_ref = db.collection('data').where('email', '==', email).stream()
            user_list = list(user_ref)

            if not user_list:
                return jsonify({"error": "Farmer not found"}), 404

            # Assuming there's only one farmer with this email
            user_doc = user_list[0]
            user_data = user_doc.to_dict()

            # Prepare new action
            new_action = {
                "crop": crop,
                "date": date,
                "price": price,
                "quantity": quantity,
                "status": True
            }

            # Retrieve and update actions
            actions = user_data.get('actions', {})
            next_key = str(len(actions) + 1)  # New key for the action
            
            actions[next_key] = new_action

            # Update Firestore document
            db.collection('data').document(user_doc.id).update({"actions": actions})

            return jsonify({"success": True}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

# Add this resource to your Flask API routes

api.add_resource(AddAction, '/api/farmer/add-action/<string:email>')
api.add_resource(GetFarmerDetails, '/api/farmer/<string:email>')
api.add_resource(GetUsers, '/api/get-users')
api.add_resource(GetData, '/api/get-data')
api.add_resource(AddData, '/api/add-data')
api.add_resource(CreateChat, '/api/create-chat')
api.add_resource(SendMessage, '/api/send-message')
api.add_resource(GetMessages, '/api/get-messages/<string:chat_id>')
api.add_resource(Login, '/api/login')  # Added login resource
api.add_resource(RegisterBuyer, '/api/register-buyer')  #buyer-registration

# Main entry point
if __name__ == '__main__':
    app.run(debug=True)
import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    try:
        firebase_admin.get_app()
    except ValueError:
        cred = credentials.Certificate("firebaseServiceAccountKey.json")
        firebase_admin.initialize_app(cred)

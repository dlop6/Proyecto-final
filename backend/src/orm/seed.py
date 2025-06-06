from models import *

from database import engine, Base

def initialize_database():
    # Create all tables in the database
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully.")

if __name__ == "__main__":
    initialize_database()
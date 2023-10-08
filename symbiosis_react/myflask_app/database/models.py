from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class UserModel(Base):
    __tablename__ = 'UserModel'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(50))  # Ideally, this should be hashed
    email = Column(String(100), unique=True)

"""Create database tables (sync version for Windows 32-bit)."""

from app.database import Base
from app.models import *  # Import all models to register them
from sqlalchemy import create_engine

# Use SQLite sync
from app.config import get_settings
settings = get_settings()
db_url = settings.database_url.replace("+aiosqlite", "")

engine = create_engine(db_url, echo=True)
Base.metadata.create_all(engine)
engine.dispose()

print("Tables created successfully!")

# run.py

from app import create_app, db
import logging
import sys
import os
from sqlalchemy import inspect

# Add the parent directory to sys.path for import resolution
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'app')))

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def populate_db():
    """Populate the database with sample products."""
    from app.routes.product_routes import generate_products  # Import the function
    from app.models.product import Product

    try:
        # Check if the 'product' table exists
        inspector = inspect(db.engine)
        if inspector.has_table("product"):
            logger.info("Dropping existing tables...")
            db.drop_all()

        logger.info("Creating new tables...")
        db.create_all()

        # Generate sample products
        logger.info("Generating sample products...")
        products = generate_products(num_products=1000)

        # Check if products already exist in the database to avoid duplicates
        logger.info("Checking for existing products in the database...")
        existing_products = set(product.name for product in db.session.query(Product.name).all())
        products_to_add = [product for product in products if product.name not in existing_products]

        # Add new products to the database
        if products_to_add:
            logger.info(f"Adding {len(products_to_add)} new products to the database...")
            db.session.bulk_save_objects(products_to_add)
            db.session.commit()
            logger.info(f"{len(products_to_add)} products have been added to the database.")
        else:
            logger.info("No new products to add.")
    
    except Exception as e:
        db.session.rollback()
        logger.error(f"An error occurred: {e}", exc_info=True)

if __name__ == '__main__':
    try:
        app = create_app()
        with app.app_context():
            logger.info("Starting database population...")
            populate_db()  # Populate the database with sample products
            logger.info("Database population completed successfully.")
    except Exception as e:
        logger.error(f"Failed to start the application: {e}", exc_info=True)

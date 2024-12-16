from app.models.product import Product
from faker import Faker
import random
import string

faker = Faker()

def generate_unique_name(used_names):
    """Generate a unique product name."""
    while True:
        adjectives = ['Smart', 'Advanced', 'Compact', 'Luxury', 'Portable', 'Durable', 'Eco-friendly', 'Sleek', 'Stylish', 'Premium']
        categories = ['Electronics', 'Books', 'Home Appliances', 'Clothing', 'Toys', 'Sports', 'Beauty']
        
        # Generate name with potential uniqueness modifier
        name = f"{random.choice(adjectives)} {faker.word().capitalize()} {random.choice(categories)}"
        
        # Ensure that the name is unique by checking the set
        if name in used_names:
            name += '_' + ''.join(random.choices(string.ascii_lowercase + string.digits, k=5))  # Increased random string length
        
        # Return name if it's unique
        if name not in used_names:
            used_names.add(name)
            return name

def generate_products(num_products=1000):
    """Generate a large dataset of products with guaranteed unique names."""
    categories = ['Electronics', 'Books', 'Home Appliances', 'Clothing', 'Toys', 'Sports', 'Beauty']
    products = []
    used_names = set()

    for _ in range(num_products):
        # Generate a truly unique name
        name = generate_unique_name(used_names)

        product = Product(
            name=name,
            description=faker.text(max_nb_chars=200),
            price=round(random.uniform(10, 2000), 2),  # Prices between $10 and $2000
            category=random.choice(categories)
        )
        products.append(product)

    return products

# Node.js E-Commerce API

A comprehensive E-commerce API built with Express and MongoDB, providing key functionalities such as user registration, user login, category management, product management, order creation, search, and more.

## Setup

### Clone the repository:

```bash
git clone https://github.com/dinushchathurya/nodejs-ecommerce-api.git
cd nodejs-ecommerce-api

# Install dependencies:
npm install

# Duplicate database.configexample.js as database.config.js and fill in the environment variables.
# Run the service:
nodemon app.js


## API Endpoints

### User Routes

#### Create User:

- **Endpoint:** `POST /api/v1/users/register`
- **Key-Value:**
  - name: Admin
  - email: admin@admin.com
  - password: password
  - phone: +947187520
  - isAdmin: true
  - street: Main Street
  - apartment: Block C
  - zip: 10870
  - city: Colombo
  - country: SriLanka

#### Login User:

- **Endpoint:** `POST /api/v1/users/login`
- **Key-Value:**
  - email: admin@admin.com
  - password: password

#### Get Users:

- **Endpoint:** `GET /api/v1/users`

#### Get Single User:

- **Endpoint:** `GET /api/v1/users/{id}`

#### Delete User:

- **Endpoint:** `DELETE /api/v1/users/{id}`

#### Get Users Count:

- **Endpoint:** `GET /api/v1/users/get/count`

### Category Routes

#### Create Category:

- **Endpoint:** `POST /api/v1/categories`
- **Key-Value:**
  - name: Category 1
  - icon: icon-health
  - color: #55879

#### Get Categories:

- **Endpoint:** `GET /api/v1/categories`

#### Get Single Category:

- **Endpoint:** `GET /api/v1/categories/{id}`

#### Update Category:

- **Endpoint:** `PUT /api/v1/categories/{id}`
- **Key-Value:**
  - name: Category 1
  - icon: icon-health
  - color: #55879

#### Delete Category:

- **Endpoint:** `DELETE /api/v1/categories/{id}`

### Product Routes

Continue with the same pattern for Product Routes...

### Orders Routes

Continue with the same pattern for Orders Routes...

### Search Functionality

#### Search Products:

- **Endpoint:** `GET /api/v1/products/search?q={search_term}`

### Product Routes

#### Create Product:

- **Endpoint:** `POST /api/v1/products`
- **Key-Value:**
  - name: Product 1
  - description: Description
  - richDescription: Rich Description
  - image: image
  - brand: Brand 1
  - price: 50
  - category: {category_id}
  - countInStock: 100
  - rating: 4.5
  - numReviews: 40
  - isFeatured: true

#### Get Products:

- **Endpoint:** `GET /api/v1/products`

#### Get Single Product:

- **Endpoint:** `GET /api/v1/products/{id}`

#### Get Product Counts:

- **Endpoint:** `GET /api/v1/products/get/count`

#### Get Featured Product Counts:

- **Endpoint:** `GET /api/v1/products/get/featured/{count}`

#### Upload Gallery Images:

- **Endpoint:** `POST /api/v1/products/gallery-images/{id}`
- **Key-Value:**
  - images: Array of images

#### Update Product:

- **Endpoint:** `PUT /api/v1/products/{id}`
- **Key-Value:**
  - name: Product 1
  - description: Description
  - richDescription: Rich Description
  - image: image
  - brand: Brand 1
  - price: 50
  - category: {category_id}
  - countInStock: 100
  - rating: 4.5
  - numReviews: 40
  - isFeatured: true

#### Delete Product:

- **Endpoint:** `DELETE /api/v1/products/{id}`

### Orders Routes

#### Create Order:

- **Endpoint:** `POST /api/v1/orders`
- **Request Body:**
  ```json
  {
      "orderItems": [
          {
              "quantity": 3,
              "product": "602e9c348e700335d8532b14"
          },
          {
              "quantity": 2,
              "product": "602bde0161fcc409fc149734"
          }
      ],
      "shippingAddress1": "No 45, Park Street",
      "shippingAddress2": "No 46, Main Street",
      "city": "Colombo",
      "zip": "10600t",
      "country": "Sri Lanka",
      "phone": "+94717185748",
      "user": "602e9b718e700335d8532b13"
  }


### Search Functionality

#### Search Products:

- **Endpoint:** `GET /api/v1/products/search?q={search_term}`

## Documentation
- **Postman:** https://documenter.getpostman.com/view/27727111/2s9YsNdptR
- **Swagger:** Documentation:https://localhost:8000/api/v1/api-docs/

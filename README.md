# Menu Management API

A Node.js backend server for menu management with categories, subcategories, and items.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/menu_management
PORT=3000
```

3. Start the server:

```bash
node server.js
```

## API Documentation

### Categories

#### Create Category

- **POST** `/api/categories`
- Body:

```json
{
  "name": "string",
  "image": "string (URL)",
  "description": "string",
  "taxApplicability": "boolean",
  "tax": "number (if taxApplicability is true)",
  "taxType": "string (if taxApplicability is true)"
}
```

#### Get All Categories

- **GET** `/api/categories`

#### Get Category by ID or Name

- **GET** `/api/categories/:id`

#### Update Category

- **PUT** `/api/categories/:id`
- Body: Same as Create Category

### Subcategories

#### Create Subcategory

- **POST** `/api/subcategories`
- Body:

```json
{
  "name": "string",
  "image": "string (URL)",
  "description": "string",
  "category": "string (Category ID)",
  "taxApplicability": "boolean (optional, defaults to category's value)",
  "tax": "number (optional, defaults to category's value)"
}
```

#### Get All Subcategories

- **GET** `/api/subcategories`

#### Get Subcategories by Category

- **GET** `/api/subcategories/category/:categoryId`

#### Get Subcategory by ID or Name

- **GET** `/api/subcategories/:id`

#### Update Subcategory

- **PUT** `/api/subcategories/:id`
- Body: Same as Create Subcategory

### Items

#### Create Item

- **POST** `/api/items`
- Body:

```json
{
  "name": "string",
  "image": "string (URL)",
  "description": "string",
  "category": "string (Category ID)",
  "subcategory": "string (Subcategory ID, optional)",
  "taxApplicability": "boolean (optional, defaults to category's value)",
  "tax": "number (optional, defaults to category's value)",
  "baseAmount": "number",
  "discount": "number (optional, defaults to 0)"
}
```

#### Get All Items

- **GET** `/api/items`

#### Search Items by Name

- **GET** `/api/items/search?name=searchQuery`

#### Get Items by Category

- **GET** `/api/items/category/:categoryId`

#### Get Items by Subcategory

- **GET** `/api/items/subcategory/:subcategoryId`

#### Get Item by ID or Name

- **GET** `/api/items/:id`

#### Update Item

- **PUT** `/api/items/:id`
- Body: Same as Create Item

## Testing

You can test the API endpoints using Postman. Import the following collection to get started:

1. Create a new collection in Postman
2. Test each endpoint with the appropriate request body
3. Make sure to set the `Content-Type: application/json` header for POST and PUT requests

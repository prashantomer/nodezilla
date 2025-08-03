# Nodezilla

Order Management System (OMS) application built with Node.js.

## Features

- RESTful API for managing orders
- CRUD operations for orders
- Simple authentication (if implemented)
- Easy to extend and integrate

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.15.0 recommended)
- [npm](https://www.npmjs.com/)

## Installation

```bash
git clone https://github.com/yourusername/nodezilla.git
cd nodezilla
npm install
```

## Usage

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

## API Endpoints

- `GET /orders` — List all orders
- `POST /orders` — Create a new order
- `GET /orders/:id` — Get order by ID
- `PUT /orders/:id` — Update order
- `DELETE /orders/:id` — Delete order

### Sequelize Commands
```
Generate Models:
  npx sequelize-cli model:generate --name User --attributes first_name:string,last_name:string,email:string,gender:string,ip_address:string,active:boolean

  npm run generate:model -- --name Product --attributes "product_name:string,product_category:string,cost_price:decimal,description:string,quantity:integer,reserved:integer,isku:string,active:boolean"

Generate Migration:
  npx sequelize-cli migration:generate --name add-username-to-users

Migrate:
  npm run migrate
  OR
  npx sequelize-cli db:migrate

Undo Migration:
  npm run migrate:undo
  OR
  npx sequelize-cli db:migrate:undo

Generate Seed:
  npx sequelize-cli seed:generate --name demo-users

Run Seed:
  npx sequelize-cli db:seed:all
  OR
  npx sequelize-cli db:seed:run

Rollback Seed:
  npx sequelize-cli db:seed:undo
  OR
  npx sequelize-cli db:seed:undo --seed <seed_file_name>
  OR
  npx sequelize-cli db:seed:undo:all
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

##
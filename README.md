# Movie Database Backend Project

## Overview

This project is a backend application for managing a movie database. It is built using NestJS and follows the principles of Hexagonal Architecture (also known as Ports and Adapters Architecture). 
The application provides REST APIs for managing entities:
1. **movies**
2. **users**
3. **ratings**

## Hexagonal Architecture

Hexagonal Architecture, or Ports and Adapters Architecture, is an architectural style that emphasizes separation of concerns and testability. It divides the application into several layers:

1. **Domain Layer**: Contains the business logic of the application. This layer is independent of any external frameworks or technologies.
2. **Application Layer**: Contains the application logic, orchestrating interactions between the domain layer and external systems.
3. **Adapters Layer**: Contains the implementations of interfaces defined in the domain layer, facilitating communication with external systems like databases, web services, etc.

### Key Components

- **Inbound Ports**: Interfaces through which the external world interacts with the application (e.g., controllers, services).
- **Outbound Ports**: Interfaces through which the application interacts with external systems (e.g., repositories, external services).

<br><br>
![Overview Image](assets\images\image.png)
<br><br>

## Project structure
```plaintext
src/
|
├── config/
│   └── database.config.ts
| 
├── movies/
│   ├── adapters/
│   │   ├── Typeorm_driven_output/
│   │   │   └── movie.repository.ts
│   │   ├── driver_input/
│   │   │   └── movie.controller.ts
│   │   └── dto/
│   │       ├── create-movie.dto.ts
│   │       └── update-movie.dto.ts
│   ├── domain/
│   │   ├── inbound-ports/
│   │   │   └── movie.service.interface.ts
│   │   ├── model/
│   │   │   └── movie.ts
│   │   └── outbound-ports/
│   │       └── movie.repository.interface.ts
│   ├── application/
│   │   └── movie.service.ts
│   └── movies.module.ts
|
├── users/
│   ├── adapters/
│   │   ├── Typeorm_driven_output/
│   │   │   └── user.repository.ts
│   │   ├── driver_input/
│   │   │   └── user.controller.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── domain/
│   │   ├── inbound-ports/
│   │   │   └── user.service.interface.ts
│   │   ├── model/
│   │   │   └── user.ts
│   │   └── outbound-ports/
│   │       └── user.repository.interface.ts
│   ├── application/
│   │   └── user.service.ts
│   └── users.module.ts
|
├── rating/
│   ├── adapters/
│   │   ├── Typeorm_driven_output/
│   │   │   └── rating.repository.ts
│   │   ├── driver_input/
│   │   │   └── rating.controller.ts
│   │   └── dto/
│   │       ├── create-rating.dto.ts
│   │       └── update-rating.dto.ts
│   ├── domain/
│   │   ├── inbound-ports/
│   │   │   └── rating.service.interface.ts
│   │   ├── model/
│   │   │   └── rating.ts
│   │   └── outbound-ports/
│   │       └── rating.repository.interface.ts
│   ├── application/
│   │   └── rating.service.ts
│   └── rating.module.ts
|
├── main.ts
└── app.module.ts

```

## REST APIs

### Movies

- **Create Movie**
  - `POST /movies`
  - Request Body: `{ "title": "string", "description": "string", "releaseDate": "date", "genre": "string" }`

- **Get All Movies**
  - `GET /movies`

- **Get Movie by ID**
  - `GET /movies/:id`

- **Update Movie**
  - `PUT /movies/:id`
  - Request Body: `{ "title": "string", "description": "string", "releaseDate": "date", "genre": "string", "rating": "number" }`

- **Find Movies by Genre**
  - `GET /movies/genre/:genre`

- **Sort Movies by Rating**
  - `GET /movies/sortByRating`

### Users

- **Create User**
  - `POST /users`
  - Request Body: `{ "username": "string", "email": "string" }`

- **Get All Users**
  - `GET /users`

- **Get User by ID**
  - `GET /users/:id`

- **Update User**
  - `PUT /users/:id`
  - Request Body: `{ "username": "string", "email": "string" }`


### Ratings

- **Create Rating**
  - `POST /ratings`
  - Request Body: `{ "rating": "number", "userId": "number", "movieId": "number" }`

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- NestJS CLI
- TypeORM
- PostgreSQL (or another database supported by TypeORM)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-database-backend.git
   cd movie-database-backend
   ```

2. Install dependencies:
    
    ```bash
    npm install
    ```
    
2. Set up the database:
    - Create a database and update the `ormconfig.json` file with your database configuration.
    
3. Start the application:
    
    ```bash
    npm run start:dev
    ```
    

### Usage

- Use a tool like Postman to interact with the REST APIs.
- Refer to the API documentation above for the available endpoints and their expected request bodies.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
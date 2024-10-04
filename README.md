# movieAPI

Express.js ve MongoDB ile Restful API

# Users

| Route | Request Type	 | Body	 | Description	 |
| --- | --- | --- | --- |
| /api/users | `POST` | {"username": "username", "name": "name", "email": "email", "password": "password" }| Create a new user |
| /api/users | `GET` | Empty | List all users |
| /api/users/:id | `GET` | Empty | Get an user |
| /api/users/:id | `PUT` | {'name':'name', 'email':'email'} | Update an user with new information |
| /api/users/:id | `DELETE` | Empty | Delete an user |

# Movies

| Route | Request Type	 | Body	 | Description	 |
| --- | --- | --- | --- |
| /api/movies | `POST` | {"username": "username", "name": "name", "email": "email", "password": "password" }| Create a new movie |
| /api/movies | `GET` | Empty | List all movies |
| /api/movies/:id | `GET` | Empty | Get a movie |
| /api/movies/:id | `PUT` | {'genre':'genre', 'duration': 120, 'rating': 4} | Update a movie with new information |
| /api/movies/:id | `DELETE` | Empty | Delete a movie |
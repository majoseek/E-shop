# E-shop
## Getting started
To try out the application, go to root folder and run:
```
docker-compose up -d
```
By default server runs on port 3001, and client runs on port 3000
## Database
dist/.env file contains login data to example MongoDB collection.

Collection ```Games```
| id                 | name   | price | img_url| amount |
| ------------------ |:------:| :----:| :-----:| -----: |
| SERIAL PRIMARY KEY | string | number| string | number |

Collection ```Users```
| id                 | email   | username | password|
| ------------------ |:-------:| :-------:| :------:|
| SERIAL PRIMARY KEY | string  | string   | string  |

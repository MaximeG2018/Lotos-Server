# Lotos-Server

## CREW

| Name | Role |
|------|------|
| Adrien Masson | **Front** |
| Ibrahima Dansoko | **Front** |
| Maxime Gouénard | **Back** |
| Yassine Fahiti | **Back** |

## LOCAL SETUP

- `npm install`
- Create **.env** file for :
```conf
  NODE_ENV=dev
  PORT=SERVER_PORT
  SUPERSECRET=secretphrase
```
- Create **MYSQL** database called `lotos`
```sql
CREATE DATABASE IF NOT EXISTS `lotos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `lotos`;
```
- Create **database/config.json** to configure local DB connection, like this one :
```java
{
  "local": {
    "dialect": "mysql",
    "database": "lotos",
    "port": "PORT_MYSQL",
    "user": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
  }
}
```
  **_Note : Heroku is handling DB connection on itself, you simply have nothing to do for deployed connection_**
- `npm start`

---
- **AUTH ENDPOINT**

| method       | endpoint              | body                                                        |  auth |
|--------------|-----------------------|-------------------------------------------------------------|-------|
| **POST**     | `/api/auth/register ` | body : { firstname, email, password, password_confirmation } | none  |
| **POST**     | `/api/auth/login`     | body : { email, password }                                  | token |

---

- **USER ENDPOINT**

| method       | endpoint              | body                                                        |  auth |
|--------------|-----------------------|-------------------------------------------------------------|-------|
| **GET**      | `/api/users/`         | X                                                           | token |
| **GET**      | `/api/users/:id`      | X                                                           | token |
| **PATCH**    | `/api/users/:id`      | body : { firstname, email }                                 | token |
| **PATCH**    | `/api/updatepassword/:id` | body : { old_password, password, password_confirmation, token }  | token |
| **DELETE**   | `/api/users/:id`       | body : { token  }                                           | token |

---

## API Video

https://r3lovution-lotus-api.herokuapp.com/api/videos

## DEPLOYED SERVER APP

https://lotos-project.herokuapp.com/

# TODO API

TODO API ini adalah lanjutan dari projek pembelajaran AUTH API

Dibuat dengan:

-   MongoDB
-   ExpressJS
-   JWT
-   NodeJS

# Getting Started

### Clone Repository

Jika kalian mau mencobanya kalian bisa menclone terlebih dahulu repositorynya

```
git clone https://github.com/muhamadAqmal13/TODO-API.git
```

### Ubah env filenya

Ubah terlebih dahulu .env.test nya menjadi .env, lalu ubah isinya sesuka

```
# Defaultnya

PORT=3000

# Secret Token Untuk JWT
ACCESS_TOKEN=secret
REFRESH_TOKEN=secret

# URI MongoDB
URI=mongodb://127.0.0.1:27017/TodoList

# Host untuk CORS
HOST=http://localhost:3000
```

### Jalankan servernya

Untuk menjalankan servernya kalian bisa menggunakan

```
npm start
```

##

## TESTING API

Untuk testing API bisa menggunakan [POSTMAN](https://www.postman.com/) atau bisa
juga menggunakan Ekstension di Visual Studio codenya yang bernama
[REST CLIENT](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### Register

Endpoint dan method

```
POST http://localhost:3000/api/v1/TodoListUser/user
```

Untuk body Requestnya

```
{
    "email": "email@gmail.com",
    "username": "email123",
    "name": "Email Gmail Outlook",
    "password": "email123"
}
```

Respon Sukses

```
{
  "error": 0,
  "message": "Registration successfull",
  "data": {
    "uid": 6701471,
    "email": "email@gmail.com",
    "username": "email123",
    "name": "Email Gmail Outlook",
    "createdAt": "2022-07-05T12:54:53.765Z"
  }
}
```

Respon Failed

```
{
  "error": 1,
  "message": "ERROR_MESSAGE"
}
```

#

### Login

Endpoint dan method

```
POST http://localhost:3000/api/v1/TodoListUser/user/login
```

Untuk body Requestnya

```
{
    "email": "email@gmail.com",
    "password":"email123"
}
```

Respon Sukses

```
{
  "error": 0,
  "message": "Berhasil Login",
  "accessToken": "ACCESS_TOKEN 15 SECONDS"
}
```

Respon Failed

```
{
  "error": 1,
  "message": "ERROR_MESSAGE"
}
```

#

### Refresh Token

Endpoint dan method

```
GET http://localhost:3000/api/v1/TodoListUser/token
```

Respon Sukses

```
{
  "accessToken": "ACCESS_TOKEN 15 SECONDS"
}
```

Respon Failed

```
{
  "error": 1,
  "message": "ERROR_MESSAGE"
}
```

#

### Menambah Todo

Endpoint dan method

```
POST http://localhost:3000/api/v1/TodoList/Todo/
```

Untuk body Requestnya

```
{
    "tittle": "Skripsi",
    "description": "Dealine tanggal 90"
}
```

Respon Sukses

```
{
  "error": 0,
  "message": "Sukses menambahkan TODO",
  "todos": {
    "id": 3690705200806,
    "tittle": "Skripsi",
    "description": "Dealine tanggal 90",
    "createTime": 1657026486678,
    "updateTime": 1657026486678,
    "isDone": false
  }
}
```

Respon Failed

```
{
  "error": 1,
  "message": "ERROR_MESSAGE"
}
```

#

### Mengubah Todo

Endpoint dan method

```
PATCH http://localhost:3000/api/v1/TodoList/Todo/
```

Untuk body Requestnya

```
{
    "id": 3690705200806,
    "tittle": "Skripsi",
    "description": "Dealine tanggal 90",
    "isDone": false
}
```

Respon Sukses

```
{
  "error": 0,
  "message": "Berhasil mengupdate TODO",
  "data": {
    "id": 3690705200806,
    "tittle": "Skripsi",
    "description": "Dealine tanggal 100",
    "createTime": 1657026486678,
    "updateTime": 1657026629654,
    "isDone": false
  }
}
```

Respon Failed

```
{
  "error": 1,
  "message": "ERROR_MESSAGE"
}
```

#

### Menghapus Todo

Endpoint dan method\
Untuk parameternya merupakan Id dari TODOnya

```
DELETE http://localhost:3000/api/v1/TodoList/Todo/3690705192442
```

Respon Sukses

```
{
  "error": 0,
  "message": "Berhasil menghapus data"
}
```

Respon Failed

```
{
  "error": 1,
  "message": "ERROR_MESSAGE"
}
```

## CATATAN

API Todo ini masih banyak kekurangan, Jika kalian ada yang mau memakainya
silahkan dengan senang hati 😉 Oh iya jika ingin di setiap actionnya di
verifikasi JWT nya, bisa kalian gunakan middleware auth.js di setiap routesnya

## CREDITS

-   Muhamad Aqmal Maulana

# Shorturl

[![Badge Github](https://img.shields.io/badge/-Muhamad%20Aqmal%20Maulana-grey?style=flat&logo=github&logoColor=white&link=https://github.com/muhamadAqmal13)](https://github.com/muhamadAqmal13)
[![Badge Instagram](https://img.shields.io/badge/-Muhamad%20Aqmal%20Maulana-cd486b?style=flat&logo=instagram&logoColor=white&link=https://www.instagram.com/malmalaq_/)](https://www.instagram.com/malmalaq_/)

# Introduction
This is a react js MERN stack ecommerce webapp with the name of DnT
# Technologies Used 
* React Bootstrap 4.0
* React Redux Store
* React Hooks
* SweatAlert
* JWT authentication
* JS Cookies
* Multer File Storage
# Features
* Register/Login
* Cart
* Sidebar Menu
* Shoppiing Steps Wizard
# Demo

https://dntstores.herokuapp.com/

## User Credentials
Here are credentials of a sample user.
* **Email:** abc1@xyz.com
* **Password:** 1

## Admin Credentials
* **Email:** abc@xyz.com
* **Password:** 123456

## Register
Get yourself registered and use those credentials to login as a user. But you can get yourself registered only as user NOT admin.

# Site Preview
## Shop
![picture alt](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Shop.gif "Title is optional")
## Cart

## Shopping Steps

## User Account

## Admin Account

# How to Use the Code
* First of all you have to decide 
  * Which mongoDB are you going to use?
  * JWT secret
  * Port 
All above values have some default values in config.js folder in backend folder. If you want to change those defaults, then make a .env file in the backend folder and put your custom values there.
* In the root directory, run the commands
  * npm i
  * npm run backend
* Go to frontend folder and the following commands
  * npm i
  * npm start
 and this will open a new tab in the active browser.
# Heroku Build
* Go to frontend and run this command "npm run build".
* Go to backend/server.js and uncomment all comments.
* Then follow the standard procedure of deploying a node js app to heroku. 

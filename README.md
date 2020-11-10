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
![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Shop.gif)
## Cart
![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Cart%201.gif)

## Shopping Steps
![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Shopping%20Steps.gif)

## User Account
### Full Screen

![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/User%20Account%20-%20%20Full%20Screen.gif)
### Mobile Screen

![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/User%20Account%20-%20Mobile%20Screen.gif)

## Admin Account
### Full Screen

![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Admin%20Account%20-%20Full%20Screen.gif)
### Mobile Screen

![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Admin%20Account%20-%20Mobile%20Screen.gif)

## Remove from Cart and Qty Adjustment on Finalize Order
![Shop Preview](https://github.com/siddiqian/dntstores-ecommerce/blob/master/previews/Remove%20from%20Cart%20and%20Qty%20Adjustment.gif)

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
 ## NOTE: 
 * There are too many "consol logs" for debugging purposes. I have left them intentionally so as to help in future modifications. You can remove them all if you wish.
 * Some buttons and functionaities are disabled, they are just there for display purposes.
# Heroku Build
* Go to frontend and run this command "npm run build".
* Go to backend/server.js and uncomment all comments.
* Then follow the standard procedure of deploying a node js app to heroku. 
# Contact Me
I am more than glad if you contact me in case of any query
developer.siddiqian@gmail.com

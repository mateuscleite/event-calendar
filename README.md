# event-calendar

## Tech Stack

To run this project it is required to have installed in your computer:

- [Node.js](https://nodejs.org)
- [Angular](https://angular.io/)
- [NestJS](https://nestjs.com/)

The data is stored in a [MongoDB](https://www.mongodb.com/) Cloud database.

## Setup

Once you download the.zip file to your computer, unzip it and use your terminal to go the created folder.<br>
This project contains two folders: 'app' and 'server'. The 'app' folder contains the code necessary for the frontend of the application to run and the 'server' folder contains the necessary code for the backend of the application to run.<br>
You'll need to open two terminals to run this application. The instructions for each one are as follows:

### Running the backend server

On the root folder of the project, use the following commands:
- `cd server`
- `npm install`
<br>Wait for the installation process and then use the command:
- `npm run start:dev`

The server is now up and running on localhost:3000/ and if you check it on your browser it should display the following message:<br>
`This is the Event Calendar API Made By mateuscleite`

### Running the frontend application

On the root folder of the project, use the following commands:
- `cd app`
- `npm install`
<br>Wait for the installation process and then use the command:
- `ng serve`

The application is now up and running on localhost:4200/ and if you check it on your browser you should see a login screen.
You can create an account for yourself (as long as you don't use an email already registered) to create your own events or you can see an account with some events already registered with following credentials:
- E-mail: admin@gmail.com
- Senha: admin

## Disclaimers

- Use fake emails and simple passwords that you don't use anywhere else because this application does not guarantee data safety.
- Although all the code and documentation is in English, the application is in Brazilian Portuguese.

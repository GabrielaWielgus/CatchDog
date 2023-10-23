# Mobile App for Real-Time Location Tracking and Chat with Dog Health Diary

![mockup_login](https://github.com/GabrielaWielgus/CatchDog/assets/75125063/b39e38df-54bd-42cb-8fbb-b1636796de14)
![mockup_maps](https://github.com/GabrielaWielgus/CatchDog/assets/75125063/bde254c3-0664-4ed9-a033-4021ecff5836)
![mockup_walks_history](https://github.com/GabrielaWielgus/CatchDog/assets/75125063/a17344a0-b71d-4909-a6de-30436a6175d5)
![mockups_chat](https://github.com/GabrielaWielgus/CatchDog/assets/75125063/54f83b62-5bcc-41dd-9192-b5f57de5e454)
![mockups_helath_record](https://github.com/GabrielaWielgus/CatchDog/assets/75125063/d24707e7-bcf3-4151-a184-3fd888e5b02c)
![mockups_settings](https://github.com/GabrielaWielgus/CatchDog/assets/75125063/55e99af5-6dca-40ff-9764-a5d5b8c16fe8)


## Project Description

The project focuses on the implementation of a mobile application that allows real-time location tracking of users, provides a chat feature, and handles data related to pet care.

## Implementation

### Introduction

As part of the project, a mobile application based on the React Native library and TypeScript language was implemented. The work environment setup is a Visual Studio Code, Node.js, npm, and the Expo platform.

### Server-Side of the Application

The server-side of the application was implemented using Express.js, Node.js, and TypeScript. Global error handling was implemented using the CustomError class. A relational SQLite database was utilized with the TypeORM library.

### Mobile Application

## Deployment and Requirements

### Requests

The implementation of HTTP requests using the Axios library, allowing for asynchronous operations and error handling.

### Protected Requests Mechanism

A protected requests mechanism was implemented, including authentication using JWT tokens, handling authorization errors, and token refreshing.

### Authentication

The user authentication process is based on password hashing using the bcrypt library. The generation and verification of JWT tokens were also implemented.

### Real-Time Location Tracking

User location tracking was implemented using Socket.IO and the Expo TaskManager library. Functions to initiate and stop the tracking process were also implemented.

### Real-Time Chat

The implementation of real-time chat using Socket.IO is presented. It includes functions for handling chats, retrieving messages, and the list of users.

## Technologies Used

Technologies used in the implementation include:
- React Native
- Redux
- Expo Location
- Express.js
- Socket.IO
- SQLite
- TypeORM
- bcrypt

## Application Features

The application allows:
- Real-time location tracking of users
- Real-time chat functionality
- Management of data related to pet care (Dog Health Diary)

## License

This project is available under the MIT license - detailed information can be found in the [LICENSE.md](LICENSE.md) file.

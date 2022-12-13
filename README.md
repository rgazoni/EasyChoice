# EasyChoice

This is an application developed by learning purposes. EasyChoice project was created to provide users with movies options, making it easier to choose and not wasting time browsing movie providers for hours.

## Building the project

In order to build the project, you have to create a .env file in the root directory and configure. You need to define th following variables bellow:

    - API_KEY: "..."
        (This API key is referent to themoviedb, and can be generated creating an account in their site https://developers.themoviedb.org)
    - PORT: "..."
        (Server port number)
    - MONGO_URI: "..."
        (This is to provide a MongoDB connection put yours in this field)
    - JWT_SECRET: "..."
        (You can create a JWT secret. We advise you to generate this by your own)

After this settings, run the command in root directory:

    - npm install

Then to run the app do:

    - npm start

Have fun!

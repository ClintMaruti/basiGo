# basiGo

## BasiGo Technical Assessment Test

## Link for Project

Here is the link to an already deployed version of this task: deployed to Heroku
https://boiling-lowlands-95247.herokuapp.com/users/dashboard

# Logins

-   Admin:
    Email: bus@basigo.com
    Pass: basigo

-   Non Admin:
    Email: client@basigo.com
    Pass: client

## Technology Used

-   Node.js
-   EJS
-   Express.js
-   PostgreSQL
-   passport

# Answer to multiple product of interest question:

-   On the frontend side, I'd use the HTML <select> element to display the product of interest options and allow the user to select multiple options.
    On the server side, I'd convert the string retrieved from the HTML element into an array, then serialize it and store in the database table,
    on retrieving, I'd just deserialize the data and use it.

# How to run the app locally:

-   You'll need to have postgresql installed in your machine. I would have used Docker, but time would not allow me.
-   Step 1: Clone the repository into a directory of your choice:
-   Step 2: Install the app dependencies

```
git clone https://github.com/ClintPy/basiGo.git .
npm install
```

-   Step 3: There's a `.envExample` file in the repository. You'll need to fill up the variables with the values of your database
-   Step 4: Spin up the app by running:

```
npm run dev
```

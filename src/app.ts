import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routers/api.router";
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// define a route handler for the default home page
app.get( "/", (req, res ) => {
    res.end('Home')
});

app.use('/api', apiRouter)

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

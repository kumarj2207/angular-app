//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// add this code
//const whitelist = ['https://online-diet-app.herokuapp.com']; // list of allow domain
const whitelist = ['https://online-diet-app.herokuapp.com','https://myolds.herokuapp.com']; // list of allow domain

const corsOptions = {
    origin: function (origin, callback) {
        console.log("RAJEEV  " + origin);
        if (!origin) {
            return callback(null, true);
        }

        if (whitelist.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin. ' + origin;
            return callback(new Error(msg), false);
        } else {
            console.log("SANJEEV  " + origin);
        }
        return callback(null, true);
    }
}

// end 
app.use(cors(corsOptions));
//app.use(cors());
// Serve only the static files form the dist directory
app.use(express.static('./dist/my-dream-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/my-dream-app/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Import connection to database
const connection = require('./database');

app.use(cors());
app.use(express.json());

app.route('/users/').get((req, res) => {
    connection.query(
        "SELECT * FROM `Users`",
        (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

// POST Request
app.route('/signup/').post((req, res) => {
    // Query to find an existing user with the same email
    connection.query("SELECT * FROM `Users` WHERE email=?", [req.body.email], (error, results, fields) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error querying database!" });
        };
        
        // If the results array has more than one result, then there is an existing user
        if (results.length > 0) {
            return res.status(200).json({ success: false, message: "That email is already associated with an account!" });
        }

        // Otherwise, add the new user to database
        connection.query(
            "INSERT INTO `Users` (email, username, password) VALUES (?, ?, ?)",
            [req.body.email, req.body.username, req.body.password],
            (error, results, fields) => {
                if (error) {
                    return res.status(500).json({ success: false, message: "Error querying database!" });
                };

                return res.status(200).json({ success: true, message: "Successfully logged in!"});
            }
        );

    });
})

app.get('/', (req, res) => res.send('Hello World!'));

app.set('port', process.env.PORT || 3000);
app.listen(3000, () => console.log('Example app listening on port 3000!'));
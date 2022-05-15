const { default: axios } = require('axios');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('email', (email) => {
    readline.question('username', (username) => {
        readline.question('password', (password) => {
            post(email, username, password);
        });
    });
});

async function post(email, username, password) {
    const response = await axios.post("http://localhost:3000/signup", {
            email: email,
            username: username,
            password: password
    });
    const data = response.data;
    console.log(response);
    console.log(data);
}
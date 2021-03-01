import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.get('/', (req, res) => {
    res.send('testando')
})
const client_id = 'ecc3c41f15c2ffd2d0b1'
const client_secret = '8eb0216ef9440e65519c77ef09a804f9a017dcb4'
app.get('/login/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/login/github/callback`)
})

async function getAccessToken(code) {
   const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    })
    const data = await res.text();
    const params = new URLSearchParams(data);
    return params.get('access_token')
}


async function getGithubUser (access_token) {
    const req = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${access_token}`
        }
    })
    const data = await req.json();
    return data
}

app.get('/login/github/callback', async (req, res) => {
    const code = req.query.code
    console.log('code', code);
    const token = await getAccessToken(code);
    const githubData = await getGithubUser(token);
    res.json(githubData);
})


const PORT = 9000 ;
app.listen(PORT, () => console.log('server ON!!!!!', PORT))


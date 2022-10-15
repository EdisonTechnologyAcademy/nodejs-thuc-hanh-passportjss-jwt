import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken"
import verifyJWT from "../middlewares/jwt.middleware";

const JWTConfig = {
    accessTokenSecret: '1234Abcef2121'
}

let users = [
    {
        username: 'admin',
        password: '123456'
    },
    {
        username: 'user',
        password: '123456'
    }
]

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    // tim user trong databas
    const user = users.filter(item => {
        return item.username == username && item.password == password
    })

    if (user.length === 0) {
        const data = {
            status: 'error',
            message: 'Account does not exist'
        }
        res.json(data)
    } else {
        // Generate an access token
        const payload = {
            username: user[0].username,
        }

        const accessToken = jwt.sign(payload, JWTConfig.accessTokenSecret);
        res.json({accessToken});
    }
})

router.get('/users', verifyJWT, (req, res) => {
    res.json(users)
})

export default router;

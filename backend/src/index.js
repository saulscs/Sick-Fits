const cookiParser = require('cookie-parser')
require('dotenv').config({path: 'variables.env'})
const createServer = require('./createServer')
const db = require('./db')
const jwt = require('jsonwebtoken')

const server = createServer()

server.express.use(cookiParser())
//decode the JWT so we can get the user Id on each request

server.express.use((req, res, next) => {
    
    const {token} = req.cookies;
    if(token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        //put the userId into the req for future request to accces
        req.userId = userId
    }
    next();
})

server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
    }
}, dets => {
    console.log(`Server is now runnig on port http://localhost:${dets.port}`)
})
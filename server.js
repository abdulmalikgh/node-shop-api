const http = require('http')

const PORT = process.env.PORT || 3001

const app = require('./app')

const server = http.createServer(app)
//sudo fuser -k -n tcp 3000
server.listen(PORT, ()=> {
    console.log(`Server is listen at : http://localhost:${PORT}`)
})
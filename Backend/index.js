const main = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000;

main().then(()=>{
    console.log("connected")
}).catch(err => console.log(err))
// main().catch(err => console.log(err));
app.use(cors());
app.use(express.json())



app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));





app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

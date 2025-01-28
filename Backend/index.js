const express = require('express')
const app = express()
const { router } = require('./routes/index')
const PORT = 3000
const cors = require('cors')

// Need to be before you mount router on app
// cross origin resource sharing
// need to install it
app.use(cors({
  origin: "http://localhost:5173"
}))

app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log("App is listening to port 3000!")
})
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})

.then(() => console.log("Database connected"))
.catch(error => console.log(error))
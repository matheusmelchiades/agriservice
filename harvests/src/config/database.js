module.exports = {
    connection: {
        uri: process.env.MONGO_URI
    },
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
}

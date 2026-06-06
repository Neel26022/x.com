import mongoose from "mongoose"

const connectDB = async () => {

    if(mongoose.connection.readyState == 1) {
        console.log("DB is connected")
        return 0
    }

    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/tweet')

        if(connect) {
            console.log('DB is connected', )
        }
    } catch(e) {
        console.log("DB is not connected: ", e)
    }
}

export default connectDB
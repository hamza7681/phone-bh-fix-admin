import mongoose from 'mongoose'
const db = process.env.DB_URL as string
let connection: any

export const authenticate = async () => {
  if (!connection) {
    connection = await mongoose.connect(db)
    return connection
  }
}

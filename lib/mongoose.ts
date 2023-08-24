import mongoose from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGO_URL) throw new Error('Missing MONGO_URL env variable')

  if (isConnected) return true

  try {
    await mongoose.connect(process.env.MONGO_URL)
    isConnected = true
  } catch (err: any) {
    throw new Error('Error connecting to database: ', err.message)
  }
}

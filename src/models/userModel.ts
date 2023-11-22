import { UserDocument } from '@/interfaces/ModelInterfaces'
import { Schema, models, model, Model } from 'mongoose'

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/hamza7681/image/upload/v1700568158/Avatar/wloby14njyob7bufvgkm.webp',
    },
    currentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const userModel = models.User || model('User', userSchema)
export default userModel as Model<UserDocument, {}>

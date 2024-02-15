import { BrandDocument } from '@/interfaces/ModelInterfaces'
import { Schema, models, model, Model } from 'mongoose'

const brandSchema = new Schema<BrandDocument>(
  {
    brandName: {
      type: String,
      required: true,
    },
    brandImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const brandModel = models.Brand || model('Brand', brandSchema)
export default brandModel as Model<BrandDocument, {}>

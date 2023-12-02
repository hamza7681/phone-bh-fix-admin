import { CategoryDocument } from "@/interfaces/ModelInterfaces";
import { Schema, models, model, Model } from "mongoose";

const categorySchema = new Schema<CategoryDocument>(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const categoryModel = models.Category || model("Category", categorySchema);
export default categoryModel as Model<CategoryDocument, {}>;

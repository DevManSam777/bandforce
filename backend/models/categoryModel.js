import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    position: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Generate slug from name before saving
categorySchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

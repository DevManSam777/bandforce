// import { time } from "console";
import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true 
    }
}, {
    timestamps: true
});

const productSchema = mongoose.Schema({     
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    images: [{
        url: {
            type: String,
            required: false,
        },
        alt: {
            type: String,
            default: 'Product image',
        }
    }],
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    }, 
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    position: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Pre-save hook to ensure category is a valid ObjectId or null
productSchema.pre('save', function(next) {
    if (this.category && typeof this.category === 'string') {
        // If category is a string, try to convert it to ObjectId
        try {
            this.category = mongoose.Types.ObjectId(this.category);
        } catch (e) {
            // If conversion fails, set to null
            this.category = null;
        }
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
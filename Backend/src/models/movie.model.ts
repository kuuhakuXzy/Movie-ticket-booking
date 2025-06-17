import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    wallpaper: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    genres: {
        type: String,
        required: true
    },
    isNowShowing: {
        type: Boolean,
        default: true
    },
    isComingSoon: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Movie = mongoose.model('Movie', movieSchema); 
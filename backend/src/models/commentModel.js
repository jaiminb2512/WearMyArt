const CommentSchema = new Schema(
  {
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    parentComment: {
      type: Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    images: {
      type: [String],
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    dislikedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

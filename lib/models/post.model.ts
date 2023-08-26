import mongoose from 'mongoose'

const postModel = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    ref: 'User',
  },
  communityId: {
    type: String,
    ref: 'Community',
  },
  createdAt: { type: Date, default: Date.now },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
    },
  ],
})

const Post = mongoose.models.Thread || mongoose.model('Thread', postModel)

export default Post

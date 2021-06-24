import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: { type: String, required: true },
  password: String,
  GPA: Number,
  college: String,
  school: String,
  isRegistered: Boolean, 
  duration: String,
  languageExam: String, 
  apply_list: [String],
});
  
const commentSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'users' },
  content: { type: String, required: true },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  replies: [{ type: mongoose.Types.ObjectId, ref: 'replies' }],
});

const replySchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'users' },
  content: { type: String, required: true },
  comment: { type: mongoose.Types.ObjectId, ref: 'comments' },
});
  
const UserModel = mongoose.model('users', userSchema);
const CommentModel = mongoose.model('comments', commentSchema);
const ReplyModel = mongoose.model('replies', replySchema);

const db = {
  UserModel,
  CommentModel, 
  ReplyModel,
}

export { db as default };

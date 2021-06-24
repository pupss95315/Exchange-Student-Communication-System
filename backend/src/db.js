import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
});
  
const commentSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
});

const replySchema = new Schema({
  name: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
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

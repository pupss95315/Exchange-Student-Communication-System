import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  school_name: { type: String, required: true },
  seme_quota: Number,
  head_quota: Number,
  group: { type: String, required: true },
});

const userSchema = new Schema({
  user_id: { type: String, required: true },
  GPA: { type: Number, required: true },
  group: { type: String, required: true },
  password: String,
  college: String,
  school: { type: mongoose.Types.ObjectId, ref: 'users' },
  isRegistered: Boolean, 
  duration: String,
  languageExam: String, 
  apply_list: [{ type: mongoose.Types.ObjectId, ref: 'schools', required: true }],
});
  
const commentSchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  content: { type: String, required: true },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
  replies: [{ type: mongoose.Types.ObjectId, ref: 'replies' }],
  group: String,
  datetime: { type: String, required: true },
});

const replySchema = new Schema({
  author: { type: mongoose.Types.ObjectId, ref: 'users' },
  content: { type: String, required: true },
  comment: { type: mongoose.Types.ObjectId, ref: 'comments' },
  datetime: { type: Date, required: true },
});

const users = mongoose.model('users', userSchema);
const comments = mongoose.model('comments', commentSchema);
const replies = mongoose.model('replies', replySchema);
const schools = mongoose.model('schools', schoolSchema);

const db = {
  users,
  comments,
  replies,
  schools, 
}

export { db as default };

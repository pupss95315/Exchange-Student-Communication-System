// const users = [
//   {
//     user_id: 'b07705053',
//     user_name: 'PJL',
//     password: 'pjl', 
//     GPA: 3.8,
//     college: 'Management',
//     school: 'University A', 
//     isRegistered: true, 
//     duration: '109-1', 
//     languageExam: '', 
//     apply_list: ['University A', 'University B', 'University C']
//   },{
//     user_id: 'b07705027',
//     user_name: '77Hsu',
//     password: '77h', 
//     GPA: 4,
//     college: 'Management',
//     school: 'University B', 
//     isRegistered: true, 
//     duration: '109-1', 
//     languageExam: '', 
//     apply_list: ['University D', 'University B', 'University C']
//   },{
//     user_id: 'b07902005',
//     user_name: 'User A',
//     password: 'abc', 
//     GPA: 3.9,
//     college: 'EECS',
//     school: 'University A', 
//     isRegistered: true, 
//     duration: '109-2', 
//     languageExam: '', 
//     apply_list: ['University B', 'University A', 'University C']
//   },{
//     user_id: 'b06105032',
//     user_name: 'Julie',
//     password: 'julie', 
//     GPA: 4.2,
//     college: 'Literature',
//     school: 'University D', 
//     isRegistered: true, 
//     duration: '109-1', 
//     languageExam: 'TOFEL', 
//     apply_list: ['University D', 'University B', 'University A']
//   },
// ]

// const comments = [
//   {
//     comment_id: 'c1',
//     content: 'Introduce yourself!',
//     replies: [{
//       reply_id: '1',
//       content: 'Hi I am PJL',
//       UID: 'b07705053'
//     }, {
//       reply_id: '2',
//       content: 'Hi I am 77',
//       UID: 'b07705027'
//     }],
//     followers: ['b07705053', 'b07705027'], 
//     UID: 'b07902005'
//   }, {
//     comment_id: 'c2',
//     content: 'Hi!',
//     replies: [{
//       reply_id: 'r3',
//       content: 'Bye',
//       UID: 'b07902005'
//     }],
//     followers: [], 
//     UID: 'b06105032'
//   }
// ]

// const replies = [
//   {
//     reply_id: 'r1',
//     content: 'Hi I am PJL',
//     UID: 'b07705053'
//   }, {
//     reply_id: 'r2',
//     content: 'Hi I am 77',
//     UID: 'b07705027'
//   }, {
//     reply_id: 'r3',
//     content: 'Bye',
//     UID: 'b07902005'
//   }
// ]
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

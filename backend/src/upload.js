import db from './db.js'

const userdata = [
  {
    user_id: 'b07705053',
    password: 'pjl', 
    GPA: 3.8,
    college: 'Management',
    school: 'University A', 
    isRegistered: true, 
    duration: '109-1', 
    languageExam: '', 
    apply_list: ['University A', 'University B', 'University C']
  },{
    user_id: 'b07705027',
    password: '77hsu', 
    GPA: 4,
    college: 'Management',
    school: 'University B', 
    isRegistered: true, 
    duration: '109-1', 
    languageExam: '', 
    apply_list: ['University D', 'University B', 'University C']
  },{
    user_id: 'b07902005',
    password: 'abc', 
    GPA: 3.9,
    college: 'EECS',
    school: 'University A', 
    isRegistered: true, 
    duration: '109-2', 
    languageExam: '', 
    apply_list: ['University B', 'University A', 'University C']
  },{
    user_id: 'b06105032',
    password: 'julie', 
    GPA: 4.2,
    college: 'Literature',
    school: 'University D', 
    isRegistered: true, 
    duration: '109-1', 
    languageExam: 'TOFEL', 
    apply_list: ['University D', 'University B', 'University A']
  },
]

const commentdata = [
  {
    author: "60d3f97208ab2c069cbdaf55",
    content: "Introduce yourself!",
    followers: ["60d3f97208ab2c069cbdaf56", "60d3f97208ab2c069cbdaf57"], 
    replies: ["60d401f8105176542801f43b", "60d401f8105176542801f43c"],
  }, {
    author: "60d3f97208ab2c069cbdaf56",
    content: "Hi!",
    followers: ["60d3f97208ab2c069cbdaf55"], 
    replies: ["60d401f8105176542801f43d"],
  }
]

const replydata = [
  {
    author: "60d3f97208ab2c069cbdaf55",
    comment: "60d400ca363aa9340c16d850",
    content: "Hi I am PJL",
  }, {
    author: "60d3f97208ab2c069cbdaf56",
    comment: "60d400ca363aa9340c16d850",
    content: "Hi I am 77",
  }, {
    author: "60d3f97208ab2c069cbdaf55",
    comment: "60d400ca363aa9340c16d851",
    content: "Bye",
  }
]

const dataInit = async () => {
  var checkData = await db.UserModel.find()
  if (!checkData.length) {
    await db.UserModel.insertMany(userdata)
  }
  checkData = await db.CommentModel.find()
  if (!checkData.length) {
    await db.CommentModel.insertMany(commentdata)
  }
  // await db.CommentModel.updateOne({"content": "Introduce yourself!"}, {$set: {"replies": ["60d401f8105176542801f43b", "60d401f8105176542801f43c"]}})
  // await db.CommentModel.updateOne({"content": "Hi!"}, {$set: {"replies": ["60d401f8105176542801f43d"]}})
  checkData = await db.ReplyModel.find()
  if (!checkData.length) {
    await db.ReplyModel.insertMany(replydata)
  }
}

export default dataInit;
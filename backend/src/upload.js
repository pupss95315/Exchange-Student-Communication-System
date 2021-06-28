import db from './db.js'

const userdata = [
  {
    user_id: 'b07705053',
    password: 'pjl', 
    group: 'CHINESE',
    GPA: 3.8,
    college: 'C7',
    school: 'University A', 
    isRegistered: true, 
    duration: '109-1', 
    languageExam: '', 
    apply_list: ['University A', 'University B', 'University C']
  },{
    user_id: 'b07705027',
    password: '77hsu', 
    group: 'SPANISH',
    GPA: 4,
    college: 'C7',
    school: 'University B', 
    isRegistered: true, 
    duration: '109-1', 
    languageExam: '', 
    apply_list: ['University D', 'University B', 'University C']
  },{
    user_id: 'b07902005',
    password: 'abc', 
    group: 'JAPANESE',
    GPA: 3.9,
    college: 'C9',
    school: 'University A', 
    isRegistered: true, 
    duration: '109-2', 
    languageExam: '', 
    apply_list: ['University B', 'University A', 'University C']
  },{
    user_id: 'b06105032',
    password: 'julie', 
    group: 'GENERAL',
    GPA: 4.2,
    college: 'C1',
    school: 'University D', 
    isRegistered: true, 
    duration: '109-1', 
    languageExam: 'TOFEL', 
    apply_list: ['University D', 'University B', 'University A']
  },
]

const commentdata = [
  {
    author: "60d68d443bec192eecfffabe",
    content: "Introduce yourself!",
    followers: ["60d68d443bec192eecfffabb", "60d68d443bec192eecfffabc"], 
    replies: ["60d699e039fafb1de405c40a", "60d699e039fafb1de405c40b"],
  }, {
    author: "60d68d443bec192eecfffabd",
    content: "Hi Japan!",
    group: 'JAPANESE',
  }, {
    author: "60d68d443bec192eecfffabc",
    content: "Hi Spanish!",
    group: 'SPANISH'
  }
]

const replydata = [
  {
    author: "60d68d443bec192eecfffabb",
    comment: "60d69962c1b0712b008f7250",
    content: "Hi I am PJL",
  }, {
    author: "60d68d443bec192eecfffabc",
    comment: "60d69962c1b0712b008f7250",
    content: "Hi I am 77",
  },
]

const dataInit = async () => {
  // await db.users.deleteMany({})
  var checkData = await db.users.find()
  if (!checkData.length) 
    await db.users.insertMany(userdata)
  
  // await db.comments.deleteMany({})
  // checkData = await db.comments.find()
  // if (!checkData.length) 
  //   await db.comments.insertMany(commentdata)
  // await db.comments.updateOne({ content: 'Introduce yourself!' }, { $set: { "replies": ["60d699e039fafb1de405c40a", "60d699e039fafb1de405c40b"]} })

  // await db.replies.deleteMany({})
  // checkData = await db.replies.find()
  // if (!checkData.length) 
  //   await db.replies.insertMany(replydata)
}

export default dataInit;
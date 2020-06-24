const userRouter = require('express').Router()
const User = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/models/user.js')
const logger = require('C:/Users/Santeri/fullstack/fullstackmooc/osa4/utils/logger.js')
const bcrypt = require('bcrypt')


userRouter.post('/', async(req, res) => {

  const body = req.body
  if(body.password.length < 3 ){
    res.status(401).send("password 2 short")
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username : body.username,
    name: body.name,
    passwordHash,
  })
  try {
    const savedUser = await user.save()
    logger.info('Creation success')
    res.json(savedUser)
  } catch(err) {
    logger.error(err.name)
    res.status(401).send(err.name)
  }


})

userRouter.get('/', async(req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users.map(user => user.toJSON()))
})

module.exports = userRouter

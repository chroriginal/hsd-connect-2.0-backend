import Router from 'koa-router'
import * as User from '../../../models/User'

const router = new Router({
  prefix: '/users'
})

router.get('/', async ctx => {
  const users = await User.getAllUsers()
  ctx.body = { users }
})

router.post('/register', async (ctx, next) => {
  try {
    const { email, password } = ctx.request.body
    if (!email || !password) {
      ctx.body = 'Please enter your email and password to register.'
      ctx.status = 401
      return
    }
    await User.createUser({ email, password })
    ctx.body = 'User has been successfully created.'
  } catch (err) {
    throw err
  }
})

router.post('/auth', async ctx => {
  const { email, password } = ctx.request.body
  if (!email || !password) {
    ctx.body = 'Please enter your email and password to authenticate.'
    ctx.status = 400
    return
  }
  const user = await User.find({ email })
  console.log(user)
  if (!user) {
    ctx.status = 401
  }
})

export default router

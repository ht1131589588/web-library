const mongoose = require('mongoose')

const { Schema } = mongoose
mongoose.connect(
  'mongodb://localhost:27017/weixin',
  {
    useNewUrlParser: true
  },
  () => {
    console.log('Mongodb connected..')
  }
)
// 服务端token 用于调用微信公共平台API，比如获取公众号所有关注用户信息
exports.ServerToken = mongoose.model('ServerToken', {
  accessToken: String
})

// 客户端token 用户授权后才会有
schema = new Schema({
  access_token: String,
  expires_in: Number,
  refresh_token: String,
  openid: String,
  scope: String,
  create_at: String
})
// 自定义getToken方法
schema.statics.getToken = async function(openid) {
  return await this.findOne({
    openid: openid
  })
}
schema.statics.setToken = async function(openid, token) {
  // 有则更新，无则添加
  const query = {
    openid: openid
  }
  const options = {
    upsert: true
  }
  return await this.updateOne(query, token, options)
}

exports.ClientToken = mongoose.model('ClientToken', schema)

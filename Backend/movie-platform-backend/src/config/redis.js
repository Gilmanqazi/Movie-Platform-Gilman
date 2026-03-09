const radis = require("ioredis").default



const blacklist = new radis({

  port:process.env.REDIS_PORT,
  host:process.env.REDIS_HOST,
  password:process.env.REDIS_PASSWORD
})

blacklist.on("connect",()=>{
  console.log("Connected to redis")
})

blacklist.on("error",(err)=>{
  console.log("Error ",err.message)
})

module.exports = blacklist
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key')

const { User } = require("./models/User");


// aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// aplication/json
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
})
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err))






app.get('/', (req, res) => res.send('Hello World!'));





app.post('/register', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것을 데이터 베이스에 저장한다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })


})

app.listen(port, () => console.log(`Example app listenig on port ${port}!`));
import express from 'express'
import { randomBytes } from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const posts = {}

app.get('/posts/create', (req, res) => {
  console.log('posts', posts)
  res.send(posts)
})

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body

  posts[id] = {
    id,
    title,
  }

  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message)
    })

  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body.type)

  res.send({})
})

app.listen(4000, () => {
  console.log('v556');
  console.log('Listening on 4000')
})

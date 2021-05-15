import express from 'express'
import { randomBytes } from 'crypto'

import axios from 'axios'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    console.log(status)

    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  res.send({})
})

const port = 4003

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

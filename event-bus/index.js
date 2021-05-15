import express from 'express'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const events = []

app.post('/events', (req, res) => {
  const event = req.body

  events.push(event)

  const posts = "posts-clusterip-srv:4000"
  const comments = "comments-srv:4001"
  const query = "query-srv:4002"
  const moderation = 'moderation-srv:4003'

  const services = [posts, comments, query, moderation]

  services.forEach((service) => {
    axios.post(`http://${service}/events`, event).catch((err) => {
      console.log(err.message, service)
    })
  })

  res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Listening on 4005')
})

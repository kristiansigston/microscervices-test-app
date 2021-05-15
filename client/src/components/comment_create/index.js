import React, { useState } from 'react'
import axios from 'axios'

export default ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log('postId', postId)
    await axios
      .post(`http://posts.com/posts/${postId}/comments`, {
        content,
      })
      .catch((err) => {
        console.log(err.message)
      })

    setContent('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">New comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            type="text"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

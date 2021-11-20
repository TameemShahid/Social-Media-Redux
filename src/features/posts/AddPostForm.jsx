import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from '../posts/postsSlice'

export const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userID, setUserID] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector((state) => state.users)

  const onTitleChange = (event) => setTitle(event.target.value)
  const onContentChange = (event) => setContent(event.target.value)
  const onAuthorChange = (event) => {
    setUserID(event.target.value)
  }

  const canSave =
    [title, content, userID].every(Boolean) && addRequestStatus === 'idle'

  const onSavePost = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('loading')
        await dispatch(addNewPost({ title, content, user: userID })).unwrap()
        setTitle('')
        setContent('')
        setUserID('')
      } catch (error) {
        setAddRequestStatus('error')
        console.log(error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userID} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSavePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

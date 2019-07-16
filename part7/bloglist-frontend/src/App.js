import React, { useEffect } from 'react'
import  { useField } from './hooks'
import LoginForm from './components/login.js'
import Blog from './components/blog.js'
import loginServices from './services/login.js'
import blogServices from './services/blogs.js'
import CreateBlog from './components/createBlog.js'
import AlertMessage from './components/alertMessage.js'
import ToggleComponent from './components/ToggleComponent'
import { loginUser, logoutUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import { addNotification, removeNotification } from './reducers/notificationReducer'


function App({ store }) {

  const [ username, clearUsername]  = useField('text')
  const [ password, clearPassword] = useField('password')

  useEffect(() => {
    if(localStorage.user) {
      const user = JSON.parse(localStorage.user)
      store.dispatch(loginUser(user))
      updateBlogs()
    }
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogServices.getAll()
    store.dispatch(initBlogs(blogs))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const { token, name, error } = await loginServices.login({ username: username.value, password: password.value })

    if(token) {
      store.dispatch(loginUser({ token, username, name }))
      clearUsername()
      clearPassword()
      localStorage.setItem('user', JSON.stringify({ token, username, name }))
      updateBlogs()
      store.dispatch(addNotification({ type: 'add', message: `successfully logged in ${name}` }))
      setInterval(() => store.dispatch(removeNotification()), 5000)
    } else {
      store.dispatch(addNotification({ type: 'error', message: error }))
      setInterval(() => store.dispatch(removeNotification()), 5000)
    }

  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    store.dispatch(logoutUser())
    store.dispatch(addNotification({ type: 'error', message: 'Logged out!' }))
    setInterval(() => store.dispatch(removeNotification()), 5000)
  }

  const handleCreatePost = (blog) => {
    store.dispatch(addNotification({ type: 'add', message: `A new blog ${blog.title} by ${blog.author} added` }))
    setInterval(() => store.dispatch(removeNotification()), 5000)
    updateBlogs()
  }

  const user = store.getState().user
  const notification = store.getState().notification
  const blogs = store.getState().blogs

  if (user) {

    return (
      <div>
        <AlertMessage type={notification.type} message={notification.message} />
        <h1>Blogs</h1>
        <p>
          {user.name} logged in. <button type="button" onClick={handleLogout}>Log out</button>
        </p>
        <ToggleComponent buttonLabel="Create new post">
          <CreateBlog token={user.token} update={handleCreatePost} />
        </ToggleComponent>
        <br></br>
        {blogs.sort((a,b) => a.likes < b.likes ? 1 : -1 ).map(blog => <Blog key={blog.id} blog={blog} user={user} update={updateBlogs}/>)}
      </div>
    )
  } else {

    return (
      <div>
        <AlertMessage type={notification.type} message={notification.message} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )

  }

}

export default App

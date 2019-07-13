import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import LoginForm from './components/login.js'
import Blog from './components/blog.js'
import loginServices from './services/login.js'
import blogServices from './services/blogs.js'
import CreateBlog from './components/createBlog.js'
import AlertMessage from './components/alertMessage.js'
import ToggleComponent from './components/ToggleComponent'


function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})

  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    if(localStorage.user) {
      const user = JSON.parse(localStorage.user)
      setUser(user)
      updateBlogs()
    }
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogServices.getAll()
    setBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const { token, name, error } = await loginServices.login({ username: username.value, password: password.value })

    if(token) {
      setUser({ token, username, name })
      username.clear()
      password.clear()
      localStorage.setItem('user', JSON.stringify({ token, username, name }))
      updateBlogs()
      setNotification({ type: 'add', message: `successfully logged in ${name}` })
      setInterval(() => setNotification({}), 5000)
    } else {
      setNotification({ type: 'error', message: error })
      setInterval(() => setNotification({}), 5000)
    }

  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setNotification({ type: 'error', message: 'Logged out!' })
    setInterval(() => setNotification({}), 5000)
  }

  const handleCreatePost = (blog) => {
    setNotification({ type: 'add', message: `A new blog ${blog.title} by ${blog.author} added` })
    setInterval(() => setNotification({}), 5000)
    updateBlogs()
  }

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

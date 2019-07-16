import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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


function App(props) {

  const [ username, clearUsername]  = useField('text')
  const [ password, clearPassword] = useField('password')

  useEffect(() => {
    if(localStorage.user) {
      const user = JSON.parse(localStorage.user)
      props.loginUser(user)
      updateBlogs()
    }
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogServices.getAll()
    props.initBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const { token, name, error } = await loginServices.login({ username: username.value, password: password.value })

    if(token) {
      props.loginUser({ token, username, name })
      clearUsername()
      clearPassword()
      localStorage.setItem('user', JSON.stringify({ token, username, name }))
      updateBlogs()
      props.addNotification({ type: 'add', message: `successfully logged in ${name}` })
      setInterval(() => props.removeNotification(), 5000)
    } else {
      props.addNotification({ type: 'error', message: error })
      setInterval(() => props.removeNotification(), 5000)
    }

  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    props.logoutUser()
    props.addNotification({ type: 'error', message: 'Logged out!' })
    setInterval(() => props.removeNotification(), 5000)
  }

  const handleCreatePost = (blog) => {
    props.addNotification({ type: 'add', message: `A new blog ${blog.title} by ${blog.author} added` })
    setInterval(() => props.removeNotification(), 5000)

    updateBlogs()
  }

  const { user, blogs } = props

  if (user) {

    return (
      <div>
        <AlertMessage />
        <h1>Blogs</h1>
        <p>
          {user.name} logged in. <button type="button" onClick={handleLogout}>Log out</button>
        </p>
        <ToggleComponent buttonLabel="Create new post">
          <CreateBlog token={user.token} update={handleCreatePost} />
        </ToggleComponent>
        <br></br>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} update={updateBlogs}/>)}
      </div>
    )
  } else {

    return (
      <div>
        <AlertMessage />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )

  }

}

const sortedBlogs = ({ blogs }) => {
  return blogs.sort((a,b) => a.likes < b.likes ? 1 : -1 )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: sortedBlogs(state),
  }
}

const mapDispatchToProps = {
  loginUser,
  logoutUser,
  initBlogs,
  addNotification,
  removeNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

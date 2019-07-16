import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import  { useField } from './hooks'
import LoginForm from './components/login.js'
import Blog from './components/blog.js'
import BlogList from './components/blogList.js'
import loginServices from './services/login.js'
import blogServices from './services/blogs.js'
import userServices from './services/users'
import CreateBlog from './components/createBlog.js'
import AlertMessage from './components/alertMessage.js'
import ToggleComponent from './components/ToggleComponent'
import Users from './components/users'
import UserBlogInfo from './components/userBlogInfo'
import NavBar from './components/navBar'
import { loginUser, logoutUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import { addNotification, removeNotification } from './reducers/notificationReducer'
import { initUsers } from './reducers/usersReducer'



function App(props) {

  const [ username, clearUsername]  = useField('text')
  const [ password, clearPassword] = useField('password')

  useEffect(() => {
    if(localStorage.user) {
      const user = JSON.parse(localStorage.user)
      props.loginUser(user)
      updateBlogs()
      getUsers()
    }
  }, [])

  const updateBlogs = async () => {
    const blogs = await blogServices.getAll()
    props.initBlogs(blogs)
  }

  const getUsers = async () => {
    const users = await userServices.getAll()
    props.initUsers(users)
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

  const { user, blogs, } = props

  if (user) {

    return (
      <Router>
        <NavBar />
        <div>
          <AlertMessage />
          <h1>Blogs</h1>
          <p>
            {user.name} logged in. <button type="button" onClick={handleLogout}>Log out</button>
          </p>
          <Route path="/create" render={() => 
            <ToggleComponent buttonLabel="Create new post">
              <CreateBlog token={user.token} update={handleCreatePost} />
            </ToggleComponent>
          } />
          <Route exact path="/" render={() => blogs.map(blog => <BlogList key={blog.id} blog={blog} />)} />
          <Route exact path="/blogs" render={() => blogs.map(blog => <BlogList key={blog.id} blog={blog} />)} />
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/:id" render={({ match }) => <UserBlogInfo id={match.params.id} />} />
          <Route exact path="/blogs/:id" render={({ match }) => <Blog id={match.params.id} />} />
        </div>
      </Router>
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
  removeNotification,
  initUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

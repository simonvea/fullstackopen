
export function addBlog(blog) {
  return {
    type: 'NEW_BLOG',
    data: blog
  }
}

export function initBlogs(blogs) {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export default function blogReducer(state = [], action) {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  default: return state
  }
}
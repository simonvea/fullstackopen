const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helpers')
const Blog = require('../models/blog')

const api = supertest(app)



describe('api test', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogs = helper.blogs.map(blog => new Blog(blog))
        const saved = blogs.map(blog => blog.save())
    
        await Promise.all(saved)
    })

    it('returns the correct amount of blog posts', async () => {
        const response = await api.get('/api/blogs')
        
        expect(response.body.length).toBe(helper.blogs.length)
    })

    test('that the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    it('creates a blog post', async () => {
        const blogpost = helper.singlePost

        await api.post('/api/blogs')
            .send(blogpost)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.blogs.length +1)
        
        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain(
            'This is a test'
        )
        
    })

    test('that missing likes equal 0', async () => {
        const blogpost = {
            "title": "This is a test",
            "author": "Simon",
            "url": "www.google.com",
        }

        const response = await api.post('/api/blogs').send(blogpost)

        expect(response.body.likes).toBe(0)
        
    })

    describe('returns bad request when missing title or url',  () => {
        const badpost = {
            "author": "Simon",
            "likes": "1000"
        }

        test('no url and no title', async () =>{
    
            await api.post('/api/blogs')
                .send(badpost)
                .expect(400)
        })
        
        test('no title', async () => {
            const noTitlePost = {
                ...badpost,
                "url": "www.google.com"
            }
            
            await api.post('/api/blogs')
                .send(noTitlePost)
                .expect(400)
        })

        test('no url', async () => {
            const noUrlPost = {
                ...badpost,
                "title": "This is a test"
            }
            
            await api.post('/api/blogs')
                .send(noUrlPost)
                .expect(400)
        })

    })

    it('deletes a post', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        await api.delete(`/api/blogs/${id}`)
                .expect(204)

        const updated = await helper.blogsInDb()
        
        expect(updated.length).toBe(helper.blogs.length - 1)
    })

    it('updates a post', async () => {
        const blogs = await helper.blogsInDb()
        const id = blogs[0].id

        const updatedPost = helper.singlePost

        const response = await api.put(`/api/blogs/${id}`).send(updatedPost)

        expect(response.body.likes).toEqual(Number(updatedPost.likes))

    })

})


afterAll((done) => {
    mongoose.connection.close()
    done()
})

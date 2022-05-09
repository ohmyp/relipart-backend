const fetchDB = require('../Handlers/DataBaseHandler')

class postsController {
    async createPost(req, res, next) {
        try {
            const data = await fetchDB(`insert into posts (title, body, image, description, date) values ("${req.body.title}", "${req.body.body}", "${req.body.image}", "${req.body.description}", "${req.body.date}");`)
            res.send(data)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async deletePost(req, res, next) {
        try {
            const data = await fetchDB(`delete from posts where id=${req.params.id};`)
            res.send(data)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async updatePost(req, res, next) {
        try {
            const data = await fetchDB(`update posts set title="${req.body.title}", body="${req.body.body}", image="${req.body.image}", description="${req.body.description}", date="${req.body.date}" where id=${req.params.id};`)
            res.send(data)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async getPost(req, res, next) {
        try {
            const data = await fetchDB(`select * from posts where id=${req.params.id}`)
            res.send(data)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async getPosts(req, res, next) {
        try {
            const data = await fetchDB(`select * from posts order by id limit 5 offset ${req.params.offset}`)
            res.send(data)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
}

module.exports = new postsController()
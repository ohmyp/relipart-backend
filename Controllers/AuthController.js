const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const fetchDB = require('../Handlers/DataBaseHandler')

class authController {
    async register(req, res, next) {
        const {username, password} = req.body
        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) res.status(500)
            try {
                const query = await fetchDB(`insert into user (username, password) values ("${username}", '${hash}');`)
                res.send({username, password})
            } catch (e) {
                console.log(e)
                res.send(e)
            }
        });
    }

    async login(req, res, next) {
        const {username, password} = req.body;
        const candidate = await fetchDB(`select * from user where username='${username}';`).then(res => res[0])
        if (candidate) {
            bcrypt.compare(password, candidate.password, (err, result) => {
                if (err) res.status(500)
                if (result) {
                    const accessToken = jwt.sign({
                        username: candidate.username,
                    }, process.env.JWT_SECRET)
                    res.json({
                        accessToken
                    })
                } else res.json({error: 'Неправильный пароль'})
            })
        } else {
            res.send({error: 'Неправильное имя пользователя'})
        }
    }

    async auth(req, res, next) {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.json(err)
                return res.json(user)
            })
        } else {
            res.sendStatus(401)
        }
    }
}

module.exports = new authController()

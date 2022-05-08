const {Router} = require('express')
const router = Router()
const postsController = require('../Controllers/PostControllers')
const downloadController = require('../Controllers/DownloadControllers')
const mailController = require('../Controllers/MailController')
const authController = require('../Controllers/AuthController')

router.get('/posts', postsController.getPosts)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', postsController.deletePost)
router.post('/posts/create', postsController.createPost)
router.post('/posts/:id/update', postsController.updatePost)

router.get('/download/:filename', downloadController.download)
router.post('/upload/:path', downloadController.upload)
router.get('/files/:category', downloadController.getFiles)

router.post('/auth/register', authController.register)
router.get('/auth/login', authController.login)
router.get('/auth/auth', authController.auth)

router.post('/results', mailController.sendmail)

module.exports = router
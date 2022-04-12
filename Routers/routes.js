const {Router} = require('express')
const router = Router()
const postsController = require('../Controllers/PostControllers')
const downloadController = require('../Controllers/DownloadControllers')
const mailController = require('../Controllers/MailController')

router.get('/posts', postsController.getPosts)
router.get('/posts/:id', postsController.getPost)
router.get('/posts/:id/delete', postsController.deletePost)
router.post('/posts/create', postsController.createPost)
router.post('/posts/:id/update', postsController.updatePost)

router.get('/download/:filename', downloadController.download)
router.post('/upload/:path', downloadController.upload)
router.get('/files/:category', downloadController.getFiles)

router.post('/results', mailController.sendmail)

module.exports = router
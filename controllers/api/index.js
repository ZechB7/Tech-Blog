const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogpostRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
router.use('/user', userRoutes);
router.use('/post', blogpostRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.put to create updates. 
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
    });

    const posts = postData.get({ plain: true });

    res.render('edit', {
      ...posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) =>{
  try {
    const editPost = await Post.update(req.body, {
      where: { id:req.params.id }
    })
    res.status(200).json({message:"post updated!"})
  } catch (error) {
    res.status(400).json("post not updated!")
  }
})


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
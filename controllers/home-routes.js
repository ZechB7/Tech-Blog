const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogPostData = await Post.findAll({
      include: [
        {
          model: User,
          order: [{}]
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });
    const posts = blogPostData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        }
      ],
    });
    if (postData) {
      const posts = postData.get({ plain: true });
      console.log(posts);

      res.render('post', {
        ...posts,
        logged_in: req.session.logged_in
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
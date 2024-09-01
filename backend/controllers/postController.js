const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { response } = require("express");
const { Comment } = require("../models/Comments");
const { User } = require("../models/User");
const { notification } = require("../middlewares/notificaion");
/**----------------------------------------
 * @decs Create new post
 * @route /api/post
 * @method POST
 * @access private (only loggedin users)
 -----------------------------------------*/
module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const user = await User.findById(req.user.id);

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
    isAccepted: user.isAdmin ? true : false,
  });

  res.status(201).json(post);

  fs.unlinkSync(imagePath);
});
/**----------------------------------------
 * @decs Get All post
 * @route /api/post
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getAllPostCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;
  const { pageNumber, category, userId } = req.query;
  let posts;
  if (pageNumber) {
    posts = await Post.find({ isAccepted: true })
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (userId) {
    posts = await Post.find({ isAccepted: false, user: userId })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (category) {
    posts = await Post.find({ isAccepted: true, category: category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find(req.query && { isAccepted: true })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }
  res.status(200).json(posts);
});
/**----------------------------------------
 * @decs Get Single post
 * @route /api/post/:id
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("comments")
    .populate("user", ["-password"]);

  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }
  res.status(200).json(post);
});
/**----------------------------------------
 * @decs Get Post Count
 * @route /api/posts/count
 * @method GET
 * @access public
 -----------------------------------------*/
module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
  const postsCount = await Post.estimatedDocumentCount({});
  res.status(200).json(postsCount);
});

/**----------------------------------------
 * @decs delete post
 * @route /api/post/:id
 * @method DELETE
 * @access private (only admin or owner of the post)
 -----------------------------------------*/
module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);

    await Comment.deleteMany({ postId: post._id });
    res
      .status(200)
      .json({ message: "post has been deleted successfuly", postId: post._id });
  } else {
    res.status(403).json({ message: "Access denied , forbidden" });
  }
});

/**----------------------------------------
 * @decs Update post
 * @route /api/post/:id
 * @method PUT
 * @access private (only owner of the post)
 -----------------------------------------*/
module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost();
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied,you are not allowed" });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  res.status(200).json(updatedPost);
});
/**----------------------------------------
 * @decs Update post Image
 * @route /api/post/update-image/:id
 * @method PUT
 * @access private (only owner of the post)
 -----------------------------------------*/
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no image provided" });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "access denied,you are not allowed" });
  }

  await cloudinaryRemoveImage(post.image.publicId);

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  res.status(200).json(updatedPost);

  fs.unlinkSync(imagePath);
});
/**----------------------------------------
 * @decs Toggle like
 * @route /api/post/like/:id
 * @method PUT
 * @access private (only logged in users)
 -----------------------------------------*/
module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;
  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );
  const user = await User.findById(loggedInUser, "username");

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: loggedInUser,
        },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: loggedInUser,
        },
      },
      { new: true }
    );
    await notification({
      title: ` ${user.username} likes  your post`,
      link: `/posts/details/${postId}`,
      userId: post.user._id.toString(),
    });
  }

  res.status(200).json(post);
});
/**----------------------------------------
 * @decs Get All posts Admin
 * @route /api/post/admin
 * @method GET
 * @access public
 -----------------------------------------*/

module.exports.getAllPostsAdminCtrl = asyncHandler(async (req, res) => {
  let posts;

  posts = await Post.find({ isAccepted: false })

    .sort({ createdAt: -1 })
    .populate("user", ["-password"]);

  res.status(200).json(posts);
});
/**----------------------------------------
 * @decs accept post
 * @route /api/post/accept/:id
 * @method PUT
 * @access private (only admin )
 -----------------------------------------*/
module.exports.acceptPostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "post Not Found" });
  }

  if (req.user.isAdmin) {
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isAccepted: true,
        },
      },

      { new: true }
    );
    await notification({
      title: `your post accepted`,
      link: "/posts",
      userId: post.user._id.toString(),
    });
  } else {
    res.status(403).json({ message: "Access denied , forbidden" });
  }
});

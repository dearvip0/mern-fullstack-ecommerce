import Post from "../models/post";
import expressjwt from "express-jwt";

export const requireSignin = expressjwt(
  { secret: process.env.JWT_SECRET, algorithms: ["HS256"] },
  function (req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);

export const canEditDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("POST in EDITDELETE MIDDLEWARE => ", post);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

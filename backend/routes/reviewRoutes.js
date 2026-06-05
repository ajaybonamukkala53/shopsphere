const express =
  require("express");

const router =
  express.Router();

const Review =
  require("../models/Review");



// ADD REVIEW

router.post(

  "/",

  async (req, res) => {

    try {

      const review =
        new Review({

          productId:
            req.body.productId,

          userName:
            req.body.userName,

          rating:
            req.body.rating,

          comment:
            req.body.comment,

        });




      await review.save();




      res.status(201).json(review);

    } catch (error) {

      console.log(error);




      res.status(500).json({

        message:
          error.message,

      });
    }
  }
);



// GET REVIEWS OF PRODUCT

router.get(

  "/:productId",

  async (req, res) => {

    try {

      const reviews =
        await Review.find({

          productId:
            req.params.productId,

        });




      res.json(reviews);

    } catch (error) {

      console.log(error);




      res.status(500).json({

        message:
          error.message,

      });
    }
  }
);

module.exports =
  router;
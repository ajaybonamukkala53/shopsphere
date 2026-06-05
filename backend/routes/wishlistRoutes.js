const express =
  require("express");

const router =
  express.Router();

const Wishlist =
  require("../models/Wishlist");



// ADD TO WISHLIST

router.post(

  "/",

  async (req, res) => {

    try {

      const item =
        new Wishlist(

          req.body

        );




      await item.save();




      res.json({

        success: true,

      });

    } catch (error) {

      console.log(error);




      res.status(500).json({

        success: false,

      });
    }
  }
);



// GET WISHLIST

router.get(

  "/:email",

  async (req, res) => {

    try {

      const items =
        await Wishlist.find({

          userEmail:
            req.params.email,

        });




      res.json(items);

    } catch (error) {

      console.log(error);




      res.status(500).json({

        success: false,

      });
    }
  }
);



// REMOVE ITEM

router.delete(

  "/:id",

  async (req, res) => {

    try {

      await Wishlist.findByIdAndDelete(

        req.params.id

      );




      res.json({

        success: true,

      });

    } catch (error) {

      console.log(error);




      res.status(500).json({

        success: false,

      });
    }
  }
);

module.exports =
  router;
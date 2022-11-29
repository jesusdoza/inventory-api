// const { response } = require("express");
const Parts = require("../models/Part");
const Items = require("../models/Item");

module.exports.getInventory = async (req, res) => {
  try {
    //get all inventory that matches the groups user is a part of
    const allInventory = await Items.find({ groups: { $in: req.user.groups } });
    // const allInventory = await Items.find()
    console.log(allInventory);
    // console.log(req.user)
    res.render("inventory.ejs", {
      inventory: allInventory,
      user: req.user.username,
    });
  } catch (error) {
    console.log(`error getting inventory`, error);
    res.status(500).json({ message: "error getting inventory" });
  }
};

module.exports.addItem = async (req, res) => {
  console.log(req.user);
  try {
    const newItem = await Items.create({
      partnumber: req.body.part,
      model: req.body.model,
      enginemake: req.body.engine_make,
      instock: req.body.quantity,
      groups: [req.user.username],
      createdBy: req.user.username,
      // cores:,
      // warranty:,
      // problem:,
    });

    res.redirect("/inventory");
  } catch (error) {
    console.log(`error adding to inventory`, error);
    res.status(400).json({ message: "error getting inventory" });
  }
};

module.exports.removePart = async (req, res) => {
  console.log(`remove part`);
  try {
    //find specific entry
    const foundPart = await Items.findOne(
      //query
      {
        partnumber: req.body.partnumber,
      }
    );

    if (!foundPart) {
      res.status(400).json({ message: "part not found" });
    }

    console.log(`found part is `, foundPart);

    const result = await Items.deleteOne({ _id: foundPart._id });

    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.log("error at delete", error);

    res.status(505).json({ message: "error deleting" });
  }
};

module.exports.updatePart = async (req, res) => {
  console.log(req.body);
  try {
    //find specific entry
    const foundPart = await Items.findOne(
      //query
      {
        partnumber: req.body.partnumber,
      }
    );

    if (!foundPart) {
      res.status(400).json({ message: "part not found" });
    }

    console.log(`found part is `, foundPart);

    const result = await Items.updateOne(
      {
        _id: foundPart._id,
      },
      {
        $set: req.body,
      }
    );
    // ! set the update or maybe use the save by updating individual properties?
    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.log("error at update", error);

    res.status(505).json({ message: "error deleting" });
  }
};

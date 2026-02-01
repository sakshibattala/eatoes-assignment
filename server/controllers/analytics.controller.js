import OrderModel from "../models/order.model.js";

export const getTopSellers = async (req, res) => {
  try {
    const topSellingItems = await OrderModel.aggregate([
      // Flatten items array
      { $unwind: "$items" },

      //  Group by menuItem and sum quantities
      {
        $group: {
          _id: "$items.menuItem",
          totalSold: { $sum: "$items.quantity" },
        },
      },

      // Lookup menu item details
      {
        $lookup: {
          from: "menuitems", // (MongoDB auto-lowercases collection name)
          localField: "_id",
          foreignField: "_id",
          as: "menuItemDetails",
        },
      },

      //  Unwind menu item details
      { $unwind: "$menuItemDetails" },

      //  Sort high -> low
      { $sort: { totalSold: -1 } },

      //  Limit to 5
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: topSellingItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

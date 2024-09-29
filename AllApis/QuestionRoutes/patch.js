const patchRoutes = [
    {
      path: "/:id",
      handler: async (req, res) => {
        res.send("question");
      },
    },
  ]
module.exports = patchRoutes;
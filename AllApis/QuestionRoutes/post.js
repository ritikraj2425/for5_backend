const postRoutes = [
    {
      path: "/",
      handler: async (req, res) => {
        res.send("question");
      },
    },
]
module.exports = postRoutes;
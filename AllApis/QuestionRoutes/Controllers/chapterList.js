const { Question } = require('../../../Schemas/allSchemas');

const chapterList = async (req, res) => {
    const { subject } = req.params;
    try {
      const questions = await Question.find({
        subject: { $regex: subject, $options: "i" },
      });
      const chapters = {};
      questions.map((q) => {
        chapters[q.chapter] = 1;
      });
      return res.status(200).json({
        result: Object.keys(chapters),
      });
    } catch (err) {
      return res.status(500).json({
        message: "something went wrong",
        error: err.message,
      });
    }
  }
module.exports = chapterList;
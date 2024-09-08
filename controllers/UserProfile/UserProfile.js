const Question = require("../../model/questionSchema");
const User = require("../../model/userSchema");

const getUserQuestion = async (req, res, next) => {
  try {
    const allquestions = await Question.find({ posted_by: req.userId }).sort({
      $natural: -1,
    });
    return res.status(201).json(allquestions);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: "Something went wrong!" });
  }
};

const getUserAuthenticate = async (req, res) => {
  try {
    // Find the user by their ID
    const user = await User.findById(req.userId, "name email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send user details
    res.status(200).json({ name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

// "631df85e548ee1a746ac45ab" // answer

const getUserAnswers = async (req, res, next) => {
  try {
    const allanswers = await Question.find(
      { "answers.answered_by": req.userId },
      "answers"
    );
    console.log(allanswers);
    console.log(req.userId);
    var lenanswers = allanswers.length;
    var answers = [];
    var k = 0;
    for (let i = 0; i < lenanswers; i++) {
      var answersObj = allanswers[i].answers;
      for (let j = 0; j < answersObj.length; j++) {
        if (answersObj[j].answered_by.toString() == req.userId.toString()) {
          answers[k] = {};
          answers[k].questionId = allanswers[i]._id;
          answers[k]._id = answersObj[j]._id;
          answers[k].is_verified = answersObj[j].is_verified;
          answers[k].liked_by = answersObj[j].liked_by;
          answers[k].unliked_by = answersObj[j].unliked_by;
          answers[k].answer_body = answersObj[j].answer_body;
          k = k + 1;
        }
      }
    }
    return res.status(201).json(answers);
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  getUserQuestion,
  getUserAuthenticate,
  getUserAnswers,
};

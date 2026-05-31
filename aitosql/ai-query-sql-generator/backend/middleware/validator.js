const validateQuestion = (req, res, next) => {

    const { question } = req.body;

    if (!question || question.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Question is required"
        });
    }

    next();
};

module.exports = validateQuestion;
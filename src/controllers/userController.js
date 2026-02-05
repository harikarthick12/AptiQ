const User = require('../models/User');

exports.updateLanguage = async (req, res) => {
    try {
        const { language } = req.body;

        if (!['English', 'Tamil', 'Telugu'].includes(language)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid language selection'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { preferredLanguage: language },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

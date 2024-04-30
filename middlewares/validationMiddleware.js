const { body, validationResult } = require('express-validator');

exports.createUser = async (req, res,next) => {
    try {
        // Validation middleware
        await Promise.all([
            body('userName').notEmpty().withMessage('Name is required').run(req),
            body('email').isEmail().withMessage('Invalid email address').run(req),
            body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').run(req),
            
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next()
        
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.loginUser = async (req, res,next) => {
    try {
        
        await Promise.all([
            body('email').isEmail().withMessage('Invalid email address').run(req),
            body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({msg:"validation error", errors: errors.array() });
        }

        next()
        
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

   
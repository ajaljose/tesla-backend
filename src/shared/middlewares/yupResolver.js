const yupResolver = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        next(error);
    }
};

module.exports = yupResolver;

const yup = require('yup');

const createVehicleSchema = yup.object().shape({
    slug: yup.string().optional(),
    hero: yup.object().shape({
        brand: yup.string().required('Brand is required'),
        model: yup.string().required('Model is required'),
        tagline: yup.string().optional(),
        heroImage: yup.string().url('Hero image must be a valid URL').optional(),
        stats: yup.array().of(
            yup.object().shape({
                label: yup.string().required('Stat label is required'),
                value: yup.string().required('Stat value is required')
            })
        ).optional()
    }).required('Hero details are required'),
    features: yup.array().of(
        yup.object().shape({
            title: yup.string().required('Feature title is required'),
            subtitle: yup.string().optional(),
            description: yup.string().optional(),
            image: yup.string().url('Feature image must be a valid URL').optional(),
            is_general: yup.boolean().optional()
        })
    ).optional(),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    range: yup.number().required('Range is required').positive('Range must be positive'),
    top_speed: yup.number().required('Top speed is required').positive('Top speed must be positive'),
    type: yup.string().required('Vehicle type is required'),
    colors: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Color name is required'),
            code: yup.string().required('Color code is required'),
            image: yup.string().url('Color image must be a valid URL').optional()
        })
    ).optional()
});

module.exports = {
    createVehicleSchema
};

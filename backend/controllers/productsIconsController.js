const cloudinary = require('../config/cloudinary');

const getProductsIcons = async (req, res, next) => {
    try {
        const folderPath = 'products-icons';
        const { resources } = await cloudinary.search
            .expression(`folder:${folderPath}`)
            .sort_by('public_id', 'desc')
            .max_results(200)
            .execute();

        const icons = resources.map(resource => ({
            url: resource.secure_url,
            name: resource.public_id.split('/').pop().split('.')[0],
        }));

        res.status(200).json({ icons });
    } catch (error) {
        console.error('Error fetching icons:', error);
        next(error);
    }
};

module.exports = { getProductsIcons };

// GET icons from CLOUDINARY/products-icons for OUR PRODUCTS running line
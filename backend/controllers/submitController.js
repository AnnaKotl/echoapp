const { HttpError, validators, sendEmail, Request } = require('../helpers');

const submitRequest = async (req, res, next) => {
    try {
        // console.log('Received data for submit-request:', req.body);
        const validData = validators(req.body);

        const requiredFields = ['name', 'email', 'mobileNumber', 'selectedService', 'country'];
        for (const field of requiredFields) {
            if (!validData[field]) {
                return res.status(400).json({ message: `${field} is required` });
            }
        }

        const { name, email, message, socialNetwork, selectedService, mobileNumber, country } = validData;

        const phoneValidator = /^[\d]{3}[-\s]?[\d]{3}[-\s]?[\d]{3,4}$/;
        if (!phoneValidator.test(mobileNumber)) {
            return res.status(400).json({ message: 'Please enter a valid mobile number, at least 5 digits long' });
        }

        const newRequest = await Request.create(validData);
        // console.log("New request saved:", newRequest);

        await sendEmail({
            to: process.env.RECIPIENT_EMAIL,
            subject: 'New request received',
            ...validData,
        });

        res.status(201).json({
            message: 'Request submitted successfully',
            newRequest,
        });
    } catch (err) {
        next(HttpError(400, err.message));
    }
};

module.exports = { submitRequest };
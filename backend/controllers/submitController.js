const { HttpError, validators, sendEmail, Request } = require('../helpers');

const submitRequest = async (req, res, next) => {
    try {
        console.log('Received data for submit-request:', req.body);  // LOG ----------------------------- > DELETE after DEV
        const validData = validators(req.body);

        const requiredFields = ['name', 'email', 'mobileNumber', 'selectedService', 'country'];
        for (const field of requiredFields) {
            if (!validData[field]) {
                return res.status(400).json({ message: `${field} is required` });
            }
        }

        const { name, email, message, selectedService, mobileNumber, socialNetwork, country, city } = validData;

        const phoneValidator = /^(?:\+?380\d{9}|\d{10})$/; // +380XXXXXXXXX / 0XXXXXXXXX
        if (!phoneValidator.test(mobileNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format. Please use a valid format: +380XXXXXXXXX or 096XXXXXXXX' });
        }

        const newRequest = await Request.create(validData);
        console.log("New request saved:", newRequest);  // LOG ----------------------------- > DELETE after DEV

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

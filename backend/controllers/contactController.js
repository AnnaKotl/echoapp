const { HttpError, validators, sendEmail, Request } = require('../helpers');

const createContactRequest = async (req, res, next) => {
  try {
    console.log('Received data:', req.body);
    const validData = validators(req.body);

    const requiredFields = ['name', 'email', 'mobileNumber', 'selectedService', 'country'];
    for (const field of requiredFields) {
      if (!validData[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const { name, email, socialNetwork, message, selectedService, mobileNumber, country } = validData;

    const newRequest = await Request.create(validData);
    // console.log("New request saved to DB:", newRequest);

    await sendEmail({
      to: process.env.RECIPIENT_EMAIL,
      subject: 'NEW CLIENT',
      ...validData,
    });

    res.status(201).json({
      message: 'Contact request submitted successfully',
      newRequest,
    });
  } catch (err) {
    next(HttpError(400, err.message));
  }
};

module.exports = { createContactRequest };
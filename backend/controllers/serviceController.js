const Service = require('../models/Service');
const HttpError = require('../helpers/HttpError');

// GET 
const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    next(HttpError(500, 'Unable to fetch services'));
  }
};

// POST
const createService = async (req, res, next) => {
  try {
    const { name, description, features, price } = req.body;

    if (!name || !description || !features || !price) {
      return next(HttpError(400, 'All fields are required'));
    }

    const newService = await Service.create({ name, description, features, price });
    res.status(201).json(newService);
  } catch (error) {
    next(HttpError(500, 'Unable to create service'));
  }
};

// PUT
const updateService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const updatedData = req.body;

    const updatedService = await Service.findByIdAndUpdate(serviceId, updatedData, { new: true });
    if (!updatedService) {
      return next(HttpError(404, 'Service not found'));
    }

    res.json(updatedService);
  } catch (error) {
    next(HttpError(500, 'Unable to update service'));
  }
};

// DEL
const deleteService = async (req, res, next) => {
  try {
    const { serviceId } = req.params;

    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return next(HttpError(404, 'Service not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(HttpError(500, 'Unable to delete service'));
  }
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
};

// PRICES
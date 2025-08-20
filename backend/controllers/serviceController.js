const Service = require('../models/Service');
const HttpError = require('../helpers/HttpError');
const cache = require('../config/cache');

const CACHE_KEY = 'all-services';

// GET 
const getAllServices = async (req, res, next) => {
  try {
    const cachedServices = cache.getCachedData(CACHE_KEY);
    if (cachedServices) {
      console.log('✅ Services from cache');
      return res.json(cachedServices);
    }

    const services = await Service.find();
    cache.setCachedData(CACHE_KEY, services, 3600);
    console.log('📦 Services from DB');

    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error.message);
    next(error);
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

    cache.invalidateCache(CACHE_KEY);

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

    cache.invalidateCache(CACHE_KEY);

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

    cache.invalidateCache(CACHE_KEY);

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

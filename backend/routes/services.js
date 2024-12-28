const express = require('express');
const router = express.Router();
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Retrieve all services
 *     description: Get a list of all available services.
 *     tags:
 *       - Services
 *     responses:
 *       200:
 *         description: A list of services.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "65af4b92e3b2c4a7b8912456"
 *                   name:
 *                     type: string
 *                     example: "Web Development"
 *                   price:
 *                     type: number
 *                     example: 5000
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllServices);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     description: Add a new service to the database.
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SEO Optimization"
 *               price:
 *                 type: number
 *                 example: 1500
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', createService);

/**
 * @swagger
 * /services/{serviceId}:
 *   put:
 *     summary: Update an existing service
 *     description: Modify service details by ID.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mobile App Development"
 *               price:
 *                 type: number
 *                 example: 7000
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put('/:serviceId', updateService);

/**
 * @swagger
 * /services/{serviceId}:
 *   delete:
 *     summary: Delete a service
 *     description: Remove a service by its ID.
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:serviceId', deleteService);

module.exports = router;

// PRICES
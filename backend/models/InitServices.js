const mongoose = require('mongoose');
const Service = require('./Service');
const connectDB = require('../config/db');

const initialServices = [
    {
        name: 'Basic',
        features: ['UI/UX Design', 'Develop', 'QA', 'Source code'],
        price: 'from $1000',
    },
    {
        name: 'Standard',
        description: ['14 days support'],
        features: [
            'UI/UX Design',
            'Develop',
            'QA',
            'Source code',
            'Publishing',
        ],
        price: 'from $1400',
    },
    {
        name: 'Pro',
        description: ['20 days support'],
        features: [
            'UI/UX Design',
            'Develop',
            'QA',
            'Source code',
            'Publishing',
            'Apple developer account',
            'Meta for App Store',
        ],
        price: 'from $2500',
    },
    {
        name: 'Premium',
        description: ['30 days support'],
        features: [
            'UI/UX Design',
            'Develop',
            'QA',
            'Source code',
            'Publishing',
            'Apple developer account',
            'Meta for App Store',
            'Appstore traffic',
        ],
        price: 'from $5000',
    },
    {
        name: 'Enterprise',
        description: ['Project flow of 10+ projects per week'],
        features: ['Custom Project Management'],
        price: 'Contact us',
    },
];

const initializeServices = async () => {
    try {
      await connectDB();
      console.log('Connected to the database.');
  
      await Service.deleteMany();
      console.log('Existing services removed.');
  
      for (const service of initialServices) {
        await Service.create(service);
        console.log(`Service ${service.name} initialized.`);
      }
  
      console.log('All services initialized successfully.');
      mongoose.connection.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error initializing services:', error);
      process.exit(1);
    }
  };
  

initializeServices();

// cd /Users/annakotlyar/Desktop/projects/echoapp/backend
// node models/InitServices.js
import * as Yup from 'yup';

const validationSchema = Yup.object({

    name: Yup.string()
        .min(3)
        .max(50)
        .required('Name is required'),

    mobileNumber: Yup.string()
        .matches(/^(?:\+?380\d{9}|\d{10})$/, 'Mobile number must be in a valid format: +380XXXXXXXXX or 096XXXXXXXX')
        .required('Mobile number is required'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    socialNetwork: Yup.string()
        .max(100)
        .optional(),

    country: Yup.string()
        .min(2)
        .max(50)
        .required('Country is required'),

    selectedService: Yup.string()
        .oneOf(
            ['Basic', 'Standard', 'Pro', 'Premium', 'Enterprise'],
            'Invalid service selection'
        )
        .required('Service is required'),

    message: Yup.string()
        .max(2000)
        .optional()
});

export default validationSchema;
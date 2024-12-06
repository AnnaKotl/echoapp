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

    country: Yup.string()
        .min(2)
        .max(50)
        .required('Country is required'),

    city: Yup.string()
        .min(2)
        .max(50)
        .optional(),

    selectedService: Yup.string()
        .oneOf(
            ['IOS-app-1', 'IOS-app-2', 'IOS-app-3', 'IOS-app-4', 'IOS-app-5', 'IOS-app-6'],
            'Invalid service selection'
        )
        .required('Service is required'),

    message: Yup.string()
        .max(2000)
        .optional(),

    socialNetwork: Yup.string()
        .max(100)
        .optional()
});

export default validationSchema;

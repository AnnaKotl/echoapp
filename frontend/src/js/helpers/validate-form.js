import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must not exceed 50 characters')
        .required('Name is required'),

    mobileNumber: Yup.string()
        .matches(/^[\d\s()+\-]{5,}$/, 'Please enter a valid mobile number, at least 5 characters long')
        .required('Mobile number is required'),

    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),

    socialNetwork: Yup.string()
        .max(100, 'Social network URL must not exceed 100 characters')
        .optional(),

    country: Yup.string()
        .min(2, 'Country name must be at least 2 characters')
        .max(50, 'Country name must not exceed 50 characters')
        .required('Country is required'),

    selectedService: Yup.string()
        .oneOf(
            ['Basic', 'Standard', 'Pro', 'Premium', 'Enterprise'],
            'Invalid service selection'
        )
        .required('Service is required'),

    message: Yup.string()
        .max(2000, 'Message must not exceed 2000 characters')
        .optional()
});

export default validationSchema;
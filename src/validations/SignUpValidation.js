import * as yup from "yup"

export const SignUpValidationSchema = yup.object().shape({
    name: yup
    .string()
    .min(3, ({min}) => `Name must be at least ${min} characters`)
    .required('Name is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required'),
    email: yup
      .string()
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(2, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .min(2, ({ min }) => `Password must be at least ${min} characters`)
      .required('Confirm Password is required'),
  })
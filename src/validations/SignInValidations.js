import * as yup from "yup"

export const SignInValidationSchema = yup.object().shape({
    name: yup
    .string()
    .min(3, ({min}) => `İsim En Az ${min} Karakterden Oluşmalı`)
    .required('Lütfen İsim Girin'),
    password: yup
      .string()
      .min(2, ({ min }) => `Şifre En Az ${min} Karakterden Oluşmalı`)
      .required('Lütfen Şifre Giriniz'),
  })
import * as yup from "yup"

export const ProfileUpdateSchema = yup.object().shape({
    name: yup
    .string()
    .min(3, ({min}) => `İsim En Az ${min} Karakterden Oluşmalı`)
    .required('Lütfen İsim Girin'),
    email: yup
      .string()
      .required('Lütfen Email Adresi Girin'),
    password: yup
      .string()
      .min(2, ({ min }) => `Şifre En Az ${min} Karakterden Oluşmalı`)
      .required('Lütfen Şifre Giriniz'),
    confirmPassword: yup
    .string()
    .min(2, ({ min }) => `Şifre En Az ${min} Karakterden Oluşmalı`)
    .required('Lütfen Şifrenizi Doğrulayın'),
  })
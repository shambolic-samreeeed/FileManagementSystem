import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  email:Yup.string().email('Invalid Email').required("Required"),
  password: Yup.string().min(6, 'Minimum 6 Characters Required').required("Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords dont match').required('Please confirm your password!')

});

export const loginSchema = Yup.object().shape({
  email:Yup.string().email('Invalid Email').required("Required"),
  password: Yup.string().required('Required')
})
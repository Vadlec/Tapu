import {User, Error} from '../types';
const validateForm = (key: keyof User, text: string): Error => {
  let error: Error = {iserror: false, message: null};
  if (text.trim().length == 0) return error;
  if (key == 'email') {
    // check if email is valid email format.
    error = validateEmail(text);
  }
  if (key == 'password') {
    error = validatePassword(text);
  }
  return error;
};
export default validateForm;

export const validateEmail = (email: string): Error => {
  let error: Error = {iserror: false, message: null};

  if (!email.includes('@'))
    //perfect validation
    return {
      iserror: true,
      message: 'Invalid Email Adress',
    };
  else return error;
};

export const validatePassword = (password: string): Error => {
  let error: Error = {iserror: false, message: null};
  if (password.length < 6)
    return {
      iserror: true,
      message: 'Password must contain at least 6 characters',
    };
  else return error;
};

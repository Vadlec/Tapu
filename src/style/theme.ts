import {DefaultTheme} from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    // --- Colors ---
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    activeColor: string;
    inActiveColor: string;
    disabledColor: string;
    buttonTextColor: string;
    textColor: string;
    iconColor: string;
    white: string;
  }
}

export const lightTheme: DefaultTheme = {
  backgroundColor: '#FEFEFE',
  primaryColor: '#E82223',
  secondaryColor: '#ECD03F',
  activeColor: '#0DAFC0',
  inActiveColor: '#64738C',
  disabledColor: '#BBC3CF',
  buttonTextColor: '#FFFFFF',
  textColor: '#121212',
  iconColor: '#4D4D4D',
  white: '#FFFFFF',
};
/**
 * 
export const darkTheme: DefaultTheme = {
  primaryColor: '#fff',
  secondaryColor: '#cacaca',
};

 */

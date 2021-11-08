import {ImageSourcePropType} from 'react-native';

export interface UserState {
  user: User | null;
  loggedin: boolean;
  loading: boolean;
  locale: string;
}

export interface User {
  name: string | null;
  email: string;
  password?: string | null;
  token?: string;
  items: ListItem[];
  currentItemPrice: number;
}

export type InputProps = {
  key: string;
  input?: string;
  focused?: boolean;
  error?: boolean;
  errorMessage?: string | null;
};

export interface ListItem {
  name: string;
  age: string;
  'city-suffix': string;
  'city-prefix': string;
  price: string;
  rating: string;
  id: string;
  distance: string;
  imageURL: ImageSourcePropType;
}

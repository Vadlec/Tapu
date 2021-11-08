import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function loginToFirebase(
  email: string,
  password: string,
  rememberMe: boolean = false,
): Promise<FirebaseAuthTypes.UserCredential> {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCreds => {
        resolve(userCreds);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          reject('That email address is invalid!');
        } else reject('Wrong Email or Password');
      });
  });
}
export default loginToFirebase;

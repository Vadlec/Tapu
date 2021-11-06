import auth from '@react-native-firebase/auth';

function registerToFirebase(email: string, password: string, name: string) {
  return new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        auth()
          .currentUser?.updateProfile({
            displayName: name,
          })
          .then(a => {
            resolve(user);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          reject('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          reject('That email address is invalid!');
        }
        if (error.code == 'auth/weak-password') {
          reject('The password is too weak.');
        } else reject(error);
      });
  });
}
export default registerToFirebase;

import { db } from './clientApp';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  college: string;
  education: string;
}

export const addUserToFirestore = async (userId: string, data: UserData) => {
  await setDoc(doc(db, 'users', userId), {
    ...data,
    role: 'student',
  });
};

export const getUserFromFirestore = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { uid: userId, ...docSnap.data() };
  } else {
    console.log('No such document!');
    return null;
  }
};

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const signUp = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      })
    } catch(error)
    {
      console.log(error)
      toast.error(error.code.split('/')[1].split("-").join(" "));
    }
  }

  export const login = async (email, password) => {
    try{
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error)
    {
      console.log(error)
      toast.error(error.code.split('/')[1].split("-").join(" "));
    }
  }

  export const logout = () => {
    signOut(auth);
  }
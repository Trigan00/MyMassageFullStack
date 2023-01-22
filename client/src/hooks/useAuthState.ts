import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setUser } from "../store/slices/userSlice";

export const useAuthState = () => {
  const dispatch = useTypedDispatch();
  const [isPending, setPending] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const role: string | null = docSnap.exists()
          ? docSnap.data().role
          : null;

        const token = await user.getIdToken();
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            role: role,
            isVerified: user.emailVerified,
            token: token,
          })
        );
        setPending(false);
      } else {
        setPending(false);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return { isPending };
};

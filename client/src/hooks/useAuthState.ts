import { getAuth } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { useTypedSelector } from "../store/hooks/useTypedSelector";
import { setUser } from "../store/slices/userSlice";

export const useAuthState = () => {
  const dispatch = useTypedDispatch();
  const [isPending, setPending] = useState<boolean>(true);
  const selector = useTypedSelector((state) => state.user);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const userData: DocumentData | null = docSnap.exists()
          ? docSnap.data()
          : null;

        const token = await user.getIdToken();
        dispatch(
          setUser({
            username: userData && userData.username,
            email: user.email,
            id: user.uid,
            role: userData && userData.role,
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
  }, [dispatch, selector]);

  return { isPending };
};

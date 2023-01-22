import { useTypedSelector } from "../store/hooks/useTypedSelector";

export function useAuth() {
  const { email, id, role, /* prime,  */ isVerified, token } = useTypedSelector(
    (state) => state.user
  );

  return {
    isAuth: !!email,
    email,
    id,
    role,
    // prime,
    isVerified,
    token,
  };
}

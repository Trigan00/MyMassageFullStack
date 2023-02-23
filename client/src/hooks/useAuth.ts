import { useTypedSelector } from "../store/hooks/useTypedSelector";

export function useAuth() {
  const { username, email, id, role, isVerified, token } = useTypedSelector(
    (state) => state.user
  );

  return {
    isAuth: !!email,
    username,
    email,
    id,
    role,
    isVerified,
    token,
  };
}

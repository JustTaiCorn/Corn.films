import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, checkAuth } from "@/redux/features/userThunks";
import { setCheckingAuth, setAuthState } from "@/redux/features/userSlice";

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const { isCheckingAuth, user } = useSelector((state) => state.user);

  useEffect(() => {
    const initAuth = async () => {
      dispatch(setCheckingAuth(true));

      try {
        if (!user) {
          await dispatch(checkAuth()).unwrap();
        }
      } catch (error) {
        dispatch(
          setAuthState({
            user: null,
            isAuthenticated: false,
            accessToken: null,
          })
        );
      } finally {
        dispatch(setCheckingAuth(false));
      }
    };

    initAuth();
  }, [dispatch]);

  return { isCheckingAuth };
};

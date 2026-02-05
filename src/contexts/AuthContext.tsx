"use client";

import {
  getUserApi,
  logoutApi,
  signinApi,
  signupApi,
} from "@/services/authServices";
import { SigninRequest, SignupRequest, User } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import toast from "react-hot-toast";

// Types Definition
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signup: (values: SignupRequest) => void;
  signin: (values: SigninRequest) => void;
  logout: () => void;
}

interface AuthStateType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type LoadingAction = { type: "LOADING" };
type SignupAction = { type: "SIGNUP"; payload: User };
type SigninAction = { type: "SIGNIN"; payload: User };
type UserLoadedAction = { type: "USER/LOADED"; payload: User };
type LogoutAction = { type: "LOGOUT" };
type RejectedAction = { type: "REJECTED"; payload: string };
type Action =
  | LoadingAction
  | SignupAction
  | SigninAction
  | UserLoadedAction
  | LogoutAction
  | RejectedAction;

// Data initialization
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const Initial_State: AuthStateType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Reducer Function
const authReducer = (state: AuthStateType, action: Action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
      };

    case "SIGNUP":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "SIGNIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "USER/LOADED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case "REJECTED":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Provider Component
export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    Initial_State,
  );

  async function signup(values: SignupRequest) {
    dispatch({ type: "LOADING" });

    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "SIGNUP", payload: user });
      router.push("/profile");
      toast.success(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";

      dispatch({ type: "REJECTED", payload: message });
      toast.error(message);
    }
  }

  async function signin(values: SigninRequest) {
    dispatch({ type: "LOADING" });

    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "SIGNIN", payload: user });
      router.push("/profile");
      toast.success(message);
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";

      dispatch({ type: "REJECTED", payload: message });
      toast.error(message);
    }
  }

  async function getUser() {
    dispatch({ type: "LOADING" });

    try {
      const { user } = await getUserApi();
      dispatch({ type: "USER/LOADED", payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";

      dispatch({ type: "REJECTED", payload: message });
      toast.error(message);
    }
  }

  async function logout() {
    dispatch({ type: "LOADING" });

    try {
      const { message } = await logoutApi();
      dispatch({ type: "LOGOUT" });
      router.push("/");
      toast.success(message || "با موفقیت از سایت خارج شدید.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "خطای ناشناخته";

      dispatch({ type: "REJECTED", payload: message });
      toast.error(message);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      await getUser();
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

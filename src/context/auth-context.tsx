import { getMe } from "@/services/modules/auth.service";
import { UserInfo } from "@/types/user";
import { getFromSecureStore } from "@/utils/useSecureStorage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  token: string | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  loading: boolean;
  setToken: (token: string | null) => void;
  setUserInfo: (profile: UserInfo | null) => void;
  setSession: (token: string) => Promise<void>;
  clearSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFromSecureStore("token").then((storedToken) => {
      setToken(storedToken);
      setIsAuthenticated(!!storedToken);

      handleFetchUserInfo();
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const handleFetchUserInfo = async () => {
    setLoading(true);
    // TODO: Fetch user data from API

    await getMe().then((data) => {
      if (data.success) {
        setUser(data.data);
      }
    });
    setLoading(false);
  };

  // Example: Save token to secure store on login
  const setSession = async (newToken: string) => {
    // setLoading(true);
    // Save token to secure store
    // You may want to use expo-secure-store's setItemAsync here
    // For now, just update state
    setToken(newToken);
    setIsAuthenticated(true);
    // setLoading(false);
  };

  const setUserInfo = (profile: UserInfo | null) => {
    setUser(profile);
  };

  // Example: Remove token from secure store on logout
  const clearSession = async () => {
    // setLoading(true);
    // Remove token from secure store
    // You may want to use expo-secure-store's deleteItemAsync here
    setToken(null);
    setIsAuthenticated(false);
    // setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo: user,
        isAuthenticated,
        loading,
        setToken,
        setUserInfo,
        setSession,
        clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

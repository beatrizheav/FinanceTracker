import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    setUser((prevUser) => {
      if (JSON.stringify(prevUser) !== JSON.stringify(parsedUser)) {
        return parsedUser;
      }
      return prevUser;
    });
  };

  return { user, setUser };
};

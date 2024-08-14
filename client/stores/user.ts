import { defineStore } from "pinia";
import type { Login, Signup, User, UserProfile } from "~/types/types";

const BASE_URL = "http://localhost:10000/api";

export const useUserStore = defineStore("user", () => {
  const user = ref(0);
  const token = useCookie("MY_COOKIE", {
    maxAge: 60 * 60,
  });
  const setToken = (data?: string) => {
    token.value = data;
  };

  const setUser = (data?: any) => {
    user.value = data;
  };

  const login = async (data: Login) => {
    try {
      const res = await $fetch<User>(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: data,
      });

      setToken(res.token);
      await profile();
    } catch (error) {
      console.log(error);
      setToken();
      setUser();
    }
  };

  const signup = async (data: Signup) => {
    try {
      const res = await $fetch<any>(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: data,
      });
      setToken(res.token);
      await profile();
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };

  const profile = async () => {
    if (token.value) {
      try {
        const res = await $fetch<UserProfile>(`${BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        setUser(res);
      } catch (error) {
        setUser();
        console.log(error);
      }
    }
  };

  const updateProfile = async (data: {
    username?: string;
    password?: string;
  }) => {
    if (!token.value) {
      console.error("No token available");
      return;
    }

    try {
      const res = await $fetch(`${BASE_URL}/user/profile`, {
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      });
      setUser(res);
      await profile();
    } catch (error) {
      setUser();
      console.error("Profile update failed:", error);
    }
  };

  const logout = async () => {
    setUser();
    setToken();
  };

  return { user, token, login, signup, profile, logout, updateProfile };
});

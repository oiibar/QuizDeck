import { defineStore } from "pinia";
import type { Login, User, UserProfile } from "~/types/user";

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
      const res = await $fetch<User>("http://localhost:10000/api/auth/login", {
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

  const signup = async (data: any) => {
    try {
      const res = await $fetch<User>("http://localhost:10000/api/auth/signup", {
        method: "POST",
        body: data,
      });
      setToken(res.token);
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };

  const profile = async () => {
    if (token.value) {
      try {
        const res = await $fetch<UserProfile>(
          "http://localhost:10000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        setUser(res);
      } catch (error) {
        setUser();
        console.log(error);
      }
    }
  };

  const logout = async () => {
    setToken();
    setUser();
  };

  return { user, token, login, signup, profile, logout };
});

import api from "../api/axios";

export const fetchUserData = async (token: string) => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.user;
};

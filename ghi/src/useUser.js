import { useEffect, useState } from "react";

const useUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        credentials: "include",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const result = await res.json();
      setUser(result.account);
    };

    if (token) {
      getUser();
    }
  }, [token]);

  return { user: user };
};

export default useUser;

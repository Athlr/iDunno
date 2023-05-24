import { useEffect, useState } from 'react';



const useUser = (token) => {
    cosnt [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${preocess.env.REACT_APP_API_HOST}/token`, {
                headers:{
                    Authorization: `bearer ${token}`,
                }
            });
            const result = await response.json();
            setUser(result.account)
        }

        if(token){
            getUser();
        }
    }, [token]);

    return user;

};

export default useUser;


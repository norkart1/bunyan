import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionUser } from '@/store/authStore'; // Zustand store
import { CHECK_LOGGED_IN } from '@/graphql/queries/auth'; // GraphQL function
import { useDynamicQuery } from './useFetchData';

const useAuth = () => {
    const navigate = useNavigate();
    const setUser = useSessionUser((state) => state.setUser); // Zustand method to set user
    const user = useSessionUser((state) => state.user);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('token');

        const validateSession = async () => {
            if (!accessToken) {
                // If no token, check if the user is logged in via GraphQL
                try {
                    const { data } = useDynamicQuery({
                        operationName: 'checkLoggedIn',
                        entity: 'checkLoggedIn',
                        fields: ['token', 'user { role, id, username, mahalluId, zoneId, villageId, districtId }'],
                    })
                    if (data?.loggedIn) {
                        setUser(data.user); // Update Zustand with user data
                    } else {
                        navigate('/login'); // Redirect to login page
                    }
                } catch (error) {
                    console.error('Error checking login status:', error);
                    navigate('/login'); // Redirect on failure
                }
            }
        };

        validateSession();
    }, [navigate, setUser, user]);

    return user;
};

export default useAuth;

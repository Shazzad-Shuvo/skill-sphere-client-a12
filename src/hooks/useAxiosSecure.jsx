import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();

    axios.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function(response){
        return response;
    }, function(error){
        const status = error.response.status;
        if(status === '401' || status === '403'){
            logOut();
            navigate('/');
        }

        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;
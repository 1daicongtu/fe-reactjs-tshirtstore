import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestNewAccessToken } from "../../redux/slices/userLogin";


const CheckExpiredToken = (props) => {
    let location = useLocation()
    const dispatch = useDispatch();

    const parseJwt  = (token)=>{
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    }

    useEffect(()=>{
        const accessToken = sessionStorage.getItem("accessToken");

        if (accessToken){
            
            const decodeJwt = parseJwt(accessToken);
            if (decodeJwt.exp < Date.now() / 1000){
                dispatch(requestNewAccessToken())
            }
        }

    }, [location, props])

    return (
        <>
            

        </>
    );
};

export default CheckExpiredToken;
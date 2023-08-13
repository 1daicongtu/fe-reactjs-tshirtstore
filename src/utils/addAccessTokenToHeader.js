import axios from "axios";

const addAccessTokenToHeader = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
}

export default addAccessTokenToHeader;
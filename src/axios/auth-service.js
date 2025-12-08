
import axios from "axios";


const instance=axios.create({
    baseURL: process.env.REACT_APP_AUTH_SERVICE || "https://driving-school-website-2q9l.onrender.com/"
});

export default instance;

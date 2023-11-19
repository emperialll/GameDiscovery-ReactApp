import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '858ba02c5a5d45619015447ab476440a'
    }
})
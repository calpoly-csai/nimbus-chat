import axios from "axios";

axios.defaults.baseURL = "https://calpoly-csai-nimbus.herokuapp.com";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

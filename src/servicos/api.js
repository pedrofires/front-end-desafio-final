import axios from "axios";

export default axios.create({
   baseURL: "https://lorem-ipsum-bd.herokuapp.com/",
   timeout: "10000",
   headers: {
      "Content-Type": "application/json",
   },
});

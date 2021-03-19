import axios from "axios";

export default axios.create({
  baseURL: "https://metrimeo-react.herokuapp.com/api/",
});
// export default axios.create({
//   baseURL: "http://192.168.8.100:3000",
// });

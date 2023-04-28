import axios from "axios";

const api = axios.create({
  baseURL: 'https://my-json-server.typicode.com/sunho5810/WDTT/db',
  // baseURL: 'http://localhost:5000',
  headers: {'X-Custom-Header': 'foobar'}
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  // axios.post("url", {
  //   username: "",
  //   password: ""
  // })
  // .then(function (response) {
  //     // response  
  // }).catch(function (error) {
  //     // 오류발생시 실행
  // }).then(function() {
  //     // 항상 실행
  // });

  export default api;
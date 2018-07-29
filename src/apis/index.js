
import axios from 'axios';
import apiList from './apiList';
import router from '../router';
import qs from "qs";
import {
  Loading
} from 'element-ui'

let loadinginstace
axios.interceptors.request.use(config => { 

  loadinginstace = Loading.service({
    fullscreen: true
  }); 
  return config
}, error => { 
  loadinginstace.close(); 
  return Promise.reject(error)
})
let baseUrl = "";
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
  loadinginstace.close()
  return data
}, error => { 
  loadinginstace.close();
  let status = error.response.status
  status == 401 ? router.push({ name: 'Login', params: { forward: true }}): null
  return Promise.reject(error)
});
let api = {};

let post = (url, data = {}) => {
  return axios.post(baseUrl+url, qs.stringify(data));
}
let get = (url,params={})=>{
  return axios.get(baseUrl+url,{
    params
  });
}
let all = (array) => {
  return axios.all(array);
}
for (let key in apiList) {
  if (apiList[key].method == "POST") {
    api[key] = (data = {}) => {
      return post(apiList[key].url, data);
    }
  }
  if(apiList[key].method == "GET"){
    api[key] = (params = {})=>{
      return get(apiList[key].url, params)
    }
  }
  if(apiList[key].method  == "GET_URL"){
    api[key] = (v)=>{
      return get(apiList[key].url+"/"+v)
    }
  }
}

//搜索，图片上传使用from提交
api.search = (obj, callBack) => {
  let param = new FormData()
  for(let item in obj){
    param.append(item,obj[item])
  }

  let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': "Bearer "+localStorage.getItem("access_token")
      }
  }
  axios.post('/api/goods/find', param, config)
      .then(res => {
        callBack && callBack(res)
      }).catch(error => {
        let status = error.response.status
        status == 401? router.push({name: 'Login'}): null
        return Promise.reject(error)
      })
}
export default api;

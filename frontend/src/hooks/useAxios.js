import axios from "axios";

export const useAxios = axios.create({
  headers: { "Content-Type": "application/json"},
});


export const useCustomAxios = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

useCustomAxios.interceptors.response.use((response)=>{
  if(response.status=== 401){
      alert("yes")
  }
})

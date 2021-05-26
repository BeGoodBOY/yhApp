import axios from 'axios';
export const upload = (file) => {
  let param = new FormData();
  param.append('file', file);
  let config = { 
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return axios
    .post("https://upload.dafy.com/Servlet/fileUpload.svl", param, config)
    .then((response) => {
      return response.data;
    })
    .catch((err)=>{
      return false;
    });
}


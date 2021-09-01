import axios from "axios";
var user = JSON.parse(localStorage.getItem('profile'));
var gtoken;
if(user){
gtoken=user.token;
}
const url = " https://crudtable2021.herokuapp.com/table/";
//const url=" http://localhost:5005/table/";
export const fetchTableApi = async (data) => {
  var result;
  await axios.post(url,data).then((res) => {
    result = res;
  });
  return result;
};

export const deleteTableApi = async (data) => {
  var result;
 
  await axios.post(url+"drop",{data}).then((res) => {
    result = res;
  });
  return result;
};



export const insertTableApi = async (data) => {
  var result;
  console.log(data);
  await axios.post("https://crudtable2021.herokuapp.com/table/add",data).then((res) => {
    result = res;
  });

  return result;
};

export const updateTableApi = async (data) => {
  var result;
  console.log(data);
  await axios.post(url+"update",data).then((res) => {
    result = res;
  });
  return result;
};


export const sendEmailapi = async (data) => {
  var result;
  console.log(data);
 await axios.post(url+"mail",data).then((res) => {
    result = res;
  });
 return result;
};

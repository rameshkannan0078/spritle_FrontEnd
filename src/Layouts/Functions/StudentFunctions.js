import { globalUrl } from "../../global/global";
const Apiurl = globalUrl.apiUrl;
const file=require('../../Services/AllNumbers');



const data = (obj) => {
  return Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
}



export const FindUserDetails = (email) => {
  const webToken1=window.localStorage.getItem("access_token")
  const token1 = `Bearer ${webToken1}`;

    const FormData = {
      email: email,
    }
  
    const result = fetch(Apiurl + 'student/StudentDetail', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token1 },
      body: data(FormData)
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
  
  }



  export const SubmitTheAnswers = (id,input,master,email,finalValue)=>{
    const webToken2=window.localStorage.getItem("access_token")
const token2 = `Bearer ${webToken2}`;
    
    const FormData = {
      id:id,
      master:master,
      input:input,
      result:finalValue,
      email: email
    }
  
    const result = fetch(Apiurl + 'student/StudentAddAnswer', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2  },
      body: data(FormData)
    })
      .then(response => response)
    
      .catch((err) => {
        console.log(err)
      });
    return result;
  }


 export const CalculateTheValues = (id,inputs,master) =>{
  const spit=SplitTheValues(inputs);
  const finalVlaue=FindTheFinalValueFromSplit(spit);
  return Math.floor(eval(finalVlaue));
  }

  const FindTheFinalValueFromSplit =(arr)=>{
    let value='';
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      value=value+element;
      
    }
return value;
  }

  const SplitTheValues = (inputs) =>{
    let arr = [];
    let m = 0;
    let string_Value='';
    for (let index = 0; index < inputs.length; index++) {
   
      const element = inputs[index];
      if(element !== '(' && element !==')'){
        string_Value = string_Value + element;
      }
      else if(element !==')'){
        arr[m] =file[string_Value]();
        m=m+1
        string_Value = "";
      }
    }
    return arr;
  }


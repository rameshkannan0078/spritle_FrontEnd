import { globalUrl } from "../../global/global";


const Apiurl = globalUrl.apiUrl;


const data = (obj) => {
  return Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
}




export const MasterAddCalculationValues = (email, calculation_value) => {
  const webToken2=window.localStorage.getItem("access_token")
  const token2 = `Bearer ${webToken2}`;

  const FormData = {
    email: email,
    calculate_value: calculation_value
  };
  
  return fetch(Apiurl + 'master/MasterAddCalculationValues', {
    method: 'POST',
    headers: { 
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token2
    },
    body: data(FormData)
  })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};


  export const MasterGetAllUnCalculatedValues = () => {
    let webToken1=window.localStorage.getItem("access_token")
    let token1 = `Bearer ${webToken1}`;
    const result = fetch(Apiurl + 'master/MasterGetAllUnCalculatedValues', {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token1 },
    })
      .then(response => {
       return response;
      })
      .catch(err => {
        console.log(err)
      });

    console.log(`This the final_result ${result}`)
    return result;
  
  }



  export const   MasterGetAllAnsweredValues = () => {
    const webToken3=window.localStorage.getItem("access_token")
    const token3 = `Bearer ${webToken3}`;
    
    const result = fetch(Apiurl + 'master/MasterGetAllAnsweredValues', {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': token3 },
    })
      .then(response => {
      return response
        
        
   })
      
      .catch(err => {
        console.log(err)
      });

    console.log(`This the final_result ${result}`)
    return result;
  
  }
  export const checkTheGivenInput = (inputsvalue) => {
   
    let open = 0;
    let close = 0;
    for (let index = 0; index < inputsvalue.length; index++) {
      const element = inputsvalue[index];
      if (element === '(') {
        open++;
      }
      if (element === ')') {
        close++;
      }
    }
    if (open !== close || open === 0 || close === 0) {
      return true;
    }
    return false;
  };
  
  export const checkTheGivenInputOperations = (inputs) => {
    const num = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const Operations = ['plus', 'minus', 'times', 'dividedby'];
    let inputs1 = "";
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] !== ")") {
        inputs1 += inputs[i];
      }
    }
    const arr = inputs1.split("(");
    const filteredArr = arr.filter(el => el !== "");
    if(Operations.includes(filteredArr[filteredArr.length-1])){
      return true;
    }
    let i = 0;
    const finalArr = [];
    for (let index = 0; index < filteredArr.length; index++) {
      const element = filteredArr[index];
      if (index % 2 === 0) {
        const num1 = num.indexOf(element);
        finalArr[i++] = num1;
      } else {
        const num2 = Operations.indexOf(element);
        finalArr[i++] = num2;
      }
    }

    for (let index = 0; index < finalArr.length; index++) {
      const element = finalArr[index];
      if(element===-1){
        return true;
      }
    }
    return false;
  };

  
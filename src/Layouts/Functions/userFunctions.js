import { globalUrl } from "../../global/global";

const Apiurl = globalUrl.apiUrl;

const data = (obj) => {
  return Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
}


export const LoginUser = (email, password, user_type) => {
  const FormData = {
    email: email,
    password: password,
    user_type: user_type
  }

  const result = fetch(Apiurl + 'user/userlogin', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: data(FormData)
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch((err) => {
      console.log(err)
    });
  return result;
};


export const SignupUser = (email, name, password, user_type) => {

  const FormData = {
    email: email,
    password: password,
    name: name,
    user_type: user_type
  }

  const result = fetch(Apiurl + 'user/adduser', {
    
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: data(FormData)
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch((err) => {
      console.log(err)
    });
  return result;

};


export const FindUserExist = (email) => {

  const FormData = {
    email: email,
  }

  const result = fetch(Apiurl + 'user/usercheck', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: data(FormData)
  })
    .then(response => response.json())
    .then(data => {
      return data.message
    })
    .catch((err) => {
      console.log(err)
    });
  return result;

}
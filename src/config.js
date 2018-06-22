import uuid from 'uuid/v4';

export const api = "http://localhost:3001";
let token = localStorage.token;
if (!token){
	token = uuid();
}

export const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}
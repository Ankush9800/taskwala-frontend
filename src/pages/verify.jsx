import React, { useEffect } from 'react'
import { Client, Account } from "appwrite";

function verify() {

useEffect(()=>{
  const client = new Client()
    .setEndpoint(`${import.meta.env.VITE_APPWRITE_ENDPOINT}`)
    .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);

const account = new Account(client);
console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const urlParams = new URLSearchParams(window.location.search);
const secret = urlParams.get('secret');
const userId = urlParams.get('userId');

const promise = account.updateVerification(userId, secret);

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});
},[])

  return (
    <div>verify</div>
  )
}

export default verify
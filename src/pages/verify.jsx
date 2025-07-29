import React from 'react'
import { Client, Account } from "appwrite";

function verify() {

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('<PROJECT_ID>');

const account = new Account(client);

const urlParams = new URLSearchParams(window.location.search);
const secret = urlParams.get('secret');
const userId = urlParams.get('userId');

const promise = account.updateVerification(userId, secret);

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});

  return (
    <div>verify</div>
  )
}

export default verify
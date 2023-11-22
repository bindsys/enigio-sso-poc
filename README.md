# Proof of Concept: Single Sign-On Implementation for Enigio and iBindSystems

## Overview

This document outlines the steps and considerations for implementing Single Sign-On (SSO) between Enigio and iBindSystems as part of a proof of concept.

### Objective

The primary goal of this proof of concept is to demonstrate the feasibility and functionality of enabling SSO between Enigio and iBindSystems. This will streamline user authentication and access across both platforms, enhancing user experience and security.

## Getting Started
The project needs to be run as separate frontend (reactJS) and backend(Nodejs) applications.  
1. **Setup:** 
    - Backend 
        - Run `npm install` to install dependencies
        - Create a `.env` file inside the `poc_be` folder
        - Add the below configuration
        ```
        COGNITO_CLIENT_ID=xxxxxxx
        COGNITO_DOMAIN_NAME_URL=https://xxxxxxxx.auth.xxxxxxxx.amazoncognito.com
        COGNITO_LOGIN_GRANT_TYPE=authorization_code
        COGNITO_LOGIN_REDIRECT_URL=http://localhost:3000/
        COGNITO_LOGIN_RESPONSE_TYPE=code
        COGNITO_LOGIN_SCOPE=email+openid
        COGNITO_LOGOUT_REDIRECT_URL=http://localhost:4200/oauth/cognito/logout
        COOKIE_SESSION_NAME=nodejs-cognito-oauth
        COOKIE_SESSION_SECRET=xxxxxx
        HOSTNAME=::
        PORT=4200
        ```
        - replace `COGNITO_CLIENT_ID` and `COGNITO_DOMAIN_NAME_URL` with the actual client ID and URL shared with the mail.
    - Frontend 
        - Run `npm install` to install dependencies
        - Create a `.env` file inside the `poc_fe` folder
        - Add the below configuration
        ```
        REACT_APP_API_URL=http://localhost:4200  // backend service url
        ```
2. **Testing**
    - Open localhost:3000 and click on the initiate SSO.
    - Enter the email and password 
    - Once the Authentication is successful the token and decoded token both will be available in the console.
        
    


  

    

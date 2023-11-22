let axios = require("axios");
let qs = require("qs");

let {
  COGNITO_CLIENT_ID,
  COGNITO_DOMAIN_NAME_URL,
  COGNITO_LOGIN_GRANT_TYPE,
  COGNITO_LOGIN_REDIRECT_URL,
  COGNITO_LOGIN_RESPONSE_TYPE,
  COGNITO_LOGIN_SCOPE,
  COGNITO_LOGOUT_REDIRECT_URL,
} = process.env;

const getUserInfo = async ({ accessToken }) => {
  let url = `${COGNITO_DOMAIN_NAME_URL}/oauth2/userInfo`;
  let { data } = await axios({
    url,
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

const postToken = async ({ code, channel = 1 }) => {
  try {
    let url = `${COGNITO_DOMAIN_NAME_URL}/oauth2/token`;
    let params = {
      grant_type: COGNITO_LOGIN_GRANT_TYPE,
      client_id: COGNITO_CLIENT_ID,
      redirect_uri: COGNITO_LOGIN_REDIRECT_URL,
      code,
    };
    let {data} = await axios({
      url,
      method: "post",
      data: qs.stringify(params),
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const getLogin = async (channel) => {
  const uri = COGNITO_LOGIN_REDIRECT_URL;
  let params = {
    client_id: COGNITO_CLIENT_ID,
    response_type: COGNITO_LOGIN_RESPONSE_TYPE,
    scope: COGNITO_LOGIN_SCOPE,
    redirect_uri: uri,
  }
  
  let url = `${COGNITO_DOMAIN_NAME_URL}/login?${qs.stringify(params, { encode: false })}`;
 
  return url;
};

const getLogout = async () => {
  let params = {
    client_id: COGNITO_CLIENT_ID,
    logout_uri: COGNITO_LOGOUT_REDIRECT_URL,
    redirect_uri: COGNITO_LOGOUT_REDIRECT_URL,
    response_type: 'code'
  }
  let url = `${COGNITO_DOMAIN_NAME_URL}/logout?${qs.stringify(params, { encode: false })}`;
  return url;
};

module.exports = { getUserInfo, postToken, getLogin, getLogout };

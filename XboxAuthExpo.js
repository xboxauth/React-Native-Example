import { AuthSession } from 'expo';
import axios from 'axios'

const XBOX_AUTH_URL       = '{YOUR_APP_ID_HERE}.xboxauth.dev'
const XBOX_AUTH_REDIRECT  = 'https://callback.xboxauth.dev'
const XBOX_AUTH_CLAIM     = 'https://claim.xboxauth.dev'
const AZURE_APP_ID        = '{YOUR_APP_ID_HERE}'
const AZURE_APP_SECRET    = '{YOUR_APP_SECRET_HERE}'

const startAsync = async () => {
  try {
    let auth = await AuthSession.startAsync({
      authUrl: XBOX_AUTH_URL,
      returnUrl: XBOX_AUTH_REDIRECT
    });

    const regex = /code=([^&]*)/
    const regexResult = auth.url.match(regex)
    const code = regexResult[1]

    let claim = await axios.post(
      XBOX_AUTH_CLAIM +
      `?code=${code}` +
      `&app_id=${AZURE_APP_ID}` +
      `&secret=${AZURE_APP_SECRET}`
    )

    if (claim.data) {

      return claim.data
    }


  } catch (error) {

  }

  return null
}

const getUserWithCode  = async (code) => {
  let claim = await axios.post(
    XBOX_AUTH_CLAIM +
    `?code=${code}` +
    `&app_id=${AZURE_APP_ID}` +
    `&secret=${AZURE_APP_SECRET}`
  )

  if (claim.data) {

    return claim.data
  }
}

// Xbox Service Functions
export default {
  getUserWithCode,
  startAsync
};

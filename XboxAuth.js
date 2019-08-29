import axios from 'axios'
import InAppBrowser from "react-native-inappbrowser-reborn"

const XBOX_AUTH_URL       = '{YOUR_APP_ID_HERE}.xboxauth.dev'
const XBOX_AUTH_REDIRECT  = 'https://callback.xboxauth.dev'
const XBOX_AUTH_CLAIM     = 'https://claim.xboxauth.dev'
const AZURE_APP_ID        = '{YOUR_APP_ID_HERE}'
const AZURE_APP_SECRET    = '{YOUR_APP_SECRET_HERE}'

const startAsync = async () => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const auth = await InAppBrowser.openAuth(XBOX_AUTH_URL, XBOX_AUTH_REDIRECT)

      if (auth.type === "cancel") {
        return null
      }

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

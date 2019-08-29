# React-Native-Example

- [Dependencies](#dependencies)
- [React Native projects with Expo](#react-native-projects-with-expo)
- [React Native projects without Expo](#react-native-projects-without-expo)
- [Contributors](#contributors)

## Dependencies
This code snippet has one or two dependencies, depending on the React Native project.

 * [axios](https://github.com/axios/axios)
 * [react-native-inappbrowser-reborn](https://github.com/proyecto26/react-native-inappbrowser) (Only for non-expo projects) 

## React Native projects with Expo
For Expo projects you will use AuthSession to authenticate through web. See on `XboxAuthExpo` file. This has not been tested in an Expo project yet, so may not work.

## React Native projects without Expo
For Non-Expo projects you will have to use `react-native-inappbrowser-reborn` library to authenticate through web. In iOS you will find 
no issues but in Android once the web page is closed it won't continue. So you have to create a Listener on
the `App.js` file. 
    
```js
import React, {Component} from 'react'
import { Linking } from 'react-native'
import Xbox from '../services/XboxAuth.js'

class App extends Component {
  
    async componentDidMount () {
      this._handleAppStateChange()
    }
    
    _handleAppStateChange = (nextAppState) => {
      Linking.addEventListener('url', async (params) => {
        // HERE YOU WILL RECEIVE THE URL WITH THE CODE
          
        const code = this.getCode(params.url)
        const userXbox = await Xbox.getUserWithCode(code)
        
      })
    }
    
    getCode = url => {
      const regex = /code=([^&]*)/
      const regexResult = url.match(regex)
    
      return regexResult.length > 0 ? regexResult[1] : ""
    }

}
```

#Contributors
[@sergiombravo](https://www.linkedin.com/in/sergiomunozbravo/)

#Happy coding
Made with ❤️
#  Antidote


## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm install`

**Step 4:** Install the react-native-cli `npm install -g react-native-cli`

**Step 5:** Get the extra sectret files password form @spoonscen or @securingsincity

**Step 5:** Get the first extra secret file and put it here `andriod/app/google-services.json` https://privnote.com/lIgxwB1P

**Step 6:** Get the second extra secret file and put it here `ios/GoogleService-Info.plist` https://privnote.com/TiHXDYpm


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`







## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)
* React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

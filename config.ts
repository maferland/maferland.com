import themes from 'daisyui/src/theming/themes.js'
import {ConfigProps} from './types/config'

const config = {
  // REQUIRED
  appName: 'maferland.com',
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: 'maferland.com',
  supportEmail: 'help@maferland.com',
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to _document.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: 'light',
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=light]`]['primary'],
  },
  // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in appiClient (/libs/api.js) upon 401 errors from our API & /hooks/usePrivate.js
  callbackUrl: '/dashboard',
} as ConfigProps

export default config

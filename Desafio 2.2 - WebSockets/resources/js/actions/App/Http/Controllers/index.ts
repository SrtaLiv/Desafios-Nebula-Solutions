import OAuthController from './OAuthController'
import Settings from './Settings'
const Controllers = {
    OAuthController: Object.assign(OAuthController, OAuthController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers
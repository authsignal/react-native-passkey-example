import {Amplify} from 'aws-amplify';
import {Authsignal} from 'react-native-authsignal';

Amplify.configure({
  Auth: {
    region: 'YOUR_REGION',
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_USER_POOL_CLIENT_ID',
  },
});

const authsignalArgs = {
  tenantID: 'YOUR_TENANT_ID',
  baseURL: 'YOUR_REGION_CLIENT_URL',
};

export const authsignal = new Authsignal(authsignalArgs);

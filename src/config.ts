import {Amplify} from 'aws-amplify';
import {Authsignal} from 'react-native-authsignal';

Amplify.configure({
  Auth: {
    region: 'us-west-2',
    userPoolId: 'us-west-2_VkdUWn6a2',
    userPoolWebClientId: '2cdp2u0h56vo8ikm9vhtq2nsm1',
  },
});

const authsignalArgs = {
  tenantID: '921212c3-07e6-4666-a9fe-371cdeb106bc',
  baseURL: 'https://dev-challenge.authsignal.com/v1',
};

export const authsignal = new Authsignal(authsignalArgs);

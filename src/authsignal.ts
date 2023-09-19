import {Authsignal} from 'react-native-authsignal';
import {authsignalURL, authsignalTenantID} from '../config.mjs';

const authsignalArgs = {
  tenantID: authsignalTenantID,
  baseURL: authsignalURL,
};

export const authsignal = new Authsignal(authsignalArgs);

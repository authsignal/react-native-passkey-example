import {Authsignal} from 'react-native-authsignal';
import {authsignalClientURL, authsignalTenantID} from '../config.mjs';

const authsignalArgs = {
  tenantID: authsignalTenantID,
  baseURL: authsignalClientURL,
};

export const authsignal = new Authsignal(authsignalArgs);

import {Authsignal} from '@authsignal/node';

const secret = process.env.AUTHSIGNAL_SECRET!;
const apiBaseUrl = process.env.AUTHSIGNAL_URL!;

export const authsignal = new Authsignal({secret, apiBaseUrl});

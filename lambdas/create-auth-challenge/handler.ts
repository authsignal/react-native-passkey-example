import {CreateAuthChallengeTriggerHandler} from 'aws-lambda';
import {authsignal} from '../lib';

export const handler: CreateAuthChallengeTriggerHandler = async event => {
  const userId = event.request.userAttributes.sub;

  const {token} = await authsignal.track({action: 'cognitoAuth', userId});

  event.response.publicChallengeParameters = {token};

  return event;
};

import {VerifyAuthChallengeResponseTriggerHandler} from 'aws-lambda';

import {authsignal} from '../lib';

export const handler: VerifyAuthChallengeResponseTriggerHandler =
  async event => {
    const userId = event.request.userAttributes.sub;
    const token = event.request.challengeAnswer;

    const {state} = await authsignal.validateChallenge({userId, token});

    event.response.answerCorrect = state === 'CHALLENGE_SUCCEEDED';

    return event;
  };

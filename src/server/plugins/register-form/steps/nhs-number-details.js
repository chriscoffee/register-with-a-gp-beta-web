import JoiBase from 'joi';

import {postHandlerFactory, getHandlerFactory, dependsOnBoolean} from './common';
import JoiNHSNumber from '../../../../shared/lib/joi-nhs-number-validator';
import nhsNumberStep from './nhs-number';

const Joi = JoiBase.extend(JoiNHSNumber);

const schema = Joi.object().keys({
  'nhs-number': Joi.string().nhsnumber().label('NHS number').meta({ componentType: 'textbox', variant: 'short' }),
  'submit': Joi.any().optional().strip(),
});

const title = 'What is your NHS number?';
const key = 'nhsNumberDetails';
const slug = 'nhs-number-details';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

const checkApplies = dependsOnBoolean(nhsNumberStep, 'nhs-number-known');

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers,
  checkApplies,
};

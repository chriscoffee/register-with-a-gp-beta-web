import Joi from 'joi';
import {postHandlerFactory, getHandlerFactory} from './common';

const schema = Joi.object().keys({
  'nameTitle': Joi.string().max(10).label('Title')
    .meta({
      componentType: 'dropdown' ,
      children: [
        { label: 'Mr', value: 'Mr'},
        { label: 'Mrs', value: 'Mrs'},
        { label: 'Ms', value: 'Ms'},
        { label: 'Miss', value: 'Miss'},
        { label: 'Dr', value: 'Dr'},
        { label: 'Prof', value: 'Prof'}
      ],
    }),
  'firstName': Joi.string().max(100).label('First name').meta({ componentType: 'textbox' }),
  'middleNames': Joi.string().allow('').max(100).optional().label('Middle names').meta({ componentType: 'textbox' }),
  'lastName': Joi.string().max(100).label('Last name').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
}).or('firstName', 'middleNames', 'lastName');

const title = 'What is your name?';
const key = 'name';
const slug = 'name';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers
};

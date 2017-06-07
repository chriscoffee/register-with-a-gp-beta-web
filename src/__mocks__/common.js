const common = jest.genMockFromModule('../server/plugins/register-form/steps/common');

const getlastCompletedStep = jest.fn((cookieData) => {
  return 'a';
});

common.getlastCompletedStep  = getlastCompletedStep;

export function getLatestUncompletedStep(cookieData) {
  return 'b';
}

export function checkStepCompletedBefore(requestedStepKey, latestUncompletedStep){
  return 'c';
}

export default common;


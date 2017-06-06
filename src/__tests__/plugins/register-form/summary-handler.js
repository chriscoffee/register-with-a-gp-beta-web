import {summaryGetHandler} from '../../../server/plugins/register-form/steps/summary';

describe('gethandler', () =>{
  const myMock = jest.fn();
  const b = function(){
    return 1;
  };
  const getLatestUncompletedStep = myMock.bind(b);
  
  const checkStepCompletedBefore = jest.mock('../../../server/plugins/register-form/steps/common',() => {
    return true;
  });
  it('should give back a', () => {
    const mockGet = jest.fn();
    mockGet.mockReturnValueOnce({
      state: {data: {name: 'a'}}
    });
    const gReply = {
      view: function(a,b){
        return b.name;
      },
    };
    const key = 1;
    summaryGetHandler(mockGet(), gReply);
//    expect(summaryGetHandler(mockGet(), gReply)).toBe('a');
  });

});
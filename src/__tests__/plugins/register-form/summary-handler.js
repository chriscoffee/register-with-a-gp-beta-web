import {summaryGetHandler} from '../../../server/plugins/register-form/steps/summary';
jest.mock('common');
import getlastCompletedStep from 'common';

describe('gethandler', () =>{
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
    
    console.log(getlastCompletedStep('sdsd'));
//    summaryGetHandler(mockGet(), gReply);
//    expect(summaryGetHandler(mockGet(), gReply)).toBe('a');
  });

});
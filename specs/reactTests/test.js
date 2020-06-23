import App from '../../client/src/components/App.jsx'; // eslint-disable-line import/extensions
import { shallow, mount } from 'enzyme';

describe('client components - TBD', () => {
  test('App is a function', (done) => {
    const wrapper = mount(<App />);
    expect(typeof App).toEqual('function');
    done();
  });
});

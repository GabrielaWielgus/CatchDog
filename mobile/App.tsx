
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppRoot from './AppRoot';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

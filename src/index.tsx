import ReactDOM from 'react-dom/client';
import Demo from './Demo';
import { Provider } from 'react-redux';
import { store } from './data/store';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <Provider store={store}>
      <Demo />
    </Provider>,
  );
}

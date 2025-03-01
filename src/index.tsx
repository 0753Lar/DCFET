import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchBox from './components/SearchBox';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <SearchBox />
    </React.StrictMode>,
  );
}

import React from 'react';
import './index.css';
import AppPractice3App from './AppPractice3App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<AppPractice3App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


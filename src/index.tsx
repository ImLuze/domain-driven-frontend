import { FunctionComponent, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import worker from './mocks/worker';
import client from './client';
import Routes from './Routes';

if (process.env.NODE_ENV === 'development') {
	worker.start();
}

const App: FunctionComponent = () => (
	<StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</ApolloProvider>
	</StrictMode>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

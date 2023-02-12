import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Books } from './components/books';
import { Contract } from './components/contract';
import { Layout } from './components/layout';
import { Rules } from './components/rules';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { store } from './store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>

		<Provider store={store}>
			<HashRouter>
				<Routes>
					<Route path='/' element={<Layout />} >
						<Route path='/' element={<MainPage />} >
							<Route path='/' element={<Books />} />
							<Route path='/terms' element={<Rules />} />
							<Route path='/contract' element={<Contract />} />
						</Route>
						<Route path='/books/category/:id' element={<BookPage />} />
					</Route >
				</Routes>
			</HashRouter>
		</Provider>

	</React.StrictMode>
);

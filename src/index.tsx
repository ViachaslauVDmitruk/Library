import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Books } from './components/books';
import { Contract } from './components/contract';
import { Layout } from './components/layout';
import { LoginForm } from './components/login-form';
import { RecoveryForm } from './components/recovery-form';
import { RegistrationForm } from './components/registation-form';
import { Rules } from './components/rules';
import { AuthPage } from './pages/auth';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Profile } from './pages/profile';
import { store } from './store';

import './index.scss';
import { RouterPath } from './const/routing';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        {/* <Route  
          path={RouterPath.auth}
          element={
            <AuthPage>
              <LoginForm />
            </AuthPage>
          }
        />
        <Route
          path={RouterPath.registration}
          element={
            <AuthPage>
              <RegistrationForm />
            </AuthPage>
          }
        />
        <Route
          path={RouterPath.forgotPass}
          element={
            <AuthPage>
              <RecoveryForm />
            </AuthPage>
          }
        /> */}

        <Route path={RouterPath.home} element={<Layout />}>
          <Route path={RouterPath.home} element={<MainPage />}>
            <Route path={RouterPath.home} element={<Navigate to={RouterPath.booksAll} />} />
            <Route path={RouterPath.category} element={<Books />} />
            <Route path={RouterPath.terms} element={<Rules />} />
            <Route path={RouterPath.contract} element={<Contract />} />
          </Route>
          <Route path={`${RouterPath.booksAll}/:id`} element={<BookPage />} />
          <Route path={`${RouterPath.book}`} element={<BookPage />} />
          <Route path={RouterPath.profile} element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);

import { useRoutes } from 'react-router-dom';

import 'antd/dist/reset.css';

import { routes } from '../config/routes';

const App = () => <>{useRoutes(routes)}</>;

export default App;

import { useRoutes } from "react-router-dom";

import { routes } from "../config/routes";

const App = () => <>{useRoutes(routes)}</>;

export default App;

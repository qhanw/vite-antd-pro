import { useRoutes } from "react-router-dom";

import { routes } from "./routes";

const App = () => <>{useRoutes(routes)}</>;

export default App;

import { Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

// PAGE IMPORTS

const App = () => {
  const match = useRouteMatch();

  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route exact path={`${match.path}home`} component={() => <></>} />
      </Switch>
    </div>
  );
};

export default App;

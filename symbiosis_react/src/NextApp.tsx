import "assets/vendors/style";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import store, { history } from "./appRedux/store";
import App from "./components/App/index";

const NextApp = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

export default NextApp;

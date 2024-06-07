import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";
import { TablePage } from "./pages/TablePage";
import LandingPage from "./pages/LandingPage";

const App = (props) => (
  <>
    <h1>Root header</h1>
    {props.children}
  </>
);

render(
  () => (
    <Router root={App}>
      <Route path="/chart" component={ChartPage} />
      <Route path="/form" component={FormPage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/table" component={TablePage} />
    </Router>
  ),
  document.getElementById("app")
);

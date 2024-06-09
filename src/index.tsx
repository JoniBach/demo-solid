/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { ChartPage } from "./pages/ChartPage";
import { FormPage } from "./pages/FormPage";
import { TablePage } from "./pages/TablePage";
import LandingPage from "./pages/LandingPage";
import { Nav } from "./components/Nav";
import { DataProvider } from "./contexts/store";

const App = (props) => (
  <>
    <Nav />
    {props.children}
  </>
);

render(
  () => (
    <DataProvider>
      <Router root={App}>
        <Route path="/chart" component={ChartPage} />
        <Route path="/form" component={FormPage} />
        <Route path="/" component={LandingPage} />
        <Route path="/table" component={TablePage} />
      </Router>
    </DataProvider>
  ),
  document.getElementById("root")
);

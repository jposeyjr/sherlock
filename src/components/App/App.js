import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Home from '../Home/Home';
import Nav from '../Nav/Nav';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
};

export default App;

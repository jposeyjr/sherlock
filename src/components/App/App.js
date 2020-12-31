import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Components
import Home from '../Home/Home';
import Nav from '../Nav/Nav';
import Render from '../Render/Render';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/results' component={Render} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  );
};

export default App;

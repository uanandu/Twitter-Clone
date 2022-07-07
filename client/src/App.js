// import logo from '../src/logo.svg';
import './App.css';


// Imported for router functionality: Router, Switch, Route,
// useParams to get the id from the url
// Link is used to link to other pages (It's a react component)
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link
} from "react-router-dom";
//==============================================================//

// Import local pages
import Homepage from './pages/Homepage';
import Notifications from './pages/Notifications';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import Tweet from './pages/Tweet';
import Sidebar from './components/SIdebar';
//==============================================================//


const App = () => {
  return (
      <Router>
        <Sidebar/>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>          
          <Route exact path="/bookmarks">
            <Bookmarks />
          </Route>          
          <Route exact path="/tweet/:tweetId">
            <Tweet />
          </Route>          
          <Route exact path="/profile/:profileId">
            <Profile />
          </Route>

        </Switch>
      </Router>
  );
}



export default App;

// import logo from '../src/logo.svg';
import "./App.css";

// Imported for router functionality: Router, Switch, Route,
// useParams to get the id from the url
// Link is used to link to other pages (It's a react component)
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//==============================================================//

// Import local pages
import { Homepage } from "./Homefeed/Homepage";
import Notifications from "./Notifications/Notifications";
import Bookmarks from "./Bookmarks/Bookmarks";
import Profile from "./Profile/Profile";
import { PeopleProfile } from "./Profile/PeopleProfile";
import SpecifiedTweet from "./components/Tweet/SpecifiedTweet";
import Sidebar from "./components/SIdebar";
import { ErrorHandling } from "./components/Helpers/ErrorHandling";
//==============================================================//

const App = () => {
  return (
    <Router>
      <Sidebar />
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
          <SpecifiedTweet />
        </Route>
        <Route exact path="/profile/:handle">
          <PeopleProfile />
        </Route>
        {/* <Route exact path="/:handle/profile"></Route> */}
        <Route exact path="/error">
          <ErrorHandling />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

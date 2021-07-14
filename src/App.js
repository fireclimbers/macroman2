import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import IngredientIndex from './ingredient-index';
import RecipeIndex from './recipe-index';
import RecipePage from './recipe-page';


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ingredients">Ingredient index</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/recipe/:id" render={(props) => (
            <RecipePage recipe_id={props.match.params.id}/>
          )} />
          <Route path="/ingredients">
            <IngredientIndex />
          </Route>
          <Route path="/">
            <RecipeIndex />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

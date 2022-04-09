import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      {/* <BrowserRouter> replacing the existing browser router with plain router since we use our own history object */}
      <Router history={history}>
        {/* writting exact={true} is same as writimg just exact */}
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
          <Route path="/streams/:id" exact component={StreamShow} />
        </Switch>
      </Router>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;

//-------------------------------------------------------------------------------------------------------
//mkdir --> command to give in terminal to make new folder inside the redux-stream-new folder
//npm init ---> to generate new package.json file
//-------------------------------------------------------------------------------------------------------------
//How react-router works?
//So when the application loads we create a instance of browser router component which internally creates
//a object called as "history" object which is going to listen to any PATH changes in the URL. So
//whenever the URL is changed history object is going to communicate that path to the browser router component and
//browser router component in turn communicates it to the Route component which is going to decide based
//on the path attribute it has on which component it needs to show and which component it needs to hide.

//path property in the Route component decides on wheather this component needs to be shown or not.
//Browser router also passes/ can pass the history object as a porp to each component. History object not only watches the address but alos has the ability to
//change the address bar.
//--------------------------------------------------------------------------------------------------------

//What is exact property in Route?
//To avoid single path to be matched by multiple route in our application we use "exact" property

//Example to understand better : extractedPath.contains(path) - this how our applcaition does a check

//{
/* <Route path ="/" component = {one} />
<Route path ="/page" component = {two} />
<Route path ="/page/5" component = {three} /> */
//}

//In the above case all three components will be shown when routed to "/page/5 path".
//play around the code understand better
//------------------------------------------------------------------------------------------------------

//Bad Navigation!
// Adding <a> tag to our application with href="/pageTwo" abd clicking it
// Your browser makes a request to localhost:3000
// Development server responds with index.html file ( one in public directory)
// IMPPP - Browser receives new index.html file, dumps old HTML file it was showing ( including all of our redux
//state data)
// index.html file lists our JS files in scrip tags - browser downloads and executes these scripts
// our app starts up

// To avoid or to overcome the above use we make oof the "Link" form the "react-router"
//While using Link  we dont have "href"property instaed we have "to" property

// what we want - User to navigate to another page
// 1. User clicks on the link tag
// 2.Browser router prevents the browser from navigting to a new page and fetch new index.html file
// 3. URL still changes
// 4. "History" object provided by browser router sees updated URL and sends it to browser router
// 5. Browser router communicateds it to route components
// 6. Route components rerenders to show new set of components

//So while navigating we are still making use of the same HTL document, we are tricking the user basically
//that they are going to different pages but we are just hiding and showing the components.
//--------------------------------------------------------------------------------------------------------

//There are three different types of routers provided by react-router. Each of these different routers going
//to differ is the part of the URL they are going to look at while deciding what content to show on screen.

// 1. BrowserRouter - uses everything after the port or TLD (Top Level Domain - .com,.net)as a path
// 2. HashRouter - uses everything after "#" as a path
// while using Hashrouter react-router is going to automatically place the "#"" in the URL
//Ex - localhost:3000/#/pageTwo
// 3. MemoryRouter - doesn't use the URL to track the navigation

//------------------------------------------------------------------------------------------------------

//Why deployment is bit difficult while using browser router?
//When we make a request from localhost:3000/pageOne to a traditional HTML generating server, the server
//checks for whether it has any HTML content written for that route "/pageOne" and responds with the
//HTML document associated with that route, but what if our backend server does not hav e route defined
//for "/pageOne" in that case it is going to respond with typical page not found 404 error.

//For the same case with the react developmet server, the same server running, if the route is not defined
//for "/pageONe" the it is going to respond with index.html file instead of reponding 404 error

//Even in our current project react dev server has no idea about "/pageTwo" route since it has no code
//written in backend so it throws/responds iwth index.html file

//Why is it so important?
//This mechanism of always responding with the index.html file whenver the route is not defined is not
//typical. In ay traditional server when we do not have teh page set up for any sepcific route/path the
//server is going to respond with 404 page not found error. If that is teh case then we cannot be able to
//make use of the browser router since it always expect a html file to get loaded up behind the screen.

//So while deploying we have to make sure server is set up in the mechanism we are expecting it to be.

//-----------------------------------------------------------------------------------------------------

//Why we make use of hash router?

// Whenever we make a reeust from "localhost:3000//#/pagTwo", we can notice that the call is happening
//only to localhost:3000 so basically when we use hash router server bascially doesn;t look for anything
//after the "#" and always it is going to respnd witht eh HTML associated with localhost:3000 which is
//basically index.html file so in that case even if we do not have the route deined foe some speific
//path lets say for "/pageTwo" the still we will be receiving the index.HTML file which is what we need
//since we have the browser router logic written in client side to hode and show components.

//When to use Hash router?
//Mainly when we are doing deployment to Github pages

//----------------------------------------------------------------------------------------------------
// CRUD - Create, Read, Update, Destroy -----> Master these operations in react/redux
//SPA --> Single page app means we are downloading the the html file only once

//----------------------------------------------------------------------------------------------------
//REST convention
//A standardized system for designing APIs.
//-------------------------------------------------------------------------------------------------------
//In the server
//runnning "npm init" will generate a new package.json file"
//The reason we installed package.json file is to install json-server library

//-----------------------------------------------------------------------------------------------------
// <Route path="/streams/edit/:id" exact component={StreamEdit} /> ---> Here even if we route to
// '/streams/edit' path still only the streamEdit component will be shown. Basically anything after the
// colon ":" will be omitted and its considered as a variable. ita can also be "/streams/edit/:anything"

// We can also do multiple colon in a single url like "streams/edit/:id/:something"
//-------------------------------------------------------------------------------------------------------
//PORTALS --> portals let us some element to get rendered not as a direct child element, instead render that element
//or component (Modal) as a child of someother element inside our html structure most commonly our <body>. Why do we do that
//in order to overcome the stacking context issue, css issue, z-index issue etc.

//Recently knew --> the div inside the html structure will get rendered in order.

//-------------------------------------------------------------------------------------------------------------------
//HOW Z-index works
// <div1>
//   <div2></div2>
// </div1>
// <div3></div3>
// <div4></div4>

//In the above scenario if you see, the div 2 is the child of div 1. div 1, div3 and div 4 are the same level. By default
//all the divs will have z-index of undefined or xero. Now if z-index:10 is applied across the subchild div 2 element,
// then you wont basically see that z-index:10 being applied or you wont see any div 2 element let say if its modal window
// showing up fromnt int eh screen, the reason is because the parent of div 2 which is div 1 is still having the z-index
//0 and that parent z-index will be compared to its level div 3 and div 4 elements and so the div 3 and div 4 elements
// will be displayed in UI as latest.
//-------------------------------------------------------------------------------------------------------------------
//SCENARIO we came across

{
  /* <Route path="/streams/new" exact component={StreamCreate} />
<Route path="/streams/edit/:id" exact component={StreamEdit} />
<Route path="/streams/delete/:id" exact component={StreamDelete} />
<Route path="/streams/:id" exact component={StreamShow} /> */
}

//We have the above route being written, there was a scenario like when the user navigates to '/streams/new' both
//the Stream create component as well as Stream show component got rendered but we need to show only Stream create
//component on UI. The reason was that the ':id' in stream show will basically try to capture a variable after
// '/streams' so it did capture 'new' as a variable and got renderd,it doesnt need to be always to number.

//Solution to this --> <Switch>, it will look for very first route that gets matched and just comes out without
//looking into other routes

//So with the same code if Stream show route line of code is placed above the stream create route line of code
//the stream show component will be rendered when we route to '/streams/new

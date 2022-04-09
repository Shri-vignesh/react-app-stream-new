import {createBrowserHistory} from 'history'

export default createBrowserHistory()


//-----------------------------------------------------------------------------------------------------------------
//This history package was automaticallly installed by react-router-dom. createBrowserHistory is a function we need to call to create a new  
//history object.

//My Understanding on why we create this history object

//As we already know Browser router internally creates a history object which keeps track of the address bar and sends the information to the
//browser router if any changes ocurs. Its very tedious process if we need to access this history object inside our action/reducer file.We
//need to pass the history object as props to the component which in turn should pass as an argument to the action function we call and so it
//is but complicated to get access to history object which was created by the browser router to get access to action files so to overcome
//this difficulty we ourselves create our own history object.Now using this history object we are also going to replace our existing browser router
//with plain router.

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Chatpage from './pages/Chatpage';
import Homepage from './pages/Homepage';





function App() {
  return (
     <BrowserRouter>
    <div className='App'>
      
              
      <Route path='/' component={Homepage} exact/>
       <Route
            className="ChatPageWrapper"
            path="/chats"
            component={Chatpage}
          />
        
    </div>
    </BrowserRouter>
  
  );
}

export default App;



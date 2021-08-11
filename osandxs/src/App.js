import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Table } from './components';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Table} />
      </Switch>
    </div>
  );
}

export default App;

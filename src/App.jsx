import { Provider } from 'react-redux';
import './App.css';
import Header from './components/Header';
import appStore from './utils/appStore';
import Body from './components/Body';

function App() {
  return (
    <Provider store={appStore}>
      <div className="h-screen">
        <Header />
        <Body />
      </div>
    </Provider>
  );
}

export default App;

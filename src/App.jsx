import { Provider } from 'react-redux';
import './App.css';
import Header from './components/Header';
import appStore from './utils/appStore';

function App() {
  return (
    <Provider store={appStore}>
      <Header />
    </Provider>
  );
}

export default App;

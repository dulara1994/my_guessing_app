import "./App.css";
import MainLayout from "./containers/MainLayout";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./store";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}

export default App;

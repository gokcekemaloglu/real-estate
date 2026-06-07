import { Provider } from "react-redux"
import store from './app/store'

function App() {
  return (
    <Provider store={store}>
      <section id="center">
      <div className="ticks"></div>
        <div>
          <h1 className="text-2xl font-serif text-slate-800">Real Estate Showcase</h1>
          <p className="text-sm text-slate-500 font-light mt-2">Global Portfolio Architecture</p>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </Provider>
  )
}

export default App

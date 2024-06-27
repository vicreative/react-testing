import './App.css';
import { Application } from './components/application/Application';
import { Skills } from './components/skills/Skills';
import { Counter } from './components/counter/Counter';
import { AppProviders } from './providers/AppProviders';
import { MuiMode } from './components/mui/MuiMode';
import { CounterTwo } from './components/counter-two/CounterTwo';

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Application />
        <Skills skills={['HTML', 'CSS']} />
        <Counter />
        <CounterTwo count={1} />
        {/* <Users /> */}
        <MuiMode />
      </div>
    </AppProviders>
  );
}

export default App;

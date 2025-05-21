import './index.css';
import PensionCalculator from './components/PensionCalculator';

function App() {
    return (
        <div className="app-container">
            <div className="left-panel">
                <h2>Pension Calculator</h2>
                <PensionCalculator />
            </div>
            <div className="right-panel">
                <h2>No Pension Calculator</h2>
                {/* To be added */}
            </div>
        </div>
    );
}
export default App;
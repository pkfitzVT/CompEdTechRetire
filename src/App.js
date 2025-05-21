import './index.css';
import { useState } from 'react';
import PensionCalculator from './components/PensionCalculator';
import NoPensionCalculator from './components/NoPensionCalculator';
import ComparisonSummary from './components/ComparisonSummary';

function App() {
    const [activeTab, setActiveTab] = useState('pension');
    const [pensionResult, setPensionResult] = useState(null);
    const [noPensionResult, setNoPensionResult] = useState(null);

    return (
        <div className="app-wrapper">
            <div className="tab-bar">
                <button
                    onClick={() => setActiveTab('pension')}
                    className={activeTab === 'pension' ? 'active' : ''}
                >
                    💼 Pension
                </button>
                <button
                    onClick={() => setActiveTab('noPension')}
                    className={activeTab === 'noPension' ? 'active' : ''}
                >
                    🚙 No Pension
                </button>
                <button
                    onClick={() => setActiveTab('comparison')}
                    disabled={!pensionResult || !noPensionResult}
                    className={activeTab === 'comparison' ? 'active' : ''}
                >
                    📊 Compare
                </button>
            </div>

            {/* 👇 Add this block to show tab content */}
            <div className="tab-content">
                {activeTab === 'pension' && (
                    <PensionCalculator onResult={setPensionResult} />
                )}
                {activeTab === 'noPension' && (
                    <NoPensionCalculator onResult={setNoPensionResult} />
                )}
                {activeTab === 'comparison' &&
                    pensionResult &&
                    noPensionResult && (
                        <ComparisonSummary
                            pension={pensionResult.pension}
                            drawdown={noPensionResult.annualDraw}
                        />
                    )}
            </div>
        </div>
    );
}

export default App;

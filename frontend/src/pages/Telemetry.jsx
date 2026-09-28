import { useEffect, useState } from 'react';
import { getTelemetry } from '../services/api';
import { Activity } from 'lucide-react';

export default function Telemetry() {
    const [telemetry, setTelemetry] = useState([]);

    useEffect(() => {
        getTelemetry().then(res => setTelemetry(res.data.reverse())).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><Activity className="mr-3 text-cyan-600" /> Telemetry Logs</h1>
            <div className="glass-panel p-6 overflow-hidden">
                <div className="overflow-x-auto h-[600px] no-scrollbar">
                    <table className="w-full text-left text-sm text-slate-600 relative">
                        <thead className="bg-white text-slate-500 sticky top-0">
                            <tr>
                                <th className="p-3">Time</th>
                                <th className="p-3">Car</th>
                                <th className="p-3">Tension (kN)</th>
                                <th className="p-3">Power (kW)</th>
                                <th className="p-3">Temp (°C)</th>
                                <th className="p-3">Pax</th>
                            </tr>
                        </thead>
                        <tbody>
                            {telemetry.map((t, i) => (
                                <tr key={i} className="border-b border-slate-200/50 hover:bg-slate-200/50">
                                    <td className="p-3">{new Date(t.timestamp).toLocaleTimeString()}</td>
                                    <td className="p-3 font-medium text-cyan-700">{t.cableCar?.vehicleName || 'N/A'}</td>
                                    <td className="p-3">{t.cableTension.toFixed(2)}</td>
                                    <td className="p-3">{t.motorPowerKw.toFixed(2)}</td>
                                    <td className="p-3">{t.temperature.toFixed(1)}</td>
                                    <td className="p-3">{t.passengerCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}




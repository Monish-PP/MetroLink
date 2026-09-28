import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { getTelemetry } from '../services/api';

export default function Passengers() {
    const [telemetry, setTelemetry] = useState([]);

    useEffect(() => {
        getTelemetry().then(res => setTelemetry(res.data.reverse())).catch(console.error);
    }, []);

    // Calculate total passengers across the network from recent telemetry
    const totalPassengers = telemetry.reduce((sum, t) => sum + (t.passengerCount || 0), 0);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><Users className="mr-3 text-cyan-600" /> Passenger Analytics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card glow-cyan flex flex-col justify-center items-center py-8">
                    <h2 className="text-slate-500 font-medium mb-2">Total Network Passengers</h2>
                    <p className="text-4xl font-bold text-slate-900">{totalPassengers}</p>
                </div>
                <div className="glass-card glow-cyan flex flex-col justify-center items-center py-8">
                    <h2 className="text-slate-500 font-medium mb-2">Peak Capacity</h2>
                    <p className="text-4xl font-bold text-slate-900">85%</p>
                </div>
                <div className="glass-card glow-cyan flex flex-col justify-center items-center py-8">
                    <h2 className="text-slate-500 font-medium mb-2">Wait Time Avg</h2>
                    <p className="text-4xl font-bold text-slate-900">4 min</p>
                </div>
            </div>

            <div className="glass-panel p-6 overflow-hidden mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Boarding Logs</h3>
                <div className="overflow-x-auto h-[400px] no-scrollbar">
                    <table className="w-full text-left text-sm text-slate-600 relative">
                        <thead className="bg-white text-slate-500 sticky top-0">
                            <tr>
                                <th className="p-3">Time</th>
                                <th className="p-3">Cable Car</th>
                                <th className="p-3">Passenger Count</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {telemetry.map((t, i) => (
                                <tr key={i} className="border-b border-slate-200/50 hover:bg-slate-200/50">
                                    <td className="p-3">{new Date(t.timestamp).toLocaleTimeString()}</td>
                                    <td className="p-3 font-medium text-cyan-700">{t.cableCar?.vehicleName || 'Unknown'}</td>
                                    <td className="p-3 text-slate-900 font-bold">{t.passengerCount} pax</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs ${t.passengerCount > 20 ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {t.passengerCount > 20 ? 'High Volume' : 'Normal'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}




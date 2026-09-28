import { useEffect, useState } from 'react';
import { getAlerts } from '../services/api';
import { TriangleAlert } from 'lucide-react';

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        getAlerts().then(res => setAlerts(res.data.reverse())).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><TriangleAlert className="mr-3 text-red-400" /> Safety Incident Logs</h1>
            <div className="grid gap-4">
                {alerts.map((a) => (
                    <div key={a.id} className={`glass-card border-l-4 ${a.severity === 'CRITICAL' ? 'border-red-500 glow-purple' : 'border-orange-500 glow-cyan'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className={`text-lg font-bold ${a.severity === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'}`}>{a.alertType}</h3>
                                <p className="text-slate-600 mt-1">{a.message}</p>
                            </div>
                            <span className="text-slate-500 text-sm">{new Date(a.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



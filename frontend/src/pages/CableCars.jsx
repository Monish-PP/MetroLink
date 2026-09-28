import { useEffect, useState } from 'react';
import { getCableCars } from '../services/api';
import { CableCar } from 'lucide-react';

export default function CableCars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCableCars().then(res => setCars(res.data)).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><CableCar className="mr-3 text-cyan-600" /> Fleet Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((c) => (
                    <div key={c.id} className="glass-card glow-cyan">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-slate-900">{c.vehicleName}</h3>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">{c.operationalStatus}</span>
                        </div>
                        <p className="text-slate-500 text-sm mb-1">Code: <span className="text-slate-700">{c.vehicleCode}</span></p>
                        <p className="text-slate-500 text-sm mb-1">Capacity: <span className="text-slate-700">{c.capacity} pax</span></p>
                        <p className="text-slate-500 text-sm">Motor: <span className="text-cyan-700">{c.motorStatus}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}




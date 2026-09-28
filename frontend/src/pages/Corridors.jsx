import { useEffect, useState } from 'react';
import { getCorridors } from '../services/api';
import { Navigation } from 'lucide-react';

export default function Corridors() {
    const [corridors, setCorridors] = useState([]);

    useEffect(() => {
        getCorridors().then(res => setCorridors(res.data)).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><Navigation className="mr-3 text-cyan-600" /> Transit Corridors</h1>
            <div className="glass-panel p-6">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-white/50 text-slate-500">
                        <tr>
                            <th className="p-3 rounded-tl-lg">Code</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Rate</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {corridors.map((c) => (
                            <tr key={c.id} className="border-b border-slate-200/50 hover:bg-slate-200/50">
                                <td className="p-3 font-medium text-cyan-700">{c.corridorCode}</td>
                                <td className="p-3">{c.corridorName}</td>
                                <td className="p-3">₹{c.passengerRate}</td>
                                <td className="p-3"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">{c.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}




import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import api from '../services/api';

export default function Accounting() {
    const [ledger, setLedger] = useState([]);

    useEffect(() => {
        api.get('/accounting/ledger').then(res => setLedger(res.data.reverse())).catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><FileText className="mr-3 text-cyan-600" /> General Ledger</h1>
            <div className="glass-panel p-6">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-white text-slate-500">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Ref</th>
                            <th className="p-3">Account</th>
                            <th className="p-3 text-right">Debit (₹)</th>
                            <th className="p-3 text-right">Credit (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledger.length === 0 ? (
                            <tr><td colSpan={5} className="p-6 text-center text-slate-500">No accounting entries posted.</td></tr>
                        ) : ledger.map((entry) => (
                            entry.lines.map((line, idx) => (
                                <tr key={`${entry.id}-${idx}`} className="border-b border-slate-200/50 hover:bg-slate-200/50">
                                    <td className="p-3">{idx === 0 ? entry.transactionDate : ''}</td>
                                    <td className="p-3">{idx === 0 ? entry.reference : ''}</td>
                                    <td className="p-3">{line.account}</td>
                                    <td className="p-3 text-right text-green-400">{line.debit > 0 ? line.debit.toFixed(2) : ''}</td>
                                    <td className="p-3 text-right text-red-400">{line.credit > 0 ? line.credit.toFixed(2) : ''}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



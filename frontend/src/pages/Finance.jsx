import { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet } from 'lucide-react';
import api from '../services/api';

export default function Finance() {
    const [invoices, setInvoices] = useState([]);

    const fetchInvoices = () => {
        api.get('/finance/invoices').then(res => setInvoices(res.data)).catch(console.error);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleGenerateInvoice = async () => {
        try {
            await api.post('/finance/invoices', {
                invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000),
                passengerTrips: 2500,
                rate: 8.0,
                total: 20000.0,
                status: 'POSTED'
            });
            fetchInvoices();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center"><Wallet className="mr-3 text-cyan-600" /> Sales & Invoicing</h1>
                <button onClick={handleGenerateInvoice} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    + Generate Invoice
                </button>
            </div>
            <div className="glass-panel p-6">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-white text-slate-500">
                        <tr>
                            <th className="p-3">Invoice #</th>
                            <th className="p-3">Trips</th>
                            <th className="p-3">Rate</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length === 0 ? (
                            <tr><td colSpan={5} className="p-6 text-center text-slate-500">No invoices generated yet.</td></tr>
                        ) : invoices.map((inv) => (
                            <tr key={inv.id} className="border-b border-slate-200/50 hover:bg-slate-200/50">
                                <td className="p-3 text-cyan-700">{inv.invoiceNumber}</td>
                                <td className="p-3">{inv.passengerTrips}</td>
                                <td className="p-3">₹{inv.rate}</td>
                                <td className="p-3 font-bold text-slate-900">₹{inv.total}</td>
                                <td className="p-3">{inv.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}




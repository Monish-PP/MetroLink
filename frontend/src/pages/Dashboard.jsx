import { useEffect, useState } from 'react';
import { CableCar, Users, Activity, Zap, Play, Square, AlertTriangle } from 'lucide-react';
import { getSimulationStatus, startSimulation, stopSimulation, getTelemetry, getAlerts } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Dashboard() {
    const [simulating, setSimulating] = useState(false);
    const [telemetry, setTelemetry] = useState([]);
    const [alerts, setAlerts] = useState([]);

    const fetchData = () => {
        getSimulationStatus().then(res => setSimulating(res.data));
        getTelemetry().then(res => setTelemetry(res.data));
        getAlerts().then(res => setAlerts(res.data.filter((a) => a.status === 'ACTIVE')));
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleToggleSim = async () => {
        if (simulating) await stopSimulation();
        else await startSimulation();
        fetchData();
    };

    // Calculate aggregated metrics
    const latestTelemetry = telemetry.slice(-4); // Last 4 points
    const avgTension = latestTelemetry.length ? (latestTelemetry.reduce((acc, t) => acc + t.cableTension, 0) / latestTelemetry.length).toFixed(1) : '0.0';
    const totalPower = latestTelemetry.length ? (latestTelemetry.reduce((acc, t) => acc + t.motorPowerKw, 0)).toFixed(1) : '0.0';
    const currentPassengers = latestTelemetry.length ? latestTelemetry.reduce((acc, t) => acc + t.passengerCount, 0) : 0;

    // Chart Data (Mock timeline based on telemetry count)
    const chartData = telemetry.slice(-20).map((t, i) => ({
        time: `10:${10+i}`,
        passengers: t.passengerCount,
        tension: t.cableTension
    }));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Transit Operations Overview</h1>
                    <p className="text-slate-500 text-sm">Real-time metrics for Mountain Line Sector 1</p>
                </div>
                <button 
                    onClick={handleToggleSim}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        simulating 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 glow-purple' // Used purple glow to simulate red/pink intensity
                        : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 glow-green'
                    }`}
                >
                    {simulating ? <Square size={16} /> : <Play size={16} />}
                    <span>{simulating ? 'Stop Simulator' : 'Start Simulator'}</span>
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card glow-cyan relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><CableCar size={64} /></div>
                    <div className="flex items-center space-x-3 text-cyan-600 mb-3">
                        <CableCar size={20} />
                        <h3 className="font-semibold text-sm tracking-wide uppercase">Active Fleet</h3>
                    </div>
                    <p className="text-4xl font-bold text-slate-900 mb-1">4 <span className="text-lg text-slate-500 font-normal">/ 4</span></p>
                    <p className="text-xs text-cyan-700">100% Available</p>
                </div>

                <div className="glass-card glow-purple relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={64} /></div>
                    <div className="flex items-center space-x-3 text-purple-400 mb-3">
                        <Users size={20} />
                        <h3 className="font-semibold text-sm tracking-wide uppercase">Live Passengers</h3>
                    </div>
                    <p className="text-4xl font-bold text-slate-900 mb-1">{currentPassengers}</p>
                    <p className="text-xs text-purple-300">Transit volume</p>
                </div>

                <div className="glass-card glow-green relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={64} /></div>
                    <div className="flex items-center space-x-3 text-green-400 mb-3">
                        <Activity size={20} />
                        <h3 className="font-semibold text-sm tracking-wide uppercase">Avg Tension</h3>
                    </div>
                    <p className="text-4xl font-bold text-slate-900 mb-1">{avgTension} <span className="text-lg text-slate-500 font-normal">kN</span></p>
                    <p className="text-xs text-green-300">Normal Range (75-95)</p>
                </div>

                <div className="glass-card border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={64} /></div>
                    <div className="flex items-center space-x-3 text-orange-400 mb-3">
                        <Zap size={20} />
                        <h3 className="font-semibold text-sm tracking-wide uppercase">Total Power</h3>
                    </div>
                    <p className="text-4xl font-bold text-slate-900 mb-1">{totalPower} <span className="text-lg text-slate-500 font-normal">kW</span></p>
                    <p className="text-xs text-orange-300">Grid Consumption</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart 1 */}
                <div className="glass-panel p-5 lg:col-span-2">
                    <h3 className="text-slate-600 font-semibold mb-6 flex items-center"><Activity size={18} className="mr-2 text-cyan-600" /> Real-time Telemetry (Tension)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorTension" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="tension" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorTension)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alerts */}
                <div className="glass-panel p-5 overflow-hidden flex flex-col">
                    <h3 className="text-slate-600 font-semibold mb-4 flex items-center justify-between">
                        <span className="flex items-center"><AlertTriangle size={18} className="mr-2 text-red-400" /> Active Safety Alerts</span>
                        {alerts.length > 0 && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-500/50">{alerts.length}</span>}
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-2">
                        {alerts.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-slate-500 text-sm flex-col">
                                <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-3">
                                    <AlertTriangle size={24} className="text-slate-600" />
                                </div>
                                No active alerts detected
                            </div>
                        ) : (
                            alerts.map(a => (
                                <div key={a.id} className="bg-white/60 border-l-4 border-red-500 p-3 rounded-r-lg">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-red-400 font-medium text-sm">{a.alertType}</h4>
                                        <span className="text-xs text-slate-500">{new Date(a.createdAt).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-slate-600 text-xs">{a.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}




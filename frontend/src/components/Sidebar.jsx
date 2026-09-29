import { LayoutDashboard, CableCar, Activity, TriangleAlert, Users, Wallet, FileText, Settings, Navigation } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navGroups = [
    {
        title: 'OVERVIEW',
        items: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/' }
        ]
    },
    {
        title: 'TRANSIT OPERATIONS',
        items: [
            { name: 'Corridors', icon: Navigation, path: '/corridors' },
            { name: 'Cable Cars', icon: CableCar, path: '/cable-cars' },
            { name: 'Telemetry', icon: Activity, path: '/telemetry' },
            { name: 'Safety Alerts', icon: TriangleAlert, path: '/alerts' },
            { name: 'Passengers', icon: Users, path: '/passengers' }
        ]
    },
    {
        title: 'FINANCE & ACCOUNTING',
        items: [
            { name: 'Sales & Invoices', icon: Wallet, path: '/finance' },
            { name: 'Ledger & Journals', icon: FileText, path: '/accounting' }
        ]
    }
];

export default function Sidebar() {
    return (
        <aside className="w-64 glass-panel border-y-0 border-l-0 rounded-none h-full flex flex-col z-20">
            <div className="h-16 flex items-center px-6 border-b border-slate-200/50">
                <Activity className="text-cyan-600 mr-3" size={24} />
                <h1 className="text-lg font-bold text-slate-800 tracking-wider">CABLESENSE <span className="font-light text-cyan-600 text-xs block -mt-1">AUTONOMOUS</span></h1>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 space-y-8 no-scrollbar">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="px-4">
                        <h2 className="text-xs font-semibold text-slate-500 mb-4 px-2 tracking-wider">{group.title}</h2>
                        <ul className="space-y-1">
                            {group.items.map((item, i) => (
                                <li key={i}>
                                    <NavLink 
                                        to={item.path} 
                                        className={({isActive}) => 
                                            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                                isActive 
                                                ? 'bg-cyan-100 text-cyan-700 border border-cyan-300 glow-cyan shadow-inner' 
                                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                                            }`
                                        }
                                    >
                                        <item.icon size={18} />
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            
            <div className="p-4 border-t border-slate-200/50">
                <button className="flex items-center space-x-3 text-slate-500 hover:text-slate-900 transition-colors w-full px-3 py-2">
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                </button>
            </div>
        </aside>
    );
}




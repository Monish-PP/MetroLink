import { Bell, User, Search, Settings, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getAlerts } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [alerts, setAlerts] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const notifRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        getAlerts().then(res => setAlerts(res.data.reverse().slice(0, 3))).catch(console.error);
        
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery) {
            alert(`Searching for: ${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="h-16 glass-panel border-x-0 border-t-0 rounded-none flex items-center justify-between px-6 z-20 sticky top-0">
            <div className="flex items-center text-slate-500 focus-within:text-cyan-600 transition-colors w-96">
                <Search size={20} className="mr-3" />
                <input 
                    type="text" 
                    placeholder="Search operations (Press Enter)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700"
                />
            </div>
            <div className="flex items-center space-x-6 text-slate-600">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <div 
                        className="cursor-pointer hover:text-cyan-600 transition-colors relative"
                        onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                    >
                        <Bell size={20} />
                        {alerts.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                {alerts.length}
                            </span>
                        )}
                    </div>
                    
                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden z-50">
                            <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                                <span className="font-bold text-slate-900 text-sm">Recent Alerts</span>
                                <span className="text-xs text-cyan-600 cursor-pointer hover:underline" onClick={() => navigate('/alerts')}>View All</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {alerts.length === 0 ? (
                                    <div className="p-4 text-center text-slate-500 text-sm">No new notifications</div>
                                ) : (
                                    alerts.map(a => (
                                        <div key={a.id} className="p-3 border-b border-slate-200/50 hover:bg-slate-300/30 cursor-pointer">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-xs font-bold ${a.severity === 'CRITICAL' ? 'text-red-400' : 'text-orange-400'}`}>{a.alertType}</span>
                                                <span className="text-[10px] text-slate-500">{new Date(a.createdAt).toLocaleTimeString()}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 line-clamp-2">{a.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <div 
                        className="flex items-center space-x-3 cursor-pointer hover:text-cyan-600 transition-colors"
                        onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                    >
                        <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center border border-cyan-700">
                            <User size={16} className="text-cyan-700" />
                        </div>
                        <span className="text-sm font-medium">System Admin</span>
                    </div>

                    {showProfile && (
                        <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 shadow-xl rounded-lg py-1 z-50">
                            <div className="px-4 py-2 border-b border-slate-200 mb-1">
                                <p className="text-sm text-slate-900 font-bold">System Admin</p>
                                <p className="text-xs text-slate-500">admin@metrolink.com</p>
                            </div>
                            <div className="px-2 py-1 cursor-pointer hover:bg-slate-300/50 text-sm flex items-center" onClick={() => { navigate('/profile'); setShowProfile(false); }}>
                                <User size={14} className="mr-2 text-slate-500" /> My Profile
                            </div>
                            <div className="px-2 py-1 cursor-pointer hover:bg-slate-300/50 text-sm flex items-center" onClick={() => { navigate('/settings'); setShowProfile(false); }}>
                                <Settings size={14} className="mr-2 text-slate-500" /> Settings
                            </div>
                            <div className="px-2 py-1 cursor-pointer hover:bg-red-500/20 text-red-400 text-sm flex items-center mt-1 border-t border-slate-200/50 pt-2" onClick={() => alert('Logged out.')}>
                                <LogOut size={14} className="mr-2" /> Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}




import { Settings as SettingsIcon, Save, Database, Shield, Bell } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><SettingsIcon className="mr-3 text-cyan-600" /> System Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 col-span-1">
                    <nav className="space-y-2">
                        <a href="#" className="flex items-center space-x-3 text-cyan-600 bg-cyan-100/30 p-3 rounded-lg border border-cyan-300">
                            <SettingsIcon size={18} /> <span>General</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200 p-3 rounded-lg transition-colors">
                            <Shield size={18} /> <span>Security</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200 p-3 rounded-lg transition-colors">
                            <Database size={18} /> <span>Data & Backup</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-slate-500 hover:text-slate-900 hover:bg-slate-200 p-3 rounded-lg transition-colors">
                            <Bell size={18} /> <span>Alert Preferences</span>
                        </a>
                    </nav>
                </div>
                
                <div className="glass-panel p-6 col-span-2 space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-4">General Configuration</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-500 mb-1">System Name</label>
                                <input type="text" defaultValue="Metrolink Autonomous Transit" className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-cyan-500" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-500 mb-1">Timezone</label>
                                <select className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-cyan-500">
                                    <option>Asia/Kolkata (IST)</option>
                                    <option>UTC</option>
                                    <option>America/New_York (EST)</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-100 border border-slate-200 rounded-lg">
                                <div>
                                    <p className="text-slate-900 text-sm font-medium">Telemetry Logging</p>
                                    <p className="text-slate-500 text-xs">Enable high-frequency data collection from IoT nodes.</p>
                                </div>
                                <div className="w-10 h-5 bg-cyan-600 rounded-full relative cursor-pointer">
                                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-0.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4 border-t border-slate-200">
                        <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center transition-colors" onClick={() => alert('Settings Saved Successfully!')}>
                            <Save size={16} className="mr-2" /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}




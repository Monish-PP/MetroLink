import { User, Mail, Shield, Key } from 'lucide-react';

export default function Profile() {
    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center"><User className="mr-3 text-cyan-600" /> My Profile</h1>
            
            <div className="glass-panel p-8">
                <div className="flex items-center space-x-6 mb-8 border-b border-slate-200 pb-8">
                    <div className="w-24 h-24 rounded-full bg-cyan-100 border-2 border-cyan-500 flex items-center justify-center">
                        <User size={48} className="text-cyan-700" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">System Admin</h2>
                        <p className="text-slate-500 flex items-center mt-1"><Mail size={14} className="mr-2" /> admin@cablesense.com</p>
                        <div className="mt-3 flex space-x-2">
                            <span className="bg-cyan-500/20 text-cyan-600 px-3 py-1 rounded-full text-xs border border-cyan-500/30 flex items-center">
                                <Shield size={12} className="mr-1" /> Super Admin
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-900">Account Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-slate-500 mb-1">Full Name</label>
                            <input type="text" defaultValue="System Admin" className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 text-slate-900 focus:outline-none focus:border-cyan-500" />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-500 mb-1">Employee ID</label>
                            <input type="text" defaultValue="EMP-001" disabled className="w-full bg-slate-100/50 border border-slate-200 rounded-lg p-2 text-slate-500 cursor-not-allowed" />
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 pt-6 border-t border-slate-200">Security</h3>
                    <button className="bg-white border border-slate-200 hover:bg-slate-300 text-slate-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors">
                        <Key size={16} className="mr-2 text-cyan-600" /> Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}




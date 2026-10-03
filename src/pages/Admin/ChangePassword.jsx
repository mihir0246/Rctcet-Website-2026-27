import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../Components/SEO';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { KeyRound, ArrowLeft } from 'lucide-react';

const ChangePassword = () => {
  const { admin } = useAdminAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(admin?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found.");
      }

      if (user.email !== email) {
        throw new Error("Email does not match the currently logged in user.");
      }

      // 1. Re-authenticate
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 2. Update Password
      await updatePassword(user, newPassword);

      setMessage({ type: 'success', text: 'Password changed successfully! Redirecting...' });
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);

    } catch (error) {
      console.error(error);
      let errorMsg = 'Failed to change password. Please try again.';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMsg = 'Incorrect current password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMsg = 'Too many attempts. Please try again later.';
      } else if (error.message) {
        errorMsg = error.message;
      }
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 flex items-center justify-center">
      <SEO title="Change Password" description="Change your admin password" />
      
      <div className="max-w-md w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-3xl shadow-xl">
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/20 text-primary rounded-xl">
            <KeyRound size={24} />
          </div>
          <h2 className="text-2xl font-black text-foreground">Change Password</h2>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 font-medium border ${message.type === 'success' ? 'bg-success/20 text-success border-success/30' : 'bg-danger/20 text-danger border-danger/30'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-xs font-bold mb-2 text-foreground/70 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-foreground"
              required
              disabled={!!admin?.email} // Lock it to their logged in email if available
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs font-bold mb-2 text-foreground/70 uppercase tracking-wider">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-foreground"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold mb-2 text-foreground/70 uppercase tracking-wider">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-foreground"
              required
              minLength="6"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold mb-2 text-foreground/70 uppercase tracking-wider">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 text-foreground"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin block" /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

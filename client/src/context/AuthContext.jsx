import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, role: 'farmer', name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh@example.com', region: 'Nashik', state: 'Maharashtra', language: 'hi', crops: ['mango', 'tomato', 'onion'], password: 'farmer123' },
  { id: 2, role: 'farmer', name: 'Priya Patil', phone: '9876543211', email: 'priya@example.com', region: 'Ratnagiri', state: 'Maharashtra', language: 'mr', crops: ['mango', 'rice'], password: 'farmer123' },
  { id: 3, role: 'officer', name: 'Dr. Ramesh Shinde', phone: '9999900000', email: 'officer@gov.in', region: 'Nashik & Konkan Zone', state: 'Maharashtra', language: 'en', department: 'Department of Agriculture, Govt. of Maharashtra', designation: 'District Agriculture Officer (DAO)', password: 'officer123' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('crophealth_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (emailOrPhone, password, selectedRole = 'farmer') => {
    const found = MOCK_USERS.find(u =>
      (u.email === emailOrPhone || u.phone === emailOrPhone) &&
      u.password === password
    );

    if (found) {
      const userData = { ...found };
      if (selectedRole) userData.role = selectedRole;
      delete userData.password;
      setUser(userData);
      localStorage.setItem('crophealth_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email/phone or password' };
  };

  const register = (data) => {
    const newUser = { id: Date.now(), role: data.role || 'farmer', ...data, crops: data.crops || [] };
    setUser(newUser);
    localStorage.setItem('crophealth_user', JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('crophealth_user', JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crophealth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const DEFAULT_USERS = [
  {
    id: 1,
    role: 'farmer',
    name: 'Rajesh Kumar (राजेश कुमार)',
    phone: '9876543210',
    email: 'farmer@mahacrop.gov.in',
    region: 'Nashik District',
    state: 'Maharashtra',
    language: 'mr',
    farmName: 'Green Meadows Orchard, Dindori',
    farmSize: '4.5 Acres',
    crops: ['mango', 'tomato', 'onion', 'soybean'],
    password: 'farmer123'
  },
  {
    id: 2,
    role: 'extension',
    name: 'Aniket Deshmukh (अनिकेत देशमुख)',
    phone: '9876543220',
    email: 'extension@mahacrop.gov.in',
    region: 'Nashik Taluka & Surrounding Panchayats',
    state: 'Maharashtra',
    language: 'mr',
    department: 'Dept of Agriculture, Govt of Maharashtra',
    designation: 'Senior Agriculture Extension Officer (Krishi Sevak)',
    assignedFarmsCount: 38,
    activeCasesCount: 12,
    password: 'extension123'
  },
  {
    id: 3,
    role: 'officer',
    name: 'Dr. Ramesh Shinde (डॉ. रमेश शिंदे)',
    phone: '9999900000',
    email: 'officer@mahacrop.gov.in',
    region: 'Maharashtra State - Agricultural Division',
    state: 'Maharashtra',
    language: 'en',
    department: 'Department of Agriculture, Govt. of Maharashtra',
    designation: 'District Agriculture Officer (DAO) & Outbreak Coordinator',
    password: 'officer123'
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('crophealth_user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      const defaultUser = DEFAULT_USERS[0];
      setUser(defaultUser);
      localStorage.setItem('crophealth_user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = (emailOrPhone, password, selectedRole = 'farmer') => {
    const found = DEFAULT_USERS.find(
      u => (u.email === emailOrPhone || u.phone === emailOrPhone || u.role === selectedRole) &&
           (u.password === password || password === 'demo' || !password)
    ) || DEFAULT_USERS.find(u => u.role === selectedRole) || DEFAULT_USERS[0];

    const userData = { ...found, role: selectedRole || found.role };
    delete userData.password;
    setUser(userData);
    localStorage.setItem('crophealth_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const switchRole = (newRole) => {
    const matching = DEFAULT_USERS.find(u => u.role === newRole) || { ...user, role: newRole };
    const updated = { ...matching, role: newRole };
    delete updated.password;
    setUser(updated);
    localStorage.setItem('crophealth_user', JSON.stringify(updated));
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
    <AuthContext.Provider value={{ user, loading, login, register, updateUser, switchRole, logout, DEFAULT_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

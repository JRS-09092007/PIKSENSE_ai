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
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // 1. Load registered users database from localStorage or seed with DEFAULT_USERS
    const storedRegistered = localStorage.getItem('crophealth_registered_users');
    let usersList = [];
    if (storedRegistered) {
      try {
        usersList = JSON.parse(storedRegistered);
      } catch (e) {
        usersList = DEFAULT_USERS;
      }
    } else {
      usersList = DEFAULT_USERS;
      localStorage.setItem('crophealth_registered_users', JSON.stringify(DEFAULT_USERS));
    }
    setRegisteredUsers(usersList);

    // 2. Load active session (DO NOT auto-login to default user if no active session exists)
    const storedUser = localStorage.getItem('crophealth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (emailOrPhone, password, selectedRole = 'farmer') => {
    const storedRegistered = localStorage.getItem('crophealth_registered_users');
    const currentUsers = storedRegistered ? JSON.parse(storedRegistered) : (registeredUsers.length ? registeredUsers : DEFAULT_USERS);

    const cleanInput = (emailOrPhone || '').trim().toLowerCase();

    if (!cleanInput) {
      return { success: false, error: 'Please enter your Mobile number, Email address, or Name.' };
    }

    // Find account by email, phone, or name
    let found = currentUsers.find(
      u => (u.email && u.email.toLowerCase() === cleanInput) ||
           (u.phone && u.phone.toLowerCase() === cleanInput) ||
           (u.name && u.name.toLowerCase() === cleanInput)
    );

    // If no match by exact email/phone/name, but user provided password === 'demo' or clicked role demo
    if (!found && (password === 'demo')) {
      found = currentUsers.find(u => u.role === selectedRole);
    }

    if (!found) {
      return { 
        success: false, 
        error: 'No registered account found with this Mobile or Email. Please register first!' 
      };
    }

    // Verify password (allow demo password for demo accounts if user entered demo)
    if (found.password && found.password !== password && password !== 'demo') {
      return { 
        success: false, 
        error: 'Incorrect password. Please check your credentials and try again.' 
      };
    }

    const userData = { ...found, role: selectedRole || found.role };
    delete userData.password;
    setUser(userData);
    localStorage.setItem('crophealth_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const register = (data) => {
    const storedRegistered = localStorage.getItem('crophealth_registered_users');
    const currentUsers = storedRegistered ? JSON.parse(storedRegistered) : (registeredUsers.length ? registeredUsers : DEFAULT_USERS);

    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPhone = (data.phone || '').trim();

    // Check duplicate phone or email
    const existing = currentUsers.find(
      u => (cleanPhone && u.phone === cleanPhone) || (cleanEmail && u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (existing) {
      return {
        success: false,
        error: 'An account with this Mobile Number or Email already exists. Please login.'
      };
    }

    const newUser = {
      id: Date.now(),
      role: data.role || 'farmer',
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      password: data.password,
      state: data.state || 'Maharashtra',
      region: data.region || 'Nashik',
      language: data.language || 'mr',
      department: data.department || '',
      designation: data.designation || '',
      govCode: data.govCode || '',
      crops: data.crops || ['mango', 'tomato']
    };

    const updatedUsers = [newUser, ...currentUsers];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('crophealth_registered_users', JSON.stringify(updatedUsers));

    const userData = { ...newUser };
    delete userData.password;

    setUser(userData);
    localStorage.setItem('crophealth_user', JSON.stringify(userData));

    return { success: true, user: userData };
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const storedRegistered = localStorage.getItem('crophealth_registered_users');
    const currentUsers = storedRegistered ? JSON.parse(storedRegistered) : DEFAULT_USERS;
    const matching = currentUsers.find(u => u.role === newRole) || { ...user, role: newRole };
    const updated = { ...matching, role: newRole };
    delete updated.password;
    setUser(updated);
    localStorage.setItem('crophealth_user', JSON.stringify(updated));
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('crophealth_user', JSON.stringify(updated));

    // Update in registeredUsers list as well
    const storedRegistered = localStorage.getItem('crophealth_registered_users');
    if (storedRegistered) {
      const currentUsers = JSON.parse(storedRegistered);
      const updatedList = currentUsers.map(u => u.id === user.id ? { ...u, ...updates } : u);
      setRegisteredUsers(updatedList);
      localStorage.setItem('crophealth_registered_users', JSON.stringify(updatedList));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crophealth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, registeredUsers, login, register, updateUser, switchRole, logout, DEFAULT_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

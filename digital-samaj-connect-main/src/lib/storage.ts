// Mock storage utilities for the app
export const storage = {
  // Auth
  isFirstTime: () => !localStorage.getItem('digitalSamaj_hasLoggedIn'),
  setLoggedIn: (phone: string) => {
    localStorage.setItem('digitalSamaj_hasLoggedIn', 'true');
    localStorage.setItem('digitalSamaj_phone', phone);
  },
  getPhone: () => localStorage.getItem('digitalSamaj_phone'),
  logout: () => {
    localStorage.removeItem('digitalSamaj_hasLoggedIn');
    localStorage.removeItem('digitalSamaj_phone');
  },

  // Theme
  getTheme: () => localStorage.getItem('digitalSamaj_theme') || 'light',
  setTheme: (theme: string) => localStorage.setItem('digitalSamaj_theme', theme),

  // Language
  getLanguage: () => localStorage.getItem('digitalSamaj_language') || 'English',
  setLanguage: (lang: string) => localStorage.setItem('digitalSamaj_language', lang),

  // Font Size
  getFontSize: () => localStorage.getItem('digitalSamaj_fontSize') || 'medium',
  setFontSize: (size: string) => localStorage.setItem('digitalSamaj_fontSize', size),

  // User Profile
  getUserProfile: () => {
    const profile = localStorage.getItem('digitalSamaj_profile');
    return profile ? JSON.parse(profile) : { name: 'User', profilePic: null };
  },
  setUserProfile: (profile: any) => {
    localStorage.setItem('digitalSamaj_profile', JSON.stringify(profile));
  },

  // Notices
  getNotices: () => {
    const notices = localStorage.getItem('digitalSamaj_notices');
    return notices ? JSON.parse(notices) : [];
  },
  saveNotices: (notices: any[]) => {
    localStorage.setItem('digitalSamaj_notices', JSON.stringify(notices));
  },

  // Bills
  getBills: () => {
    const bills = localStorage.getItem('digitalSamaj_bills');
    return bills ? JSON.parse(bills) : {
      dues: [
        { id: 1, name: 'Maintenance Fee', amount: 5000, dueDate: '2025-12-15' },
        { id: 2, name: 'Water Bill', amount: 800, dueDate: '2025-12-10' },
      ],
      paid: []
    };
  },
  saveBills: (bills: any) => {
    localStorage.setItem('digitalSamaj_bills', JSON.stringify(bills));
  },

  // Cart
  getCart: () => {
    const cart = localStorage.getItem('digitalSamaj_cart');
    return cart ? JSON.parse(cart) : [];
  },
  saveCart: (cart: any[]) => {
    localStorage.setItem('digitalSamaj_cart', JSON.stringify(cart));
  },

  // Communities
  getCommunities: () => {
    const communities = localStorage.getItem('digitalSamaj_communities');
    return communities ? JSON.parse(communities) : { created: [], joined: [] };
  },
  saveCommunities: (communities: any) => {
    localStorage.setItem('digitalSamaj_communities', JSON.stringify(communities));
  },

  // Complaints
  getComplaints: () => {
    const complaints = localStorage.getItem('digitalSamaj_complaints');
    return complaints ? JSON.parse(complaints) : [];
  },
  saveComplaints: (complaints: any[]) => {
    localStorage.setItem('digitalSamaj_complaints', JSON.stringify(complaints));
  },

  // Family Members
  getFamilyMembers: () => {
    const members = localStorage.getItem('digitalSamaj_familyMembers');
    return members ? JSON.parse(members) : [];
  },
  saveFamilyMembers: (members: any[]) => {
    localStorage.setItem('digitalSamaj_familyMembers', JSON.stringify(members));
  },

  // Documents
  getDocuments: () => {
    const docs = localStorage.getItem('digitalSamaj_documents');
    return docs ? JSON.parse(docs) : [];
  },
  saveDocuments: (docs: any[]) => {
    localStorage.setItem('digitalSamaj_documents', JSON.stringify(docs));
  },

  // Notifications
  getNotifications: () => {
    const notifs = localStorage.getItem('digitalSamaj_notifications');
    return notifs ? JSON.parse(notifs) : [];
  },
  saveNotifications: (notifs: any[]) => {
    localStorage.setItem('digitalSamaj_notifications', JSON.stringify(notifs));
  },
  addNotification: (message: string) => {
    const notifs = storage.getNotifications();
    notifs.unshift({ id: Date.now(), message, read: false, timestamp: new Date().toISOString() });
    storage.saveNotifications(notifs);
  }
};

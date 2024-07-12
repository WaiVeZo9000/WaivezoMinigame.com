import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
  profileImage : string;
  setProfileImage : (name : string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');

  return (
    <UserContext.Provider value={{ username, setUsername, profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

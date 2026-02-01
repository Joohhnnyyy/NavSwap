"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'station' | 'control';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  roleLabel: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('station');

  const roleLabel = role === 'station' ? 'Station Ops' : 'Control Center Admin';

  return (
    <RoleContext.Provider value={{ role, setRole, roleLabel }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

'use client';

import { createContext, ReactElement, ReactNode, useState, useSyncExternalStore } from 'react';

interface ModalContextType {
  modal: {
    isOpen: boolean;
    contextChildren: ReactNode;
  };
  changeChild: (child: ReactNode) => void;
  closeModal: () => void;
  currentProject: string;
  changeProject: (project: string) => void;
  currentProjectId: string;
  changeProjectId: (projectId: string) => void;
  currentRole: string;
  changeRole: (role: string) => void;
  currentAuthStatus: 'loginin' | 'logoutin';
  changeAuthStatus: (status: 'loginin' | 'logoutin') => void;
}

const initialContext: ModalContextType = {
  modal: {
    isOpen: false,
    contextChildren: <p>My start</p> as ReactElement,
  },
  changeChild: () => {},
  closeModal: () => {},
  currentProject: '',
  changeProject: () => {},
  currentProjectId: '',
  changeProjectId: () => {},
  currentRole: '',
  changeRole: () => {},
  currentAuthStatus: 'logoutin',
  changeAuthStatus: () => {},
};

const MyContext = createContext<ModalContextType>(initialContext);

type AppStorageSnapshot = {
  currentProject: string;
  currentProjectId: string;
  currentRole: 'admin' | 'chief' | 'designer' | 'pm' | '';
  currentAuthStatus: 'loginin' | 'logoutin';
};

const DEFAULT_SNAPSHOT: AppStorageSnapshot = {
  currentProject: '',
  currentProjectId: '',
  currentRole: '',
  currentAuthStatus: 'logoutin',
};

let cachedSnapshot: AppStorageSnapshot = DEFAULT_SNAPSHOT;

function subscribeToStorage(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const listener = () => onStoreChange();
  window.addEventListener('storage', listener);
  window.addEventListener('app-storage-change', listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener('app-storage-change', listener);
  };
}

function normalizeRole(value: string): 'admin' | 'chief' | 'designer' | 'pm' | '' {
  const role = value.trim().toLowerCase();
  if (role === 'admin' || role === 'chief' || role === 'designer' || role === 'pm') {
    return role;
  }
  return '';
}

function getStorageSnapshot(): AppStorageSnapshot {
  if (typeof window === 'undefined') {
    return DEFAULT_SNAPSHOT;
  }
  const authStatus = localStorage.getItem('authStatus') === 'loginin' ? 'loginin' : 'logoutin';
  const nextSnapshot: AppStorageSnapshot = {
    currentProject: localStorage.getItem('currentProject') || '',
    currentProjectId: localStorage.getItem('currentProjectId') || '',
    currentRole: normalizeRole(localStorage.getItem('role') || ''),
    currentAuthStatus: authStatus,
  };

  if (
    cachedSnapshot.currentProject === nextSnapshot.currentProject &&
    cachedSnapshot.currentProjectId === nextSnapshot.currentProjectId &&
    cachedSnapshot.currentRole === nextSnapshot.currentRole &&
    cachedSnapshot.currentAuthStatus === nextSnapshot.currentAuthStatus
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = nextSnapshot;
  return cachedSnapshot;
}

function emitStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('app-storage-change'));
  }
}

function setStorageItem(key: string, value: string) {
  if (typeof window !== 'undefined') {
    if (value === '') {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
    emitStorageChange();
  }
}

function MyContextProvider({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  const [modal, setModal] = useState(initialContext.modal);
  const storageSnapshot = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    () => DEFAULT_SNAPSHOT
  );

  function changeChild(child: ReactNode) {
    setModal({
      ...modal,
      isOpen: true,
      contextChildren: child,
    });
  }

  function closeModal() {
    setModal({
      ...modal,
      isOpen: false,
    });
  }

  function changeProject(nextProject: string) {
    setStorageItem('currentProject', nextProject);
  }

  function changeProjectId(nextProjectId: string) {
    setStorageItem('currentProjectId', nextProjectId);
  }

  function changeRole(nextRole: string) {
    setStorageItem('role', normalizeRole(nextRole));
  }

  function changeAuthStatus(status: 'loginin' | 'logoutin') {
    setStorageItem('authStatus', status);
  }

  return (
    <MyContext.Provider
      value={{
        modal,
        changeChild,
        closeModal,
        currentProject: storageSnapshot.currentProject,
        changeProject,
        currentProjectId: storageSnapshot.currentProjectId,
        changeProjectId,
        currentRole: storageSnapshot.currentRole,
        changeRole,
        currentAuthStatus: storageSnapshot.currentAuthStatus,
        changeAuthStatus,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };

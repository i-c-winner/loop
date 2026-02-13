'use client';
import {createContext, useState, ReactNode, ReactElement, useEffect} from 'react';
interface ModalContextType {
  modal: {
    isOpen: boolean;
    contextChildren: ReactNode;
  };
  changeChild: (child: ReactNode) => void;
  closeModal: () => void;
  currentProject: string;
  changeProject: (project: string)=>void;
  currentProjectId: string;
  changeProjectId: (projectId: string)=>void;
  currentRole: string;
  changeRole: (role: string)=>void;
  currentAuthStatus: 'loginin' | 'logoutin';
  changeAuthStatus: (status: 'loginin' | 'logoutin')=>void;
}
const initialContext: ModalContextType = {
  modal: {
    isOpen: false,
    contextChildren: <p>My start</p> as ReactElement
  },
  changeChild: () => {},
  closeModal: () => {
    console.log('closeModal')
  },
  currentProject: '',
  changeProject: ()=>{},
  currentProjectId: '',
  changeProjectId: ()=>{},
  currentRole: '',
  changeRole: ()=>{},
  currentAuthStatus: 'logoutin',
  changeAuthStatus: ()=>{}
};
const MyContext = createContext<ModalContextType>(initialContext);
function MyContextProvider({children}:  Readonly<{
  children: React.ReactElement;
}>) {
  const [modal, setModal] = useState(initialContext.modal);
  const [project, setProject] = useState(initialContext.currentProject);
  const [projectId, setProjectId] = useState(initialContext.currentProjectId);
  const [role, setRole] = useState(initialContext.currentRole);
  const [authStatus, setAuthStatus] = useState<'loginin' | 'logoutin'>(initialContext.currentAuthStatus);
  function changeChild(child: ReactNode) {
    setModal({
      ...modal,
      isOpen: true,
      contextChildren: child
    });
  }
  function closeModal() {
    setModal({
      ...modal,
      isOpen: false,
    });
  }
  function changeProject(project: string) {
    setProject(project)
  }
  function changeProjectId(projectId: string) {
    setProjectId(projectId)
  }
  function changeRole(role: string) {
    setRole(role)
  }
  function changeAuthStatus(status: 'loginin' | 'logoutin') {
    setAuthStatus(status)
  }

  useEffect(() => {
    const sync = () => {
      setProject(localStorage.getItem('currentProject') || '');
      setProjectId(localStorage.getItem('currentProjectId') || '');
      setRole(localStorage.getItem('role') || '');
      setAuthStatus(localStorage.getItem('authStatus') === 'loginin' ? 'loginin' : 'logoutin');
    };
    sync();
  }, []);


  return (
    <MyContext.Provider value={{ modal, changeChild, closeModal, currentProject: project, changeProject, currentProjectId: projectId, changeProjectId, currentRole: role, changeRole, currentAuthStatus: authStatus, changeAuthStatus }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };

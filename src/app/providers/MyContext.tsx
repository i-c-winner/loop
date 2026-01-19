'use client';
import {createContext, useState, ReactNode, ReactElement} from 'react';

interface ModalContextType {
  modal: {
    isOpen: boolean;
    contextChildren: ReactNode;

  };
  changeChild: (child: ReactNode) => void;
  closeModal: () => void;
  currentProject: string;
  changeProject: (project: string)=>void;
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
  currentProject: 'start',
  changeProject: ()=>{}
};

const MyContext = createContext<ModalContextType>(initialContext);

function MyContextProvider({children}:  Readonly<{
  children: React.ReactElement;
}>) {
  const [modal, setModal] = useState(initialContext.modal);
  const [project, setProject] = useState(initialContext.currentProject);

  function changeChild(child: ReactNode) {
    setModal({
      ...modal,
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

  return (
    <MyContext.Provider value={{ modal, changeChild, closeModal, currentProject: project, changeProject }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };

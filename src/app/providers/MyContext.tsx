'use client';
import {createContext, useState, ReactNode, ReactElement} from 'react';

interface ModalContextType {
  modal: {
    isOpen: boolean;
    contextChildren: ReactNode;
  };
  changeChild: (child: ReactNode) => void;
  closeModal: () => void;
}

const initialContext: ModalContextType = {
  modal: {
    isOpen: false,
    contextChildren: <p>My start</p> as ReactElement
  },
  changeChild: () => {},
  closeModal: () => {
    console.log('closeModal')
  }
};

const MyContext = createContext<ModalContextType>(initialContext);

interface MyContextProviderProps {
  contextChildren: ReactNode;
}

function MyContextProvider({children}:  Readonly<{
  children: React.ReactElement;
}>) {
  const [modal, setModal] = useState(initialContext.modal);

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

  return (
    <MyContext.Provider value={{ modal, changeChild, closeModal }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };

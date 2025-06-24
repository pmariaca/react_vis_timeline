import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  tlRef: null,
  tlItemRef: null,
  tlItem: {},
  tlZoomMin: 'day',
  tlValuesForm: {},
  tlItemLength: 0,
  tlDepRef: null
})

const VisProvider = ({ children }) => {
  const [tlRef, setTlRef] = useState({})
  const [tlDepRef, setTlDepRef] = useState({})
  const [tlItemRef, setTlItemRef] = useState({})
  const [tlItem, setTlItem] = useState({})
  const [tlZoomMin, setTlZoomMin] = useState({})
  const [tlItemLength, setTlItemLength] = useState({})
  const [tlValuesForm, setTlValuesForm] = useState({
    id: '',
    content: '',
    start: '',
    end: '',
    className: 'opt-content-move-0',
    style: '',
    type: '',
    imageUrl: '',
    link: [],
  });


  // const setMitl = (token) => {
  //   if(mitl){
  //     localStorage.setItem(mitl)
  //   }
  // }

  return (
    <StateContext.Provider value={{
      tlRef, setTlRef, tlItemRef, setTlItemRef,
      tlItem, setTlItem, tlZoomMin, setTlZoomMin,
      tlValuesForm, setTlValuesForm,
      tlItemLength, setTlItemLength,
      tlDepRef, setTlDepRef
    }}>
      {children}
    </StateContext.Provider>
  )
}

const useVisContext = () => {
  return useContext(StateContext);
};

export { VisProvider, useVisContext };

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, children }) {
  const dialog = useRef();

  console.log("Modal create! :)");

  useEffect(() => {
    //Cuz the JSX render at first, so the dialog.current is 'undefined' at top-level.
    //So u should use 'useEffect' to make the dialog connected to the right DOM.
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // })

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* Cuz the model is always alive, so u need to control the cofirm-box extraditionally.*/}
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;

import React from 'react';
import ReactDOM from 'react-dom';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';

const modalElement = document.getElementById('modal-root');
export default function Modal({ toggle, isShowing, hide, id, addPerson }) {
  if (isShowing) {
    return ReactDOM.createPortal(
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden role="dialog">
          <div className="modal">
            <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {addPerson ? (
              <AddPerson toggle={toggle} />
            ) : (
              <EditPerson toggle={toggle} id={id} />
            )}
          </div>
        </div>
      </>,
      modalElement
    );
  }

  return null;
}

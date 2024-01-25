import React from 'react'
import './Modal.css';
const Modal = ({ onClose }) => {
    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>Warning Message</h4>
                    <button onClick={onClose}>
                        X
                    </button>
                </div>
                <div className='modal-body'>
                    <span>!</span>
                    No word  found
                </div>
            </div>
        </div>
    )
}

export default Modal

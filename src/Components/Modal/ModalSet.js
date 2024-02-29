import {observer} from "mobx-react-lite";
import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-modal'
import './modal.css'

export const ModalSet =  observer(() => {

    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{

    },[])

    // const customStyles = {
    //     overlay: {
    //         zIndex: 999999,
    //         backgroundColor: 'transparent'
    //     }
    // };

    return(
        <div>
            <button className='modal-button' onClick={() => {
                    setShowModal(true)
                }}>Set
            </button>
            <Modal className="modal-set"
                // style={customStyles}
                ariaHideApp={false}
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <div>
                    <button className='modal-button' onClick={() => {
                        setShowModal(false)
                    }}>Set
                    </button>
                    <div className="title">
                        SETTINGS
                    </div>
                    {/*<div className="title">*/}
                    {/*    0000*/}
                    {/*</div>*/}
                </div>
            </Modal>

        </div>

    )

});
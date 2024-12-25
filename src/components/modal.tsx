/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md"
import ReactModal from 'react-modal';

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body');
}

type Props = {
  supportingText?: string;
  heading?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Function;
  isFullScreen?: boolean;
  size?: string;
  className?: string;
}

export default function Modal({ children, isOpen, setIsOpen, size, className, heading, isFullScreen }: Props) {
  const containerRef = useRef(null);

  const handleOutsideClick = (e: any) => {
    if (containerRef.current && !!(containerRef.current as HTMLElement).contains && !(containerRef.current as HTMLElement).contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (event: any) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined' && isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('click', handleOutsideClick);
      }
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="modal"
      onRequestClose={() => setIsOpen(false)}
      closeTimeoutMS={350}
      style={{
        content: {
          borderRadius: isFullScreen ? "8px" : "",
          width: size || "510px",
          inset: 0,
        },
        overlay: {
          background: "radial-gradient(100% 337.36% at 0% 0%, rgba(0, 7, 12, 0.4) 0%, rgba(0, 7, 12, 0.3) 100%)",
          alignItems: isFullScreen ? "" : "center",
          justifyContent: isFullScreen ? "flex-end" : "center",
        }
      }}
    >
      <div className={`${!size ? "md:max-w-[510px]" : ""} main-content w-full mx-auto bg-white relative ${isFullScreen ? "min-h-screen" : ""} ${className}`}
        style={{ maxWidth: size }}>
        <div className={`py-6 ${isFullScreen ? "min-h-screen" : ""}`}>
          <div onClick={() => setIsOpen(false)} className='z-[100] shadow-md absolute bg-white top-6 right-4 grid place-items-center w-10 h-10 rounded-full hover:shadow-md hover:opacity-50 cursor-pointer duration-500 ease-in-out'>
            <MdClose size={22} />
          </div>
          {children}
        </div>
      </div>
    </ReactModal>
  );
}

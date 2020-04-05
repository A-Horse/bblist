import React, { useEffect, useState, ReactNode } from 'react';
import './AppDropDown.scss';

function DropDownToggle({ onClick, children }) {
  return <div onClick={onClick}>{children}</div>;
}

function DropDownOverlay({ children }) {
  return <div className="DropDownOverlay">{children}</div>;
}

interface DropDownProps {
  toggle: (show: boolean) => ReactNode;
  overlay: ReactNode;
  className?: string;
  position?: 'center' | 'right';
}

export function AppDropDown({
  toggle,
  overlay,
  className = '',
  position = 'center',
}: DropDownProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onClickOutSide = () => {
      if (show) {
        setTimeout(() => {
          setShow(false);
        });
      }
    };
    window.document.body.addEventListener('click', onClickOutSide);
    return function cleanup() {
      window.document.body.removeEventListener('click', onClickOutSide);
    };
  }, [show]);

  return (
    <div className={`AppDropDown ${className} ${position}`}>
      <DropDownToggle onClick={() => setShow(true)}>
        {toggle(show)}
      </DropDownToggle>

      {show && <DropDownOverlay>{overlay}</DropDownOverlay>}
    </div>
  );
}

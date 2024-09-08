import React, { useState, useEffect } from 'react';

import Icons from './Icons.tsx';


const colors:{[key:string]: string} = {
  success:'#00B386',
  info: '#5367ff',
  warn: '#ffb61b',
  error: '#eb5b3c',
  loading: '#5367ff'
};


const Toast = (props:Props) => {
  const place = (props.position || 'top-center').includes('bottom') ? 'Bottom' : 'Top';
  const marginType = `margin${place}`;

  const className = [
    'ct-toast borderPrimary backgroundPrimary',
    props.onClick ? ' ct-cursor-pointer' : '',
    `ct-toast-${props.type}`
  ].join(' ');
  const borderLeft = `${props.bar?.size || '3px'} ${props.bar?.style || 'solid'} ${props.bar
    ?.color || colors[ props.type ]}`;

  const CurrentIcon = Icons[ props?.type ];

  const [ animStyles, setAnimStyles ] = useState<React.CSSProperties>({ opacity: 0, [ marginType ]: -15 });

  const style = {
    paddingLeft: props.title ? 25 : undefined,
    minHeight: props.title ? 32 : undefined,
    borderLeft,
    ...animStyles
  };


  const handleHide = () => {
    setAnimStyles({ opacity: 0, [ marginType ]: '-15px' });

    setTimeout(() => {
      props?.onHide?.(props.id, props.position);
    }, 300);
  };

  useEffect(() => {
    const animTimeout = setTimeout(() => {
      setAnimStyles({ opacity: 1, [ marginType ]: '15px' });
    }, 50);

    let hideTimeout: ReturnType<typeof setTimeout> | undefined;

    if (props.hideAfter !== 0) {
      hideTimeout = setTimeout(() => {
        handleHide();
      }, (props?.hideAfter || 1) * 2000);
    }

    return () => {
      clearTimeout(animTimeout);

      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!props.show) {
      handleHide();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ props.show ]);

  const clickProps = {
    tabIndex: 0,
    // onClick: props.onClick,
    onKeyPress: (e:React.KeyboardEvent) => {
      if (e.keyCode === 13) {
        props?.onClick?.(e);
      }
    }
  };

  return (
    <div
      className={className}
      role={props.role ? props.role : 'status'}
      style={style}
      {...(props.onClick ? clickProps : {})}
    >
      <div className="ct-type-icon">
        {props.renderIcon ? props.renderIcon() : <CurrentIcon />}
      </div>

      <div className="ct-text-group">
        {props.title && <div className="ct-heading">{props.title}</div>}
        <div className="ct-text">{props.subText}</div>
      </div >

    </div >
  );
};


type Props = {
  type: 'success' | 'info' | 'warn' | 'error'; //required
  title?: string | React.ReactNode;
  subText?: string | React.ReactNode;
  show?: boolean;
  onHide?: Function;
  id?: string | number;
  hideAfter?: number;
  position?: string;
  renderIcon?: Function;
  bar?: any;
  onClick?: Function;
  role?: string;
};

Toast.defaultProps = {
  id: undefined,
  show: true,
  onHide: undefined,
  hideAfter: 3,
  position: 'top-center',
  renderIcon: undefined,
  bar: {},
  onClick: undefined,
  role: 'status',
  title: undefined
};

export default Toast;

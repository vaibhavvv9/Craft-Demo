import React from 'react';
import ReactDOM from 'react-dom';

import ToastContainer from './components/ToastContainer.tsx';
import Toast from './components/Toast.tsx';

import './cogoToast.css';

let ctToastCount = 0;

function getData(obj: any, path: string, def: null | unknown = null): any {

  function replaceAll(originalString:string, search:string, replace:string) {
    return originalString?.split(search)?.join(replace);
  }


  const sanitzePath = (currPath: string) => {

    const stringsToReplace = [ '[', ']', '..' ];

    // 'a.[0].b.c' => 'a.0.b.c'
    const currPathString = String(currPath);

    let sanitizedPath = currPathString;

    for (const index in stringsToReplace) {
      sanitizedPath = replaceAll(sanitizedPath, stringsToReplace[index], '.');
    }

    const isLastIndexDot = sanitizedPath.lastIndexOf('.') === sanitizedPath.length - 1;

    sanitizedPath = sanitizedPath.slice(0, isLastIndexDot ? sanitizedPath.lastIndexOf('.') : sanitizedPath.length);

    return sanitizedPath;
  };

  try {
    const newPathArray = String(sanitzePath(path)).split('.');

    for (const path of newPathArray) {
      obj = obj?.[path] as any;
    }

    return typeof obj === 'undefined' ? def : obj;

  } catch (e) {
    console.error('Error while using getData', e)

    return def;
  }
}

const cogoToast = (options:Options) => {
  let rootContainer = document.getElementById(getData(options, 'toastContainerID', null) || 'ct-container');

  if (!options.position) {
    options.position = 'top-right';
  }

  if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = 'ct-container';
    document.body.appendChild(rootContainer);
  }

  ctToastCount += 1;

  const hideTime = (options?.hideAfter === undefined ? 3 : options.hideAfter) * 1000;
  const toast = { id: ctToastCount, ...options };

  ReactDOM.render(<ToastContainer toast={toast} />, rootContainer);


  const hide = () => {
    ReactDOM.render(<ToastContainer hiddenID={toast.id} />, rootContainer);
  };

  const completePromise:any = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, hideTime);
  });

  completePromise.hide = hide;

  return completePromise;
};

cogoToast.success = (options:Options) => cogoToast({ ...options, type: 'success' });
cogoToast.warn = (options:Options) => cogoToast({ ...options, type: 'warn' });
cogoToast.info = (options:Options) => cogoToast({ ...options, type: 'info' });
cogoToast.error = (options:Options) => cogoToast({ ...options, type: 'error' });
cogoToast.loading = (options:Options) => cogoToast({ ...options, type: 'loading' });


type Options = {
  position?: string;
  type?: 'success' | 'warn' | 'error' | 'info' | 'loading';
  hideAfter?: number;
  subText?: string;
  title?: string;
}

export { Toast };

export default cogoToast;

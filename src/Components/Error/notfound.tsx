import React from 'react';
import notfound from '../../assets/not_found.jpg'

const NotFoundError = () => {

return(
    <div style={{ width: '100%', height: 'calc(100vh - 100px)'}}>
        <img src={notfound} alt="not_found" width={'100%'} height={'100%'}/>
    </div>
)

}


export default NotFoundError;
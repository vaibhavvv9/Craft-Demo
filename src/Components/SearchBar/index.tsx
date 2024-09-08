import React, { Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails, handleSearch } from '../../stores/actionCreators.ts';

import searchIcon from '../../assets/searchIcon.svg';



const SearchBar = () => {
    const dispatch = useDispatch<any>();
    const search = useSelector((state: any) => state.search);


    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleSearch(e.target.value));
    },  [dispatch])

    const handleSearchClick = useCallback(() => {
        dispatch(fetchCarDetails(search));
    }, [dispatch, search])

    return (
        <div className='vspace-between'>
            <div style={{ marginLeft: '16px'}}>
            <Suspense fallback={<div>logo</div>}>
            <img height="48" src= {require('../../assets/inuit_logo.png')} alt='logo'/>
            </Suspense>
            </div>
        <div style={{ position: 'relative' , width: '300px', right: '28px'}}>
            <input 
            className='inputBar' 
            type="text" 
            placeholder="Search..."
            value={search}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} 
            onChange={handleChange} />
            <img src={searchIcon} onClick={handleSearchClick} alt='search' width={24} height={24} style= {{
                position: 'absolute',
                right: 0,
                top: 10,
                cursor: 'pointer'
            }}/>
        </div>
        </div>
    )
}

export default SearchBar;

 
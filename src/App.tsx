import React, { useCallback, useEffect, useRef } from 'react';
import SearchBar from './Components/SearchBar/index.tsx';

import { useDispatch } from 'react-redux';
import Details from './Components/Details/index.tsx';
import Cards from './Components/Cards/index.tsx';
import Compare from './Components/Compare/index.tsx';
import { fetchCarList } from './stores/actionCreators.ts';

import './App.css';


const App = () => {
  const dispatch = useDispatch<any>();
  const compareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchCarList())
  }, [dispatch])

  const handleScrollToCompare = useCallback(() => {
    if (compareRef.current) {
      setTimeout(() => {
        compareRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100); // Adding a slight delay to ensure the content is fully loaded
    }

  }, []);


  return (
    <div className="App">
      <SearchBar />
      <Details handleScrollToCompare={handleScrollToCompare} /> 
      <Cards handleScrollToCompare={handleScrollToCompare} />
      <div ref={compareRef}>
      <Compare  />
      </div>
    </div>
  );
}

export default App;

import { gql,useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'
import Planets from './Planets';

const Search = ({inputVal,onChange,onSearch}) =>{
  return (
    <div>
      <input placeholder='Type to search' 
      value={inputVal}
      onChange={onChange}
      />
      <button onClick={onSearch}>Search</button>
      {/* <Planets newPlanets={data?data.planets:null}/> */}
    </div>
  )
}

export default Search
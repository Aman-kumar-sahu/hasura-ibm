import { gql, useLazyQuery } from '@apollo/client'
import React, { useState } from 'react'
import Planets from './Planets'
import Search from './Search'

const SEARCH=gql`
query Search($item:String!){
  planets(order_by:{name:asc},where:{name:{_ilike:$item}}){
    id
    name
    element
  }
}`

const PlanetSearch = () => {
  const [search,{loading,error,data}]=useLazyQuery(SEARCH);
  const [inputVal,setInputVal]=useState("");

  return (
      <>
    <Search
    inputVal={inputVal}
    onChange={(e)=>setInputVal(e.target.value)}
    onSearch={()=>search({variables:{item:`%${inputVal}%`}})}
    />
    <Planets newPlanets={data ? data.planets : null}/>
    </>
  )
}

export default PlanetSearch
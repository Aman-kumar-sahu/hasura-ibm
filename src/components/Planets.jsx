import React from "react"
import { useQuery,gql } from "@apollo/client"
import { Link } from "react-router-dom";

const PLANETS=gql`
{
    planets{
        id
        name
        element
    }
}
`;

export default function Planets({newPlanets}){
    const { loading,error,data}= useQuery(PLANETS);

    const renderPlanets=(planets)=>{
        return planets.map(({id,name,element})=>(
            <div key={id}>
                <Link to={`/planet/${id}`} style={{textDecoration:'none'}}>
                    {name} | {element}
                </Link>
            </div>
         ));
    }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error :</p>;

    return <div>{renderPlanets(newPlanets || data.planets)}</div>
   
}
import { useSubscription,gql, useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const PLANET=gql`
subscription MyQuery($id: uuid!) {
    planets_by_pk(id: $id) {
      id
      name
      element
    reviews {
      id
      body
    }
}
}
  `;

  const REVIEW=gql`
  mutation MyQuery($body:String!,$id:uuid!) {
    insert_reviews(objects: {body: $body, planet_id: $id}) {
      affected_rows
    }
  }
  `;

const Planet = (props) => {
    let {id}=useParams();
    const [addVal,setAddVal]=useState("");
    const [addReviews]=useMutation(REVIEW);
    const {loading,error,data}=useSubscription(PLANET,{variables:{id}});
    if(loading) return <p>Loading...</p>
    // if(error) return <p>Error!</p>
    const {name,element,reviews}=data.planets_by_pk;
    console.log(name,element);
    console.log(reviews);
  return (
    <div>
        <h3>
            {name} | {element} 
        </h3>
        <input type="text"
        value={addVal}
        onChange={(e)=>setAddVal(e.target.value)} />
        <button 
        onClick={()=>{
          addReviews({variables:{id,body:addVal}})
          .then(()=>setAddVal(""))
          .catch((e)=>{
            setAddVal(e.message);
          });
        }}>
          Submit</button>
        <div>
            {reviews.map((review)=>(
                <h2 key={review.id}>{review.body}</h2>
))}
        </div> 
    </div>
  )
}

export default Planet
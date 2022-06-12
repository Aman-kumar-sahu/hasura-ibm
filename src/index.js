import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache,split } from '@apollo/client'
import Planets from './components/Planets';
import Search from './components/Search';
import PlanetSearch from './components/PlanetSearch';
import { BrowserRouter,Route,Routes,useParams } from 'react-router-dom';
import Planet from './components/Planet';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';
// import reportWebVitals from './reportWebVitals';

const httpLink=new HttpLink({
  uri:"https://ruling-loon-62.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "eJM1pTPRC5taEFrWpGdHai5nOuZsPR3fryffflq9bE5Ra0XgjjNGMobAZrkZ3QPs"
  }
});

const wsLink=new WebSocketLink({
  uri:'wss://ruling-loon-62.hasura.app/v1/graphql',
  options:{
    reconnect:true,
    connectionParams:{
    headers: {
      "x-hasura-admin-secret": "eJM1pTPRC5taEFrWpGdHai5nOuZsPR3fryffflq9bE5Ra0XgjjNGMobAZrkZ3QPs"
    }
  }
  },
});

const splitLink=split(
  ({query}) =>{
    const definition=getMainDefinition(query);
    return (
      definition.kind==="OperationDefinition" &&
      definition.operation==="subscription"
    );
  },
  wsLink,
  httpLink
);

const client=new ApolloClient({
  cache:new InMemoryCache(),
  link:splitLink,
});
console.log(client);

const App=()=>(
  <BrowserRouter>
  <ApolloProvider client={client}>
      <Routes>
      <Route path="/" element={<PlanetSearch/>}/>
      <Route path="/planet/:id" element={<Planet/>}/>
      </Routes>
      {/* <PlanetSearch/> */}
    </ApolloProvider>
    </BrowserRouter>
);
ReactDOM.render(<App/>,document.getElementById('root'));

import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Listing from './Listing.jsx';

const Searchbar = () => {
    const [search,setSearch] =useState("");
    const [results,setResults] =useState([]);

    const sendSearchRequest =async (e)=>{
        e.preventDefault();
        try{
            console.log("Sending search request with query:", search);
            const response = await axios.post("http://localhost:3000/api/v1/search", {
                query: search,
                withCredentials: true
            });
            setResults(response.data.products || []);
        }catch(err){
            console.error("Error in search request:", err);
        }
    }
    console.log("Search query:", search);
  return (
    <div>
        <form>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              onClick={(e) => {
                sendSearchRequest(e)
              }}
            />
        </form>
        <Listing results={results} />
    </div>
  )
}

export default Searchbar
import React from 'react'

const Listing = (props) => {
  return (
    <div className=''>
      {props.results.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <img src={item.image} alt={item.title} />
          <a href={item.link}>View Product</a>
        </div>
      ))}
    </div>
  )
}

export default Listing
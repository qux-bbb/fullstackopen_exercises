import React from 'react'

const Filter = (props) =>
 <div>find countries <input value={props.filterValue} onChange={props.handleFilterValueChange} /></div>

export default Filter

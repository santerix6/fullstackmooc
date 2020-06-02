import React from 'react'

const Filter = (props) => {
  return <form>
            <div>
              find countries <input value={props.search} onChange={props.onChange}/>
            </div>
          </form>
}
export default Filter

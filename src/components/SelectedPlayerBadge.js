import React from 'react'

const SelectedPlayerBadge = ({item}) => {
  return (
    <li className={`playerBadge playerBadge--${item.id}`}>
        {item?.backNum} / {item?.name} / {item?.tier} {/* <span onClick={(e)=>delBadge(e)}>x</span> */}
    </li>
  )
}

export default SelectedPlayerBadge
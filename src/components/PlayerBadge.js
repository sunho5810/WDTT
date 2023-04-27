import React, { useEffect, useState } from 'react'

const PlayerBadge = ({item, selectedList, setSelectedList, entryIdx}) => {

    const clickBadge = (e) => {
        // console.log("target?", e.target);

        document.querySelector(`.entryMaker__playersList--${entryIdx}`).append(e.target);

        selectedList[selectedList.length] = {
            id: item.id,
            backNum: item.backNum,
            name: item.name,
            tier: item.tier
        }

        setSelectedList(selectedList);

        console.log("selectedList?", selectedList);
    }

    const delBadge = (e) => {
        document.querySelector(`.entryMaker__membersList--${entryIdx}`).append(e.target);
    }

  return (
    <li className='playerBadge' onClick={(e) => clickBadge(e)}>
        {item?.backNum} / {item?.name} / {item?.tier} {/* <span onClick={(e)=>delBadge(e)}>x</span> */}
    </li>
  )
}

export default PlayerBadge
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const PlayerBadge = ({item, index, selectedList, setSelectedList, personnel, setPersonnel}) => {


  const entryList = useSelector((state) => state.teams.entryList);

  const dispatch = useDispatch();

    const clickBadge = () => {

        setPersonnel(personnel + 1);

        const tempData = {
            id: item.id,
            index: index,
            backNum: item.backNum,
            name: item.name,
            tier: item.tier
        }
        
        selectedList[selectedList.length] = tempData;
        setSelectedList(selectedList);

        entryList[index].selected = true;
        dispatch({type: "UPDATE_ENTRY_LIST", payload: {data: entryList}});
    }

  return (
    <li className={`playerBadge`} onClick={() => clickBadge()}>
        {item?.backNum} / {item?.name} / {item?.tier} 
    </li>
  )
}

export default PlayerBadge
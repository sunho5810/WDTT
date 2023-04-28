import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const SelectedPlayerBadge = ({item, index, selectedList, personnel, setPersonnel}) => {

  // console.log("SelectedPlayerBadge -> selectedList?", selectedList);


  const entryList = useSelector((state) => state.teams.entryList);

  const dispatch = useDispatch();

  const delBadge = () => {
    setPersonnel(personnel - 1);

    entryList[item.index] = item;
    dispatch({type: "UPDATE_ENTRY_LIST", payload: {data: entryList}});

    selectedList.splice(index, 1);
  }

  return (
    <li className={`playerBadge`}>
        {item?.backNum} / {item?.name} / {item?.tier}
        <span className='delBadgeBtn' onClick={(e)=>delBadge(e)}/>
    </li>
  )
}

export default SelectedPlayerBadge
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { membersAction } from '../redux/actions/membersAction';

const MemberCard = ({item, tempList, setTempList, itemIdx, entryTempList, setEntryTempList}) => {

  const auth = useSelector((state) => state.auth.authenticate);

  const [updateData, setUpdateData] = useState({
    id: item.id,
    backNum: item.backNum,
    checkedEntry: item.checkedEntry,
    name: item.name,
    tier: item.tier,
    games: item.games,
    late: item.late,
    goals: item.goals,
    assists: item.assists
  });

  const [dataIndex, setDataIndex] = useState(null);

  useEffect(() => {
    tempList[dataIndex] = updateData;
    setTempList(tempList);
  }, [updateData])

  const changeValue = (e, dataName, idx) => {
    setUpdateData({...updateData, [dataName]: dataName == "name" ? e.target.value : parseFloat(e.target.value)});
    setDataIndex(idx);
  }

  const checkChecked = (e, id, idx) => {
    console.log("onChange!!");
    setUpdateData({...updateData, checkedEntry: e.target.checked});
    setDataIndex(idx);
    if(e.target.checked){
      entryTempList[entryTempList.length] = item;
      setEntryTempList(entryTempList);
    } else {
      for(var i = 0; i < entryTempList.length; i++){
        if(entryTempList[i].id == id){
          entryTempList.splice(i, 1);
        }
      }
    }
  }

  if(auth){
    return (
      <tr>
          <td><input type='checkbox' defaultChecked={item.checkedEntry} onChange={(e) => checkChecked(e, item.id, itemIdx)}/></td>
          <td>{itemIdx + 1}</td>
          <td><input className='input' type='text' defaultValue={item.backNum} onChange={(e) => changeValue(e, "backNum", itemIdx)}/></td>
          <td><input className='input' type='text' defaultValue={item.name} onChange={(e) => changeValue(e, "name", itemIdx)}/></td>
          <td>
            <select onChange={(e) => changeValue(e, "tier", itemIdx)} defaultValue={item.tier}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={1.5}>1.5</option>
              <option value={2}>2</option>
              <option value={2.5}>2.5</option>
              <option value={3}>3</option>
            </select>
          </td>
          <td><input className='input' type='text' defaultValue={item.games} onChange={(e) => changeValue(e, "games", itemIdx)}/></td>
          <td><input className='input' type='text' defaultValue={item.late} onChange={(e) => changeValue(e, "late", itemIdx)}/></td>
          <td><input className='input' type='text' defaultValue={item.goals} onChange={(e) => changeValue(e, "goals", itemIdx)}/></td>
          <td><input className='input' type='text' defaultValue={item.assists} onChange={(e) => changeValue(e, "assists", itemIdx)}/></td>
      </tr>
    )
  } else {
    return (
      <tr>
          <td>{itemIdx + 1}</td>
          <td>{item.backNum}</td>
          <td>{item.name}</td>
          <td>{item.tier}</td>
          <td>{item.games}</td>
          <td>{item.late}</td>
          <td>{item.goals}</td>
          <td>{item.assists}</td>
      </tr>
    )
  }
}

export default MemberCard
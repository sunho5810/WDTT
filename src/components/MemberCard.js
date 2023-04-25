import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { membersAction } from '../redux/actions/membersAction';

const MemberCard = ({item, setTempList, tempList, itemIdx}) => {

  const auth = useSelector((state) => state.auth.authenticate);
  // const membersList = useSelector((state) => state.members.membersList);

  const [updateData, setUpdateDate] = useState({
    id: item.id,
    backNum: item.backNum,
    name: item.name,
    tier: item.tier,
    games: item.games,
    goals: item.goals,
    assists: item.assists
  });

  const [dataIndex, setDataIndex] = useState(null);

  useEffect(() => {
    // console.log("---------------------")
    // console.log("updateData?", updateData);

    tempList[dataIndex] = updateData;
    setTempList(tempList);

    // console.log("useEffect - tempList?", tempList);
    // console.log("useEffect - membersList?", membersList);

  }, [updateData])

  const changeValue = (e, dataName, idx) => {
    setUpdateDate({...updateData, [dataName]: parseFloat(e.target.value)});
    setDataIndex(idx);
  }

  if(auth){
    return (
      <tr>
          <td>{updateData.id}</td>
          <td>{updateData.backNum}</td>
          <td>{updateData.name}</td>
          <td>
            <select onChange={(e) => changeValue(e, "tier", itemIdx)} defaultValue={item.tier}>
              <option value={1}>1</option>
              <option value={1.5}>1.5</option>
              <option value={2}>2</option>
              <option value={2.5}>2.5</option>
              <option value={3}>3</option>
            </select>
          </td>
          <td><input className='input' type='text' defaultValue={item.games} onChange={(e) => changeValue(e, "games", itemIdx)}/></td>
          <td><input className='input' type='text' defaultValue={item.goals} onChange={(e) => changeValue(e, "goals", itemIdx)}/></td>
          <td><input className='input' type='text' defaultValue={item.assists} onChange={(e) => changeValue(e, "assists", itemIdx)}/></td>
      </tr>
    )

    // return (
    //   <tr>
    //       <td>{updateData.id}</td>
    //       <td>{updateData.backNum}</td>
    //       <td>{updateData.name}</td>
    //       <td>
    //         <select onChange={(e) => setUpdateDate({...updateData, tier: e.target.value})}>
    //           <option defaultValue={item.tier}>{updateData.tier}</option>
    //           <option value={1}>1</option>
    //           <option value={1.5}>1.5</option>
    //           <option value={2}>2</option>
    //           <option value={2.5}>2.5</option>
    //           <option value={3}>3</option>
    //         </select>
    //       </td>
    //       <td><input className='input' type='text' defaultValue={item.games} onChange={(e) => setUpdateDate({...updateData, games: e.target.value})}/></td>
    //       <td><input className='input' type='text' defaultValue={item.goals} onChange={(e) => setUpdateDate({...updateData, goals: e.target.value})}/></td>
    //       <td><input className='input' type='text' defaultValue={item.assists} onChange={(e) => setUpdateDate({...updateData, assists: e.target.value})}/></td>
    //   </tr>
    // )
  } else {
    return (
      <tr>
          <td>{item.id}</td>
          <td>{item.backNum}</td>
          <td>{item.name}</td>
          <td>{item.tier}</td>
          <td>{item.games}</td>
          <td>{item.goals}</td>
          <td>{item.assists}</td>
      </tr>
    )
  }
}

export default MemberCard
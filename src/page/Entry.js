import React, { useEffect, useState } from 'react'
import EntryMaker from '../components/EntryMaker'
import { useDispatch, useSelector } from 'react-redux';
import { membersAction } from '../redux/actions/membersAction';

/* 
    팀 리스트
    멤버들 리스트(선택되면 없어지게)
    팀 갯수는 셀렉트 박스? input=number? 둘중하나 선택
*/

const Entry = () => {

    const {membersList, loading} = useSelector((state) => state.members);

    const [tempList, setTempList] = useState([]);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(membersAction.getMembersData());
    }, []);
    
    useEffect(() => {        
        if(loading == false){
            const copyArr = [...membersList];
            setTempList(copyArr);
        }
    }, [loading]);

    useEffect(() => {
        console.log("tempList?", tempList);
    }, [tempList])

  return (
    <div className='inner'>
        <EntryMaker/>
    </div>
  )
}

export default Entry
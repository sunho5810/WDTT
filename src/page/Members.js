import React, { useEffect, useState } from 'react'
import MemberCard from '../components/MemberCard'
import { useDispatch, useSelector } from 'react-redux'
import { membersAction } from '../redux/actions/membersAction';
import { ClipLoader } from 'react-spinners';
import { Button } from 'react-bootstrap';

const Members = () => {

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
    }, [loading])

    const clickUpdateMembersData = () => {
        dispatch(membersAction.updateMembersData(tempList));
        dispatch(membersAction.getMembersData());
        // console.log("update -> updateList?", updateList);
    }

    if(loading){
        return (
            <ClipLoader
                color="#0F1314"
                loading={loading}
                size={150}
            />
        )
    } else {
        return (
            <div className='inner'>
                <table className='tbl'>
                    <colgroup>
                        <col width="5%"/>
                        <col width="5%"/>
                        <col width="25%"/>
                        <col width="20%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                        <col width="10%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>등번호</th>
                            <th>이름</th>
                            <th>티어</th>
                            <th>게임 수</th>
                            <th>골</th>
                            <th>어시스트</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            membersList?.map((item, index) => (
                                <MemberCard key={item.id} itemIdx={index} item={item} tempList={tempList} setTempList={setTempList}/>
                            ))
                        }
                    </tbody>
                </table>
                <Button variant='dark' onClick={() => {clickUpdateMembersData()}}>수정</Button>
            </div>
        )
    }
}

export default Members
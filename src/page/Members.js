import React, { useEffect } from 'react'
import MemberCard from '../components/MemberCard'
import { useDispatch, useSelector } from 'react-redux'
import { membersAction } from '../redux/actions/membersAction';

const Members = () => {

    const membersList = useSelector((state) => state.members.membersList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(membersAction.getMembersData());
    }, [])

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
                    membersList?.map((item) => (
                        <MemberCard key={item.id} item={item}/>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Members
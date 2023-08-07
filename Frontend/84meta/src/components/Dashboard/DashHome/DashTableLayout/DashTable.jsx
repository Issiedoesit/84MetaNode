import React from 'react'
import DashRow from './DashRow'

const DashTable = () => {

    const dummy = [
        {
            id:"908hcbjjhb",
            name:"Test.pdf",
            size:"1029942",
            folder:"PDF",
            date:"2014-10-30",
            status:"saved",
        },
        {
            id:"350hcbjjhb",
            name:"Testing a longer name just for fun.csv",
            size:"2091958",
            folder:"CSV",
            date:"2017-03-09",
            status:"trashed",
        },
        {
            id:"084judjjhb",
            name:"Testing-json.json",
            size:"324646",
            folder:"JSON",
            date:"2020-12-12",
            status:"not saved",
        },
    ]
  return (
    <table className='w-full'>
        <thead className={`w-full`}>
            <tr className={`bg-brandBlue3x text-brandBlue2x text-xl font-medium w-full px-4 w-full`}>
                <td className={`px-4 py-4`}>File name</td>
                <td className={`px-4 py-4`}>File size</td>
                <td className={`px-4 py-4`}>Folder</td>
                <td className={`px-4 py-4`}>Date Created</td>
                <td className={`px-4 py-4`}>Status</td>
                <td className={`px-4 py-4`}></td>
            </tr>
        </thead>
        <tbody className={`w-full`}>
            {dummy.map((data, idx)=>{
                return <DashRow id={data.id} name={data.name} size={data.size} folder={data.folder} date={data.date} status={data.status} />
            })}
        </tbody>
    </table>
  )
}

export default DashTable
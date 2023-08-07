import React from 'react'
import DashRow from './DashRow'
import axios from "axios"
import useSWR from "swr"
import formatDate from "../../../../utils/FormatDate"
import DashTableSkeleton from './DashTableSkeleton'
const DashTable = () => {

    const fetcher = async (url) => axios.get(url)
    const {data:metadata, error, mutate} = useSWR(`${import.meta.env.VITE_BASEURL}metadata/nouser`, fetcher)

    // metadata && console.log("Metadata => ", metadata)
    
  return (
    <div className={`grid overflow-x-auto w-full py-10 `}>
        <table className='w-full table-auto'>
            <thead>
                <tr className={`bg-brandBlue3x text-brandBlue2x text-xl font-medium px-4`}>
                    <td className={`px-4 py-4`}>File name</td>
                    <td className={`px-4 py-4`}>File size</td>
                    <td className={`px-4 py-4`}>Folder</td>
                    <td className={`px-4 py-4`}>Date Created</td>
                    <td className={`px-4 py-4`}>Status</td>
                    <td className={`px-4 py-4`}></td>
                </tr>
            </thead>
            <tbody>
                {metadata && metadata.data.metas.length > 0 && metadata.data.metas.map((data, idx)=>{
                    return <DashRow index={idx} rowData={metadata.data.metas[idx]} id={data.id} name={data.fileName} size={data.size} folder={data.folder} date={formatDate(data.createdAt)} status={data.status} />
                })}
            </tbody>
        </table> 
        {!metadata && 
        <div className=''>
            <DashTableSkeleton skeleton={"skeleton"} />
            <DashTableSkeleton skeleton={"skeleton-white"} />
            <DashTableSkeleton skeleton={"skeleton"} />
            <DashTableSkeleton skeleton={"skeleton-white"} />
            <DashTableSkeleton skeleton={"skeleton"} />
        </div>} 
        {
            metadata && metadata.data.metas.length === 0 &&
            <div className={`text-center text-brandBlue1x px-4 py-8 flex flex-col gap-5`}>
                <h2 className={`font-semibold text-lg`}>No metadata extraction history</h2>
                <p>Extract your first file now</p>
            </div>
        }
    </div>

  )
}

export default DashTable
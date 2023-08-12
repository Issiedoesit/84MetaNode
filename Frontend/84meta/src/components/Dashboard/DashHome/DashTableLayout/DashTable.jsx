import React from 'react'
import DashRow from './DashRow'
import axios from "axios"
import useSWR from "swr"
import formatDate from "../../../../utils/FormatDate"
import DashTableSkeleton from './DashTableSkeleton'
import { NavLink } from 'react-router-dom'
const DashTable = ({data:metadata, error, mutate, emptyHeader, emptyText, submitting, setSubmitting, openAlert, setOpenAlert, alertValues, setAlertValues}) => {


    // metadata && console.log("Metadata => ", metadata)
    
  return (
    <div className={`grid overflow-x-auto w-full pt-10 pb-40 h-full `}>
        {
            metadata && metadata.data.metas.length === 0 ?
            <div className={`text-center text-brandBlue1x px-4 py-8 flex flex-col gap-5`}>
                <h2 className={`font-semibold text-lg`}>{emptyHeader || "No metadata extraction history"}</h2>
                <NavLink to={'/dashboard'}>{emptyText || "Extract your first file now"}</NavLink>
            </div>
            :
            <>
                <table className='w-full table-auto'>
                    <thead>
                        <tr className={`bg-brandBlue3x text-brandBlue2x text-xl font-medium px-4`}>
                            <td className={`px-4 py-4`}>File name</td>
                            <td className={`px-4 py-4`}>File size</td>
                            <td className={`px-4 py-4`}>Folder</td>
                            <td className={`px-4 py-4`}>Date Created</td>
                            <td className={`px-4 py-4`}>Status</td>
                            <td className={`px-4 py-4`}></td>
                            <td className={`px-4 py-4`}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {metadata && metadata.data.metas.length > 0 && metadata.data.metas.map((data, idx)=>{
                            return <DashRow key={idx} index={idx} mutate={mutate} rowData={metadata.data.metas[idx]} id={data._id} name={data.originalName} size={data.size} mime={data.primaryType} date={formatDate(data.metadataCreatedAt)} status={data.status} submitting={submitting} setSubmitting={setSubmitting} openAlert={openAlert} setOpenAlert={setOpenAlert} alertValues={alertValues} setAlertValues={setAlertValues} />
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
            </>
        }
    </div>

  )
}

export default DashTable
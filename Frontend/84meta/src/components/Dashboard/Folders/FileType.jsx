import React, { useState } from 'react'
import {useLocation} from "react-router-dom"
import DashTemplate from '../Widgets/Wraps/DashTemplate';
import useSWR from "swr"
import axios from "axios"
import useUser from '../../../utils/useUser';
import DashTable from '../DashHome/DashTableLayout/DashTable';
import Alert from '../../Widgets/Alerts/Alert';

const FileType = () => {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const [submitting, setSubmitting] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    // Get the value of the 'type' parameter
    const type = searchParams.get('type');

    const {token, userData, user} = useUser()

    const fetcher = async (url) => axios.get(url, {headers:{Authorization: `Bearer ${token}`}})

    const {data, error, mutate} = useSWR(`${import.meta.env.VITE_BASEURL}metadata/files/${type}/${user.length > 0 && userData[0]?.id}`, fetcher)
    
    const typeName = (type.toLowerCase() == 'application' ? "document" : type)

  return (
    <DashTemplate>
         <div className={`pb-4 border-b border-b-brandBlue1x`}>
            <h1 className={`text-2xl font-semibold text-brandBlue3x capitalize`}>{typeName} Files</h1>
        </div>
        <div className="grid w-full">
            <DashTable data={data} emptyHeader={`No ${typeName} files`} emptyText={`Extract your first ${typeName} file now`} error={error} mutate={mutate} submitting={submitting} setSubmitting={setSubmitting} openAlert={openAlert} setOpenAlert={setOpenAlert} alertValues={alertValues} setAlertValues={setAlertValues} />
        </div>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
    </DashTemplate>
  )
}

export default FileType
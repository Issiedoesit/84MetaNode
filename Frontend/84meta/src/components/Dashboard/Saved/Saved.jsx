import axios from 'axios'
import React, { useState } from 'react'
import useSWR from "swr"
import useUser from '../../../utils/useUser'
import {} from "react-spinners"
import DashTemplate from "../Widgets/Wraps/DashTemplate"
import DashTable from '../DashHome/DashTableLayout/DashTable'
import Alert from '../../Widgets/Alerts/Alert'

const Saved = () => {
    const {token, userData, user} = useUser()

    const fetcher = async (url) => axios.get(url, {headers:{Authorization: `Bearer ${token}`}})

    const {data, error, mutate} = useSWR(`${import.meta.env.VITE_BASEURL}metadata/saved/${user.length > 0 && userData[0]?.id}`, fetcher)
    

    const [submitting, setSubmitting] = useState(false)
  
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    // console.log(data && data)

  return (
    <DashTemplate>
        <div className={`pb-4 border-b border-b-brandBlue1x`}>
            <h1 className={`text-2xl font-semibold text-brandBlue3x`}>Saved Files</h1>
        </div>
        <div className="grid w-full">
            <DashTable data={data} emptyHeader={"No saved files"} emptyText={"Save your first file now"} error={error} mutate={mutate} submitting={submitting} setSubmitting={setSubmitting} openAlert={openAlert} setOpenAlert={setOpenAlert} alertValues={alertValues} setAlertValues={setAlertValues} />
        </div>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </DashTemplate>
  )
}

export default Saved
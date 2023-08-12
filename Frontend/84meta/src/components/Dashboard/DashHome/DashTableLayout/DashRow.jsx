import React from 'react'
import { useState } from 'react'
import useComponentVisible from '../../../../utils/hooks/useHideOnClickOutside'
import CsvDownloader from 'react-csv-downloader';
import slugify from "react-slugify"
import useFlat from '../../../../utils/hooks/useFlat';
import FormatSize from '../../../../utils/FormatSize';
import CopyButtonWithText from "../../../Widgets/Buttons/CopyButtonWithText"
import axios from "axios"
import useUser from '../../../../utils/useUser';
import { Link } from 'react-router-dom';
import {BsBalloonHeart, BsBalloonHeartFill} from 'react-icons/bs'
import FormatFileType from '../../../../utils/FormatFileType';

const DashRow = ({index, id, name, size, mime, date, status, rowData, mutate, submitting, setSubmitting, openAlert, setOpenAlert, alertValues, setAlertValues}) => {

    const [showMenu, setShowMenu] = useState(false)
    const [saving, setSaving] = useState(false)

    useComponentVisible(`#showMenu${id}`, `#menu${id}`, ()=>setShowMenu(false))
    const {flat} =  useFlat()
    const {token} = useUser()


    const columns = [{
        id: 'first',
        displayName: 'First column'
      }, {
        id: 'second',
        displayName: 'Second column'
      }];

    const data = [
      flat(rowData, {})
    ]

    // index == 0 && console.log(data)

  

  const downloadFile = (e) => {
    e.preventDefault()
    
    //     setSubmitting(true)
    // setOpenAlert(false)

    try {
        axios.get(`${import.meta.env.VITE_BASEURL}metadata/download/${id}`, {headers:{Authorization: `Bearer ${token}`}})
        .then((res)=>{

            console.log("download response =>", res);
            setAlertValues({...alertValues, message:res.data.message, type:res.data.status.toString().charAt(0) == 2 ? 'auth' : 'danger' })
            // setOpenAlert(true)
            // setSubmitting(false)
            // console.log(res.data.metadata)
            // setMetadata(res.data.metadata)
            // mutate()
            // setFileInput()
        })
        .catch((err)=>{
            // setSubmitting(false)
            console.error('axios error => ', err);
        })
    } catch (error) {
        // setSubmitting(false)
        console.error('try catch error => ', error);
    }
  }

  const replace = (url) => {
    return url.replaceAll('\\', "/")
  }

  const saveMetadata = (id) => {
    setSaving(true)
    setOpenAlert(false)

    const savedStatus = status == "saved" ? "not saved" : "saved"

    // console.log(savedStatus)

    try {
      axios.put(`${import.meta.env.VITE_BASEURL}metadata/save/${id}`, {status:savedStatus}, {headers:{Authorization: `Bearer ${token}`}})
      .then((res)=>{

          // console.log("save response =>", res);
          setAlertValues({...alertValues, message:res.data.message, type:res.data.status.toString().charAt(0) == 2 ? 'auth' : 'danger' })
          setOpenAlert(true)
          setSaving(false)
          mutate()
      })
      .catch((err)=>{
          setSaving(false)
          console.error('axios error => ', err);
      })
    } catch (error) {
        setSaving(false)
        console.error('try catch error => ', error);
    }
  }

  return (
    <tr id={id} className={`odd:bg-white even:bg-brandBlue2x py-4`}>
        <td className={`px-4 py-4 whitespace-nowrap`}>{name}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{FormatSize(size)}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{FormatFileType(mime)} folder</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{date}</td>
        <td className={`px-4 pt-4 whitespace-nowrap flex items-center justify-center`}>
          {status == 'saved' && <p className={`bg-green-400 rounded-sm text-white capitalize text-sm px-2 w-fit py-1`}>{status}</p>}
          {status == 'not saved' && <p className={`bg-yellow-400 rounded-sm text-white capitalize text-sm px-2 w-fit py-1`}>{status}</p>}
          {status == 'trashed' && <p className={`bg-red-400 rounded-sm text-white capitalize text-sm px-2 w-fit py-1`}>{status}</p>}
        </td>
        <td className={`px-4 py-4 whitespace-nowrap relative`}>
          <button disabled={saving} onClick={()=>saveMetadata(id)} className="relative">
            <BsBalloonHeartFill color={saving ? "#767676" : '#FF0000'} className={`absolute ${status == 'not saved' ? "invisible" : ""} transition-all duration-300 ease-in-out`} />
            <BsBalloonHeart color={saving ? "#767676" : '#FF0000'} className={`${status == 'saved' ? "invisible" : ""} transition-all duration-300 ease-in-out`} />
          </button>
        </td>
        <td className={`px-4 py-4 relative whitespace-nowrap text-3xl text-brandBlue1x`}>
            <button onClick={()=>setShowMenu(prevShowMenu => !prevShowMenu)} id={`#showMenu${id}`} type={`button`} className={``}>
                ...
            </button>
            <div id={`#menu${id}`} className={`absolute text-left text-sm z-30 ${showMenu ? "visible opacity-100" : "invisible opacity-0 h-0 overflow-hidden py-2"} transition-all duration-500 ease-in-out shadow-lg flex flex-col gap-4 rounded-10 ${index == 0 ? "top-80%" : "bottom-50%"} right-0 bg-brandGray5x px-4`}>
                <button className={`text-left`} type='button' onClick={()=>alert(`Share ${id}`)}>Share</button>
                <CopyButtonWithText text={JSON.stringify(data)} />
                <button className={`text-left`}  type='button'>Export</button>
                <CsvDownloader title={`${slugify(rowData.originalName)}.csv`} text="Download CSV" datas={data} filename={slugify(rowData.originalName)}         
                extension=".csv"
                separator=";"
                wrapColumnChar="'" 
                // columns={columns}
                className={`text-left`} 
                suffix
                meta
                />
                {/* <button onClick={downloadFile} className={`text-left`}  type='button'>Download File</button> */}
            </div>
        </td>
    </tr>
  )
}

export default DashRow
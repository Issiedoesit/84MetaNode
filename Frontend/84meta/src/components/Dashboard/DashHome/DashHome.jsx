import React, {useState, useCallback} from 'react'
import DashTemplate from '../Widgets/Wraps/DashTemplate'
import {useDropzone} from 'react-dropzone'
import {HiOutlineUpload} from "react-icons/hi"
import DashTable from './DashTableLayout/DashTable'
import Alert from '../../Widgets/Alerts/Alert'
import axios from "axios"
import useSWR from 'swr'
import useFlat from '../../../utils/hooks/useFlat'
import useUser from '../../../utils/useUser'
import { PulseLoader } from 'react-spinners'

const DashHome = () => {

  const [fileInput, setFileInput] = useState(null)

  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  const {token, userData, user} = useUser()
  
  const [metadata, setMetadata] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles[0])
    setFileInput(acceptedFiles[0])
  }, [])

  const fetcher = async (url) => axios.get(url)
  const {data, error, mutate} = useSWR(`${import.meta.env.VITE_BASEURL}metadata/${user.length > 0 && userData[0]?.id}`, fetcher)

  const getMetadata = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", fileInput)
    formData.append("userID", user.length > 0 && userData[0]?.id)

    // console.log(fileInput);
    
        setUploading(true)
    setOpenAlert(false)

    try {
        axios.post(`${import.meta.env.VITE_BASEURL}metadata/extract`, formData, {headers:{Authorization: `Bearer ${token}`}})
        .then((res)=>{

            console.log("metadata response =>", res);
            setAlertValues({...alertValues, message:res.data.message, type:res.data.status.toString().charAt(0) == 2 ? 'auth' : 'danger' })
            setOpenAlert(true)
            setUploading(false)
            console.log(res.data.metadata)
            setMetadata(res.data.metadata)
            mutate()
            setFileInput()
        })
        .catch((err)=>{
            setUploading(false)
            console.error('axios error => ', err);
        })
    } catch (error) {
      setUploading(false)
        console.error('try catch error => ', error);
    }
  }



  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

const {flat} =  useFlat()

  return (
    <DashTemplate>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 z-10 text-brandGray3x w-full overflow-x-hidden`}>
            <form method="post" encType="multipart/form-data" className={`max-h-80 w-full border-dashed border border-brandBlue1x  min-h-[320px] rounded-2xl flex flex-col items-center justify-center cursor-pointer`}>
              <div {...getRootProps({
                className: `w-full h-full p-4 rounded-2xl`
              })}>
                <div className={`flex flex-col py-4 px-4 items-center border-b-2 border-b-brandBlue2x`}>
                  <div className={`bg-brandBlue2x px-4 py-4 rounded-full aspect-square w-fit flex items-center justify-center`}>
                    <HiOutlineUpload color={`#064ACB`} size={"40px"} />
                  </div>
                  <p className={`py-2`}>Click the upload icon to add a file</p>
                </div>
                <div className={`flex flex-col items-center px-4  gap-6 pt-4`}>
                  <p className={`text-xl font-extrabold`}>OR</p>
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag and drop a file</p>
                  }
                  <p className={`text-sm font-light italic text-center`}>only jpg, png, csv, pdf, json files are supported</p>
                </div>
                <input {...getInputProps({
                  name:"uploaded_file",
                  id:"uploaded_file",
                  type:"file"
                })} />
              </div>
            </form>
            <div className={`w-full relative max-h-80 pb-8 border border-brandBlue1x h-full overflow-auto min-h-[320px] rounded-2xl`}>
                  <div className={`p-4 sticky top-0 left-0 bg-white`}>
                    <h2>Extracted Metadata</h2>
                  </div>
                  <div className={`p-4 w-full h-full`}>
                      <table className={`w-full table-auto`}>
                        <thead>
                          <tr className={`font-bold`}>
                            <td>KEY</td>
                            <td>VALUE</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            metadata && Object.keys(metadata).length > 0 &&  Object.entries(flat(metadata, {})).map(([k,v]) =>{
                              return <tr className={`odd:bg-white even:bg-brandBlue2x`}>
                                <td>{k}</td>
                                <td>{v}</td>
                              </tr>
                            })
                          }
                        </tbody>
                      </table>
                  </div>
            </div>
        </div>

        {/* show input */}
        {fileInput && <div className=" border border-brandBlue1x p-4 rounded-2xl flex flex-row gap-4 justify-center w-full">
          <div className={`w-full`}>
            {fileInput.name}
          </div>
          {uploading 
          ?
          <PulseLoader size={'10px'} color={'#043187'} />
          :
          <div className={`flex flex-row gap-4`}>
            <button type="button" onClick={getMetadata} className={`bg-brandBlue1x text-white px-3 py-1 text-sm rounded-lg`}>Extract</button>
            <button type="button" onClick={()=>setFileInput(null)} className={`bg-red-500 text-white px-3 py-1 text-sm rounded-lg`}>Cancel</button>
          </div>
          }
        </div>
        }

        <div className="grid w-full">
        <DashTable data={data} error={error} mutate={mutate} submitting={submitting} setSubmitting={setSubmitting} openAlert={openAlert} setOpenAlert={setOpenAlert} alertValues={alertValues} setAlertValues={setAlertValues} />
        </div>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </DashTemplate>
  )
}

export default DashHome
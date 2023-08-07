import React, {useState, useCallback} from 'react'
import DashTemplate from '../Widgets/Wraps/DashTemplate'
import {useDropzone} from 'react-dropzone'
import {HiOutlineUpload} from "react-icons/hi"
import DashTable from './DashTableLayout/DashTable'

const DashHome = () => {

  const [fileInput, setFileInput] = useState(null)
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setFileInput(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <DashTemplate>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 py-6 z-10 text-brandGray3x`}>
            <div className={`w-full border-dashed border border-brandBlue1x  min-h-[320px] rounded-2xl flex flex-col items-center justify-center cursor-pointer`}>
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
                  <p className={`text-sm font-light italic`}>only jpg, png, csv, pdf, json files are supported</p>
                </div>
                <input {...getInputProps()} />
              </div>
              <div className="text-center bg-brandBlue2x w-full rounded-b-2xl">
                {fileInput && fileInput[0].name}
              </div>
            </div>
            <div className={`w-full relative border border-brandBlue1x h-full overflow-auto min-h-[320px] rounded-2xl`}>
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
                          <tr className={`odd:bg-white even:bg-brandBlue2x`}>
                            <td>Isioma</td>
                            <td>Ekwemuka</td>
                          </tr>
                          <tr className={`odd:bg-white even:bg-brandBlue2x`}>
                            <td>Isioma</td>
                            <td>Ekwemuka</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
            </div>
        </div>

        <div className={`grid overflow-x-auto w-full py-10 bg-red-500`}>
          <DashTable />
        </div>
    </DashTemplate>
  )
}

export default DashHome
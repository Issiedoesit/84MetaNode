import React from 'react'

const FormatFileType = (mime) => {
    let folder = ""
    if (mime == ('application')){
        folder = "Document"
    }else if (mime == ('image')){
        folder = "Image"
    }else if (mime == ('audio')){
        folder = "Audio"
    }else if (mime == ('video')){
        folder = "Video"
    }else if (mime == ('text')){
        folder = "Text"
    }else{
        folder = "Others"
    }

    return folder
}

export default FormatFileType
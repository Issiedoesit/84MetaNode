import React from 'react'
import MetadataExtractor from "metadata-extractor";

const Home = () => {

    const extract = async () => {
        const extracted = await MetadataExtractor("https://www.youtube.com/watch?v=QNYB7Tsb880")
        console.log("extracted => ", extracted);

    }

    extract()

  return (
    <div>Home</div>
  )
}

export default Home
import { useState } from 'react'
import type { NextPage } from 'next'
import MetaCluster, {WorkMeta} from '../src/models/meta-cluster'

import ConfigureForm from '../components/ConfigureForm/ConfigureForm'
import OutputSection from '../components/OutputSection/OutputSection'


const Home: NextPage = () => {
  const [works, setWorks] = useState<WorkMeta[][] | null>(null);
  const [status, setStatus] = useState<string | null>('No Content');

  const getFormData = (file: File, wordsMinPercent: number, objectsMinPercent: number, useThumbs: boolean) => {
    setStatus('Loadign...');

    const reader = new FileReader();
    const options = {
      minWordsEquality: wordsMinPercent,
      minObjectsEquality: objectsMinPercent,
      considerThumbnails: useThumbs
    }

    reader.onload = (event) => {
      const str = event.target!.result as string;
      const json = JSON.parse(str);
      const clusters = new MetaCluster(json, options);
      console.log(clusters.data.length)
      setWorks(clusters.data);
      setStatus(null);
    }

    reader.readAsText(file);
  }

  return <>
      <ConfigureForm getFormData={getFormData}/>
      <OutputSection clusters={works} status={status}/>
    </>
}

export default Home

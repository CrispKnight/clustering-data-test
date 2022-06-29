import type { NextPage } from 'next'

import ConfigureForm from '../components/ConfigureForm/ConfigureForm'
import OutputSection from '../components/OutputSection/OutputSection'

const Home: NextPage = () => {
  return <>
      <ConfigureForm />
      <OutputSection />
    </>
}

export default Home

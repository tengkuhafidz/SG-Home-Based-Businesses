import React, { useState } from 'react'
import HBBCard from './hbb-card'
import useModal from 'use-react-modal'
import HBBModal from './hbb-modal'
import { HbbData } from '../utils/models'

interface Props {
  allHbbData: HbbData[]
}

const Main: React.FC<Props> = ({ allHbbData }) => {
  const [selectedHbbData, setSelectedHbbData] = useState(allHbbData[0])

  const useModalOptions = {
    background: 'rgba(0, 0, 0, 0.8)',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onOpen: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
  }

  const { isOpen, openModal, Modal } = useModal(useModalOptions)

  const handleOpenModal = (e, hbbData: HbbData) => {
    setSelectedHbbData(hbbData)
    openModal(e)
  }

  const renderHBBCards = () => {
    return allHbbData.map((hbbData) => <HBBCard hbbData={hbbData} key={hbbData.id} handleOpenModal={handleOpenModal} />)
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto py-8">
        <p className="text-lg mb-1">I am looking for</p>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="e.g. Halal Lasagna Delivery"
        />
      </div>
      <div className="py-8 grid grid-cols-3 gap-12">{renderHBBCards()}</div>
      <HBBModal Modal={Modal} hbbData={selectedHbbData} isOpen={isOpen} />
    </div>
  )
}

export default Main

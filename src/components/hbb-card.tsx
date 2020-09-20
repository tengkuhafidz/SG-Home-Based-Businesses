import React from 'react'
import { HbbData } from '../utils/models'

interface Props {
  handleOpenModal: (e, hbbData: HbbData) => void
  hbbData: HbbData
}

const HBBCard: React.FC<Props> = ({ handleOpenModal, hbbData }) => {
  const { name, description, image } = hbbData
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300">
      <img className="w-full" src={image} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-3">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-2 pb-8">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white py-3 px-4 rounded font-light text-lg"
          onClick={(e) => handleOpenModal(e, hbbData)}
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default HBBCard

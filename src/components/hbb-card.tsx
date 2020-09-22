import React from 'react'
import { HbbData } from '../utils/models'

interface Props {
  handleOpenModal: (e, hbbData: HbbData) => void
  hbbData: HbbData
}

const HBBCard: React.FC<Props> = ({ handleOpenModal, hbbData }) => {
  const { name, description, image, dietaryTypes, collectionMethods, tags } = hbbData
  const allTags = [...(dietaryTypes || []), ...(collectionMethods || []), ...(tags || [])]

  const renderTags = () =>
    allTags.map((tag) => (
      <span className="text-sm font-semibold text-gray-700 mr-2 mb-2" key={tag}>
        #{tag}
      </span>
    ))

  const renderTagsSection = () => {
    if (allTags.length < 1) {
      return <></>
    }
    return <div className="pt-4 pb-2">{renderTags()}</div>
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-300">
      <img className="w-full" src={image} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-3">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        {renderTagsSection()}
      </div>
      <div className="px-6 pt-2 pb-8">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded font-light"
          onClick={(e) => handleOpenModal(e, hbbData)}
        >
          Show More
        </button>
      </div>
    </div>
  )
}

export default HBBCard

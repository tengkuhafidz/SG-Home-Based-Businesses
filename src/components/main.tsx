import React, { useState } from 'react'
import Fuse from 'fuse.js'
import HBBCard from './hbb-card'
import useModal from 'use-react-modal'
import HBBModal from './hbb-modal'
import { HbbData } from '../utils/models'

interface Props {
  allHbbData: HbbData[]
}

const Main: React.FC<Props> = ({ allHbbData }) => {
  /**
   * MODAL LOGIC
   */
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

  /**
   * SEARCH LOGIC
   */

  const [searchTerm, setSearchTerm] = useState('')

  const getFuseSearchResults = (allHbbData: HbbData[], searchTerm: string): HbbData[] => {
    const options = {
      isCaseSensitive: false,
      includeScore: false,
      shouldSort: true,
      includeMatches: false,
      findAllMatches: false,
      minMatchCharLength: 1,
      location: 0,
      threshold: 0.1,
      distance: 100,
      useExtendedSearch: false,
      ignoreLocation: false,
      ignoreFieldNorm: false,
      keys: ['name', 'items'],
    }

    const fuse: Fuse<any> = new Fuse(allHbbData, options)
    const fuseSearchResult = fuse.search(searchTerm)
    return fuseSearchResult.map((result) => result.item)
  }

  const hbbSearchResults = searchTerm ? getFuseSearchResults(allHbbData, searchTerm) : allHbbData

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
  }

  /**
   * RENDER TAGS FILTER
   */

  const [selectedTags, setSelectedTags] = useState([])

  const handleSelectTag = (tag: string) => {
    let tags
    if (selectedTags.includes(tag)) {
      // remove tag from selected tags array
      tags = [...selectedTags]
      const tagIndex = tags.indexOf(tag)
      tags.splice(tagIndex, 1)
    } else {
      tags = [...selectedTags, tag]
    }
    setSelectedTags(tags)
  }

  const getFilteredResults = () => {
    return hbbSearchResults.filter((hbbData) => {
      const { dietaryTypes, collectionMethods, tags } = hbbData
      const hbbTags = [...(dietaryTypes || []), ...(collectionMethods || []), ...(tags || [])]
      return selectedTags.some((tag) => hbbTags.includes(tag))
    })
  }

  const hbbFilteredResults = selectedTags.length > 0 ? getFilteredResults() : hbbSearchResults

  const getDistinctTags = () => {
    let allTags = []
    hbbFilteredResults.forEach((hbbData) => {
      const { dietaryTypes, collectionMethods, tags } = hbbData
      allTags = [...allTags, ...(dietaryTypes || []), ...(collectionMethods || []), ...(tags || [])]
    })
    if (allTags.length < 1) {
      return []
    }
    const distinctTags = [...new Set(allTags)]
    return distinctTags
  }

  const renderTags = () => {
    return getDistinctTags().map((tag) => (
      <li
        className={`p-2 mr-2 mt-2 rounded inline-block hover:shadow-outline cursor-pointer ${
          selectedTags.includes(tag) ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
        } `}
        key={tag}
        onClick={() => handleSelectTag(tag)}
      >
        {tag}
      </li>
    ))
  }

  const renderTagsSection = () => {
    if (getDistinctTags().length < 1) {
      return <></>
    }
    return (
      <div className="mt-2">
        <ul>{renderTags()}</ul>
      </div>
    )
  }

  const renderHBBCards = () => {
    return hbbFilteredResults.map((hbbData) => (
      <HBBCard hbbData={hbbData} key={hbbData.id} handleOpenModal={handleOpenModal} />
    ))
  }

  return (
    <div className="px-4">
      <div className="max-w-2xl mx-auto py-8">
        <p className="text-lg mb-1">I am looking for</p>
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="e.g. Cheese Cake"
          onChange={(e) => handleSearch(e)}
        />
        {renderTagsSection()}
      </div>
      <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-12">{renderHBBCards()}</div>
      <HBBModal Modal={Modal} hbbData={selectedHbbData} isOpen={isOpen} />
    </div>
  )
}

export default Main

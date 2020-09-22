import React from 'react'
import { HbbData } from '../utils/models'
import '@fortawesome/fontawesome-free/css/all.css'

interface Props {
  Modal: (props) => JSX.Element
  hbbData: HbbData
  isOpen: boolean
}
const HBBModal: React.FC<Props> = ({ Modal, hbbData, isOpen }) => {
  const { name, description, image, items, dietaryTypes, collectionMethods, tags, socials, contact } = hbbData

  if (!isOpen) {
    return <></>
  }

  const allTags = [...(dietaryTypes || []), ...(collectionMethods || []), ...(tags || [])]

  const renderTags = () =>
    allTags.map((tag) => (
      <span
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
        key={tag}
      >
        #{tag}
      </span>
    ))

  const renderTagsSection = () => {
    if (allTags.length < 1) {
      return <></>
    }
    return <div className="pt-4 pb-2">{renderTags()}</div>
  }

  const renderMenuItems = (menuItems: string[]) => {
    if (!!menuItems && menuItems.length > 0) {
      return menuItems.map((item) => <li key={item}>{item}</li>)
    }
    return <></>
  }
  const renderMenuSection = () => {
    if (!!items && items.length > 0) {
      return (
        <div className="mt-2">
          <h3 className="font-semibold">Menu</h3>
          <ul>{renderMenuItems(items)}</ul>
        </div>
      )
    }
    return <></>
  }

  const renderSocialsList = () => {
    return socials.map((social) => (
      <li className="inline-block" key={social.name}>
        <a href={social.url} className="underline text-gray-600">
          <i className={`${social.faIcon} text-2xl mt-2 mr-4 hover:text-orange-600`}></i>
        </a>
      </li>
    ))
  }

  const renderSocialsSection = () => {
    if (!!socials && socials.length > 0) {
      return (
        <div className="mt-2">
          <h3 className="font-semibold">Links</h3>
          <ul>{renderSocialsList()}</ul>
        </div>
      )
    }
    return <></>
  }

  return (
    <Modal>
      <div className={`shadow-xl bg-white min-h-64 b-8  rounded-lg w-screen md:max-w-screen-md`}>
        <img src={image} className="w-full object-cover" />
        <div className="p-8">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p>{description}</p>
          {renderTagsSection()}
          {renderMenuSection()}
          {renderSocialsSection()}
          <div className="mt-12 mb-8">
            <a
              href={contact}
              target="_blank"
              rel="noreferrer"
              className="bg-orange-500 hover:bg-orange-700 text-white py-3 px-4 rounded font-light text-lg"
            >
              Contact Shop
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default HBBModal

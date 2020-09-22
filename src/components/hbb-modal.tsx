import React from 'react'
import { HbbData } from '../utils/models'

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

  const renderList = (listItems: string[]) => {
    if (!!listItems && listItems.length > 0) {
      return listItems.map((listItem) => <li key={listItem}>{listItem}</li>)
    }
    return <></>
  }

  const renderMenuSection = () => {
    if (!!items && items.length > 0) {
      return (
        <div className="mt-2">
          <h3 className="font-semibold">Menu</h3>
          <ul>{renderList(items)}</ul>
        </div>
      )
    }
    return <></>
  }

  const renderOtherDetailsSection = () => {
    if (!!items && items.length > 0) {
      return (
        <div className="mt-2">
          <h3 className="font-semibold">Other Details</h3>
          <ul>
            {renderList(dietaryTypes)}
            {renderList(collectionMethods)}
            {renderList(tags)}
          </ul>
        </div>
      )
    }
    return <></>
  }

  const renderSocialsList = () => {
    return socials.map((social) => (
      <li key={social.name}>
        <a href={social.url} className="underline text-gray-600">
          {social.url}
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
          {renderMenuSection()}
          {renderOtherDetailsSection()}
          {renderSocialsSection()}
          <div className="my-8">
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

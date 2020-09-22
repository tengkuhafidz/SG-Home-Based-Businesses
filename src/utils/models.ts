export interface HbbData {
  id: string
  name: string
  image: string
  description: string
  items: string[]
  dietaryTypes: string[]
  collectionMethods: string[]
  tags: string[]
  socials: Social[]
  contact: string
}

interface Social {
  name: string
  url: string
  faIcon: string
}

export interface HbbSheetsData {
  id: string
  name: string
  description: string
  image: string
  items: string
  dietaryTypes: string
  collectionMethods: string
  tags: string
  instagram: string
  facebook: string
  twitter: string
  website: string
  contact: string
}

const generateArray = (itemsInString: string): string[] => {
  return itemsInString
    .trim()
    .split(',')
    .map((item) => item.trim())
}

const transformToArray = (items): string[] | null => {
  if (!!items) {
    return generateArray(items)
  }
  return null
}

const transformSocials = (
  instagramUrl: string,
  facebookUrl: string,
  twitterUrl: string,
  websiteUrl: string,
): Social[] => {
  const socials = []
  if (!!instagramUrl) {
    socials.push({
      name: 'instagram',
      url: instagramUrl,
      faIcon: 'fab fa-instagram-square',
    })
  }

  if (!!facebookUrl) {
    socials.push({
      name: 'facebook',
      url: facebookUrl,
      faIcon: 'fab fa-facebook-square',
    })
  }

  if (!!twitterUrl) {
    socials.push({
      name: 'twitter',
      url: twitterUrl,
      faIcon: 'fab fa-twitter-square',
    })
  }

  if (!!websiteUrl) {
    socials.push({
      name: 'website',
      url: websiteUrl,
      faIcon: 'fas fa-external-link-square-alt',
    })
  }

  return socials
}

export const transformHbbData = (allHbbSheetsData: HbbSheetsData[]): HbbData[] => {
  return allHbbSheetsData.map((singleHbbSheetsData) => {
    const {
      id,
      name,
      description,
      image,
      items,
      dietaryTypes,
      collectionMethods,
      tags,
      instagram,
      facebook,
      twitter,
      website,
      contact,
    } = singleHbbSheetsData

    return {
      id,
      name,
      description,
      image,
      items: transformToArray(items),
      dietaryTypes: transformToArray(dietaryTypes),
      collectionMethods: transformToArray(collectionMethods),
      tags: transformToArray(tags),
      socials: transformSocials(instagram, facebook, twitter, website),
      contact: contact,
    }
  })
}

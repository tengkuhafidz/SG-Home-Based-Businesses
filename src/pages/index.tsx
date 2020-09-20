import { graphql } from 'gatsby'
import React from 'react'
import BackToTop from '../components/back-to-top'
import Footer from '../components/footer'
import Main from '../components/main'
import SEO from '../components/seo'
import { transformHbbData, HbbData } from '../utils/models'

const Home = ({ data }) => {
  const allHbbData: HbbData[] = transformHbbData(data.allMasterSheetsData.nodes)

  const renderBackToTop = () => {
    if (typeof window !== 'undefined') {
      return <BackToTop />
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <SEO />
      <div className="max-w-6xl mx-auto pt-12 pb-4 text-gray-800">
        <h1 className="text-4xl font-bold text-center">SG Home Based Business</h1>
        <Main allHbbData={allHbbData} />
        <Footer />
      </div>
      {renderBackToTop()}
    </div>
  )
}

export default Home

export const hbbData = graphql`
  query MyQuery {
    allMasterSheetsData {
      nodes {
        id
        name
        description
        image
        items
        dietaryTypes
        collectionMethods
        tags
        facebook
        instagram
        twitter
        website
        contact
      }
    }
  }
`

import React from 'react'
import { basePath } from '../api-hooks'
import { StockAnalysis, StockAnalyzerFactoryControllerApi } from '../client'
import { UnsecuredApp } from '../components/App'
import { Browse } from '../components/Pages/Browse/Browse'

interface Props {
    stockAnalyses: StockAnalysis[]
}

function BrowsePage(props: Props) {


    const { stockAnalyses } = props

    return (
        <UnsecuredApp>
            <Browse stockAnalyses={stockAnalyses} />
        </UnsecuredApp>
    )
}

BrowsePage.getInitialProps = async () => {
    const stockAnalyzer = new StockAnalyzerFactoryControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getAnalyses()
    return { stockAnalyses: data }
}

export default BrowsePage

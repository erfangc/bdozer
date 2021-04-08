import React from 'react'
import { basePath } from '../../../api-hooks'
import { StockAnalysis, StockAnalyzerFactoryControllerApi } from '../../../client'
import { UnsecuredApp } from '../../../components/App'
import { Narrative } from '../../../components/Pages/Narrative/Narrative'

interface Props {
    stockAnalysis: StockAnalysis
}

export default function NarrativePage(props: Props) {
    return (
        <UnsecuredApp>
            <Narrative result={props.stockAnalysis} />
        </UnsecuredApp>
    )
}

NarrativePage.getInitialProps = async (ctx) => {
    const stockAnalyzer = new StockAnalyzerFactoryControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getAnalysis(ctx.query.cik)
    return { stockAnalysis: data }
}

import React from "react";
import {basePath} from "../../../api-hooks";
import {PublishedStockAnalysisControllerApi, StockAnalysis2} from "../../../client";
import {UnsecuredApp} from "../../../components/App";
import {Narrative2} from "../../../components/Pages/PublishedStockAnalysesNarrative2/Narrative2";

interface Props {
    stockAnalysis: StockAnalysis2
}

function NarativePage(props: Props) {
    return (
        <UnsecuredApp>
            <Narrative2 stockAnalysis={props.stockAnalysis} />
        </UnsecuredApp>
    )
}

NarativePage.getInitialProps = async (ctx) => {
    const stockAnalyzer = new PublishedStockAnalysisControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getPublishedStockAnalysis(ctx.query.id)
    return { stockAnalysis: data }
}

export default NarativePage
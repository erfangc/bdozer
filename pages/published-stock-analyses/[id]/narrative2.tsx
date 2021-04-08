import React from "react";
import { basePath } from "../../../api-hooks";
import { StockAnalysis2, StockAnalysisPublicationControllerApi } from "../../../client";
import { UnsecuredApp } from "../../../components/App";
import { Narrative2 } from "../../../components/Pages/Narrative2/Narrative2";

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
    const stockAnalyzer = new StockAnalysisPublicationControllerApi(null, basePath);
    const { data } = await stockAnalyzer.getPublishedStockAnalysis(ctx.query.id)
    return { stockAnalysis: data }
}

export default NarativePage
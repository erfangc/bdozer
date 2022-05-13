import {ZacksDerivedAnalyticsTagsEnum} from "../client";

export function pillLabel(tag: ZacksDerivedAnalyticsTagsEnum): string {
    let ret: string = 'Unknown';
    switch (tag) {
        case ZacksDerivedAnalyticsTagsEnum.EarningsImproving:
            ret = 'Profits Growing';
            break;
        case ZacksDerivedAnalyticsTagsEnum.RevenueGrowing:
            ret = 'Sales Growing';
            break;
        case ZacksDerivedAnalyticsTagsEnum.PositiveEarnings:
            ret = 'Making Money';
            break;
        case ZacksDerivedAnalyticsTagsEnum.HighlyLevered:
            ret = 'Borrows a Lot';
            break;
        case ZacksDerivedAnalyticsTagsEnum.BelowBookValue:
            ret = 'Below Book Value';
            break;
        case ZacksDerivedAnalyticsTagsEnum.HighGrossMargin:
            ret = 'High Gross Margin';
            break;
        case ZacksDerivedAnalyticsTagsEnum.HighNetMargin:
            ret = 'High Net Margin'
            break;
        case ZacksDerivedAnalyticsTagsEnum.FundamentalsStable:
            ret = 'Stable';
            break;
        case ZacksDerivedAnalyticsTagsEnum.RecentlyCrashed:
            ret = 'Recently Crashed';
            break;
    }
    return ret;
}
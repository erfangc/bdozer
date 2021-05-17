import {CompanyKPIs, Item, ItemTypeEnum, KPIMetadata} from "../../client";

interface State {
    companyKPIs: CompanyKPIs
    editorOpen?: boolean
    currentParent?: Item
    currentSibling?: Item
    currentItem?: Item
}

export class StateManager {

    public state: State

    constructor(state: State) {
        this.state = state;
    }

    setState(state: State) {

    }

    attemptToAddSibling(self: Item, parent?: Item) {
        this.setState({
            ...this.state,
            currentSibling: self,
            currentParent: parent,
            editorOpen: true
        })
    }

    replaceItem(items: Item[], replaceWith: Item): Item[] {
        return items.map(it => {
            if (it.name === replaceWith.name) {
                return replaceWith;
            } else {
                return it;
            }
        })
    }

    completeAddSibling(newKpi: KPIMetadata, newItem: Item) {

        const {currentSibling, currentParent, companyKPIs} = this.state

        /*
        Update parent's children
         */
        let parentItem = currentParent;
        if (currentParent.type === ItemTypeEnum.ProductOfOtherItems) {
            parentItem = {
                ...currentParent,
                productOfOtherItems: currentParent.productOfOtherItems
            }
        } else if (currentParent.type === ItemTypeEnum.SumOfOtherItems) {

        }

        /*
        Update KPIs
         */
        const updatedCompanyKPIs: CompanyKPIs = {
            ...companyKPIs,
            kpis: [...companyKPIs.kpis, newKpi],
            items: [...this.replaceItem(companyKPIs.items, parentItem), newItem],
        }
        currentParent;
    }

    dismiss() {
        this.setState({
            ...this.state,
            editorOpen: false
        });
    }
}
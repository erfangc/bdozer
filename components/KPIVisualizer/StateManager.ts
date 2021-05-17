import {CompanyKPIs, Item, ItemTypeEnum, KPIMetadata} from "../../client";

export interface State {
    loading: boolean
    companyKPIs?: CompanyKPIs
    editorOpen: boolean
    currentParent?: Item
    currentLeftSibling?: Item
    currentItem?: Item
}

/**
 * [StateManager] manages the state of CompanyKPIs
 */
export class StateManager {

    public state: State;
    private callback: (newState: State) => void

    /**
     *
     * @param companyKPIs
     */
    constructor() {
        this.state = {
            companyKPIs: undefined,
            editorOpen: false,
            loading: false,
            currentLeftSibling: undefined,
            currentParent: undefined,
            currentItem: undefined,
        };
    }

    startLoading = () => {
        this.setState({...this.state, loading: true});
    }

    stopLoading = () => {
        this.setState({...this.state, loading: false});
    }

    private setState(newState: State) {
        this.state = newState;
        this.callback(newState);
    }

    setCompanyKPIs = (companyKPIs: CompanyKPIs) => {
        this.setState({...this.state, companyKPIs});
    }

    register = (callback: (newState: State) => void) => {
        this.callback = callback;
    }

    attemptToAddSibling = (self: Item, parent?: Item) => {
        this.setState({
            ...this.state,
            currentLeftSibling: self,
            currentParent: parent,
            editorOpen: true,
        });
    }

    private replaceItem(items: Item[], replaceWith: Item): Item[] {
        return items.map(it => {
            if (it.name === replaceWith.name) {
                return replaceWith;
            } else {
                return it;
            }
        });
    }

    private updateSumOfOtherItems(
        parentItem: Item,
        leftSibling: Item,
        itemToInsert: Item
    ): Item {
        const sumOfOtherItems = parentItem.sumOfOtherItems;
        const idx = sumOfOtherItems.components.findIndex(component => component.itemName === leftSibling.name)
        const itemNameToInsert = itemToInsert.name;
        const components = sumOfOtherItems.components.splice(idx, 0, {weight: 1, itemName: itemNameToInsert})
        return {
            ...parentItem,
            sumOfOtherItems: {...sumOfOtherItems, components,},
        };
    }

    private updateProductOfOtherItems(
        parentItem: Item,
        leftSibling: Item,
        itemToInsert: Item
    ): Item {
        const productOfOtherItems = parentItem.productOfOtherItems;
        const idx = productOfOtherItems.components.findIndex(component => component.itemName === leftSibling.name)
        const itemNameToInsert = itemToInsert.name;
        const components = productOfOtherItems.components.splice(idx, 0, {itemName: itemNameToInsert})
        return {
            ...parentItem,
            productOfOtherItems: {...productOfOtherItems, components,},
        };
    }

    completeAddSibling = (newKpi: KPIMetadata, newItem: Item) => {
        const {currentLeftSibling, currentParent, companyKPIs} = this.state;

        /*
        Update parent's children
         */
        let parentItem = currentParent;
        if (currentParent.type === ItemTypeEnum.ProductOfOtherItems) {
            parentItem = this.updateProductOfOtherItems(parentItem, currentLeftSibling, newItem)
        } else if (currentParent.type === ItemTypeEnum.SumOfOtherItems) {
            parentItem = this.updateSumOfOtherItems(parentItem, currentLeftSibling, newItem)
        }

        /*
        Update KPIs
         */
        const updatedCompanyKPIs: CompanyKPIs = {
            ...companyKPIs,
            kpis: [
                ...companyKPIs.kpis,
                newKpi,
            ],
            items: [
                ...this.replaceItem(companyKPIs.items, parentItem),
                newItem,
            ],
        };

        this.setState({
            ...this.state,
            companyKPIs: updatedCompanyKPIs,
            editorOpen: false,
        });
    }

    dismiss = () => {
        this.setState({
            ...this.state,
            editorOpen: false
        });
    }
}
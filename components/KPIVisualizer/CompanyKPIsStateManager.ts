import {CompanyKPIs, Item, ItemTypeEnum, KPIMetadata, ProductOfOtherItems, SumOfOtherItems} from "../../client";

export interface State {
    loading: boolean
    companyKPIs?: CompanyKPIs
    editorOpen: boolean
    currentParent?: Item
    currentLeftSibling?: Item
    currentItem?: Item
    currentKPI?: KPIMetadata
}

/**
 * [StateManager] manages the state of CompanyKPIs and it's mutation
 * in the UI
 *
 * This class offers methods to update the correct Item and KPIMetadata based on user actions
 *
 * For example:
 *  - Adding a child item requires we keep as temporary state the immediate sibling as well as the parent
 *  - Upon completion, we must mutate the correct parent
 *  - If an action is dismissed, state must be reset
 *
 * This class handles all of this and more so the display layer React components do not have to handle this business logic
 */
export class CompanyKPIsStateManager {

    public state: State;
    private callback: (newState: State) => void

    constructor() {
        this.state = {
            companyKPIs: undefined,
            editorOpen: false,
            loading: false,
            currentLeftSibling: undefined,
            currentParent: undefined,
            currentItem: undefined,
            currentKPI: undefined,
        };
    }

    handleItemEdit = (
        newKPI: KPIMetadata, newItem: Item,
        kpi?: KPIMetadata, item?: Item,
    ) => {
        const {currentLeftSibling, currentParent} = this.state;
        /*

        ---------------------------
        Determine what must be done
        ---------------------------

        1. Add new item as sibling
        2. Add the new item as first child
        3. Just mutate the item

        */
        if (currentLeftSibling) {
            // Case 1
            this.addSibling(newKPI, newItem);
        } else if (!currentLeftSibling && currentParent) {
            // Case 2
            this.addChild(newKPI, newItem);
        } else {
            // Case 3
            this.mutateItem(newKPI, newItem, kpi, item);
        }
    }

    /**
     * Renames any dependencies on item from oldItem -> newItem
     * @param item
     * @param oldItem
     * @param newItem
     */
    renameIfNeeded = (item: Item, oldItem: Item, newItem: Item): Item => {
        if (item.type === ItemTypeEnum.SumOfOtherItems) {
            return {
                ...item,
                sumOfOtherItems: {
                    ...item.sumOfOtherItems,
                    components: item.sumOfOtherItems.components.map(component => {
                        if (component.itemName === oldItem.name) {
                            return {...component, itemName: newItem.name};
                        } else {
                            return component;
                        }
                    })
                }
            };
        } else if (item.type === ItemTypeEnum.ProductOfOtherItems) {
            return {
                ...item,
                productOfOtherItems: {
                    ...item.productOfOtherItems,
                    components: item.productOfOtherItems.components.map(component => {
                        if (component.itemName === oldItem.name) {
                            return {...component, itemName: newItem.name};
                        } else {
                            return component;
                        }
                    })
                }
            };
        } else {
            return item;
        }
    }

    /**
     * Just mutate the item without performing any changes
     */
    mutateItem = (
        newKPI: KPIMetadata, newItem: Item,
        oldKPI?: KPIMetadata, oldItem?: Item,
    ) => {
        const {companyKPIs, companyKPIs: {items, kpis}} = this.state;
        const updatedItems = items.map(item => {
            if (item.name === oldItem.name) {
                return newItem;
            } else {
                return this.renameIfNeeded(item, oldItem, newItem)
            }
        });
        const updatedKPIs = kpis.map(kpi => {
            if (kpi.itemName == oldItem.name) {
                return newKPI;
            } else {
                return kpi;
            }
        });
        const updatedCompanyKPIs: CompanyKPIs = {
            ...companyKPIs,
            items: updatedItems,
            kpis: updatedKPIs,
        };
        this.setState({companyKPIs: updatedCompanyKPIs, editorOpen: false});
    }

    /**
     * Add the edited item as the 1st child of the current parent
     * this is needed when the parent item being edited does not already
     * have any children
     * @param newKPI
     * @param newItem
     */
    addChild = (newKPI: KPIMetadata, newItem: Item) => {
        const {currentParent, companyKPIs} = this.state;
        const sumOfOtherItems: SumOfOtherItems = {
            components: [{itemName: newItem.name, weight: 1}],
        };
        const productOfOtherItems: ProductOfOtherItems = {
            components: [{itemName: newItem.name}],
        };
        const updatedParent: Item = {
            ...currentParent,
            type: ItemTypeEnum.SumOfOtherItems,
            productOfOtherItems,
            sumOfOtherItems,
        };
        const updatedCompanyKPIs: CompanyKPIs = {
            ...companyKPIs,
            items: [
                ...companyKPIs.items.map(it => {
                    if (it.name === currentParent.name) {
                        return updatedParent;
                    } else {
                        return it;
                    }
                }),
                newItem,
            ],
            kpis: [...companyKPIs.kpis, newKPI]
        }

        this.setState({
            currentParent: undefined,
            editorOpen: false,
            companyKPIs: updatedCompanyKPIs,
        });
    }

    startLoading = () => {
        this.setState({loading: true});
    }

    stopLoading = () => {
        this.setState({loading: false});
    }

    setCompanyKPIs = (companyKPIs: CompanyKPIs) => {
        this.setState({companyKPIs});
    }

    register = (callback: (newState: State) => void) => {
        this.callback = callback;
    }

    deleteItem = (tgt: Item) => {
        /*
        Remove all references
         */
        const {companyKPIs, companyKPIs: {items, kpis}} = this.state
        const updatedItems = items
            .filter(it => it.name !== tgt.name)
            .map(from => this.removeChild(from, tgt))
        const updatedKpis = kpis.filter(kpi => kpi.itemName !== tgt.name);
        const updatedCompanyKPIs: CompanyKPIs = {
            ...companyKPIs,
            items: updatedItems,
            kpis: updatedKpis,
        };
        this.setState({companyKPIs: updatedCompanyKPIs});
    }

    attemptToAddChild = (parent?: Item) => {
        this.setState({
            currentParent: parent,
            editorOpen: true,
        });
    }

    attemptToAddSibling = (self: Item, parent?: Item) => {
        this.setState({
            currentLeftSibling: self,
            currentParent: parent,
            editorOpen: true,
        });
    }

    attemptToEdit = (item: Item, kpi: KPIMetadata) => {
        this.setState({
            currentItem: item,
            currentKPI: kpi,
            editorOpen: true,
        })
    }

    /**
     * This method removes the [child] Item parent the [parent] Item
     * if [child] is a dependency of [parent]. This dependency may take the form
     * of being a component
     *
     * As a corner case side-effect, this method is responsible for correctly updating
     * the [parent] Item into a type Custom item if all of it's dependents (children) are removed
     * as a result of this remove action
     *
     * @param parent
     * @param child
     * @private
     */
    private removeChild(parent: Item, child: Item): Item {
        if (parent.type === ItemTypeEnum.SumOfOtherItems) {
            const sumOfOtherItems = {
                ...parent.sumOfOtherItems,
                components: parent.sumOfOtherItems.components.filter(it => it.itemName !== child.name)
            };
            if (sumOfOtherItems.components.length === 0) {
                // update the parent to become a type = Custom Item
                return {
                    ...parent,
                    type: ItemTypeEnum.Custom,
                    formula: `${parent.historicalValue?.value ?? '0.0'}`,
                };
            } else {
                // simply return the parent with the child removed
                return {
                    ...parent,
                    sumOfOtherItems,
                };
            }
        } else if (parent.type === ItemTypeEnum.ProductOfOtherItems) {
            const productOfOtherItems = {
                ...parent.productOfOtherItems,
                components: parent.productOfOtherItems.components.filter(it => it.itemName !== child.name)
            };
            if (productOfOtherItems.components.length === 0) {
                // update the parent to become a type = Custom Item
                return {
                    ...parent,
                    type: ItemTypeEnum.Custom,
                    formula: `${parent.historicalValue?.value ?? '0.0'}`,
                };
            } else {
                // simply return parent with child removed
                return {
                    ...parent,
                    productOfOtherItems
                };
            }
        } else {
            return parent;
        }
    }

    addSibling = (newKpi: KPIMetadata, newItem: Item) => {
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
            companyKPIs: updatedCompanyKPIs,
            editorOpen: false,
            currentLeftSibling: undefined,
            currentParent: undefined,
        });
    }

    dismiss = () => {
        this.setState({
            editorOpen: false,
            currentKPI: undefined,
            currentParent: undefined,
            currentItem: undefined,
            currentLeftSibling: undefined,
        });
    }

    private setState(newState: Partial<State>) {
        this.state = {...this.state, ...newState};
        this.callback(this.state);
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
        const components = [
            ...sumOfOtherItems.components.slice(0, idx + 1),
            {weight: 1, itemName: itemNameToInsert},
            ...sumOfOtherItems.components.slice(idx + 1, sumOfOtherItems.components.length),
        ];
        return {
            ...parentItem,
            sumOfOtherItems: {
                ...sumOfOtherItems,
                components
            },
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
        const components = [
            ...productOfOtherItems.components.slice(0, idx + 1),
            {itemName: itemNameToInsert},
            ...productOfOtherItems.components.slice(idx + 1, productOfOtherItems.components.length),
        ];
        return {
            ...parentItem,
            productOfOtherItems: {...productOfOtherItems, components,},
        };
    }

}
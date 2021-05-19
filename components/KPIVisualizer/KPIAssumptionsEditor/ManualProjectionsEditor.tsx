import React from "react";
import {EditorProps} from "./EditorProps";
import {NumberInput} from "../../Common/NumberInput";
import {ManualProjection} from "../../../client";
import {DangerButton} from "../../Common/DangerButton";
import {GhostButton} from "../../Common/GhostButton";
import {Delete, Plus} from "../../Common/Svgs";

export function ManualProjectionsEditor({item, onChange}: EditorProps) {

    function editFiscalYear(oldYear: number, newYear: number) {
        const manualProjections = item.manualProjections?.manualProjections?.map(manualProjection => {
            if (manualProjection.fiscalYear === oldYear) {
                return {...manualProjection, fiscalYear: newYear};
            } else {
                return manualProjection;
            }
        });
        onChange({...item, manualProjections: {manualProjections}});
    }

    function editValue(fiscalYear: number, newValue: number) {
        const manualProjections = item.manualProjections?.manualProjections?.map(manualProjection => {
            if (manualProjection.fiscalYear === fiscalYear) {
                return {...manualProjection, value: newValue};
            } else {
                return manualProjection;
            }
        });
        onChange({...item, manualProjections: {manualProjections}});
    }

    function addManualProjection() {
        const sorted = item
            ?.manualProjections
            ?.manualProjections
            ?.sort((a, b) => a.fiscalYear - b.fiscalYear);
        const latest = sorted?.length > 0 ? sorted[sorted.length - 1] : undefined;

        let manualProjections: ManualProjection[];
        if (!latest) {
            manualProjections = [
                {value: 0, fiscalYear: new Date().getFullYear()},
            ];
        } else {
            manualProjections = [
                ...item.manualProjections?.manualProjections,
                {value: latest.value, fiscalYear: latest.fiscalYear + 1},
            ];
        }
        onChange({...item, manualProjections: {manualProjections}});
    }

    function removeManualProjection(fiscalYear: number) {
        const manualProjections: ManualProjection[] = item?.manualProjections?.manualProjections?.filter(
            it => it.fiscalYear !== fiscalYear
        );
        onChange({...item, manualProjections: {manualProjections}});
    }

    const projectionComponents = item
        ?.manualProjections
        ?.manualProjections
        ?.map(manualProjection => {
            const {fiscalYear, value} = manualProjection;
            return (
                <div key={fiscalYear} className="flex items-center space-x-2">
                    <NumberInput
                        value={fiscalYear}
                        onValueChange={({floatValue}) => editFiscalYear(fiscalYear, floatValue)}
                        decimalScale={0}
                        thousandSeparator={false}
                    />
                    <NumberInput
                        value={value}
                        onValueChange={({floatValue}) => editValue(fiscalYear, floatValue)}
                    />
                    <DangerButton onClick={() => removeManualProjection(fiscalYear)}><Delete/></DangerButton>
                </div>
            );
        });

    return (
        <div>
            <p className="text-sm mb-2">Projections by Year:</p>
            <div className="flex flex-col space-y-2">
                {projectionComponents}
            </div>
            <GhostButton className="mt-2" onClick={addManualProjection}><Plus/></GhostButton>
        </div>
    );
}
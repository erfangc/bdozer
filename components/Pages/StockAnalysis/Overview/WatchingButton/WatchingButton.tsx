import {Star} from "./Star";
import React, {useEffect, useState} from "react";
import {useWatchLists} from "../../../../../api-hooks";
import {useAuth0} from "@auth0/auth0-react";
import {StockAnalysis2} from "../../../../../client";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function WatchingButton({stockAnalysis}: Props) {

    const {isAuthenticated, loginWithRedirect} = useAuth0();
    const watchListApi = useWatchLists();
    const stockAnalysisId = stockAnalysis['_id']

    const [watching, setWatching] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            watchListApi
                .getWatchList()
                .then(({data}) => {
                    if (data.stockAnalysisIds.indexOf(stockAnalysisId) !== -1) {
                        setWatching(true);
                    } else {
                        setWatching(false);
                    }
                });
        }
    }, [isAuthenticated]);

    function watch() {
        watchListApi
            .watch(stockAnalysisId)
            .then(() => setWatching(true));
    }

    function unwatch() {
        watchListApi
            .unwatch(stockAnalysisId)
            .then(() => setWatching(false));
    }

    const buttonProps: ButtonProps = {
        isAuthenticated,
        watching,
        watch,
        unwatch,
        loginWithRedirect,
    };

    return (
        <>
            <Desktop {...buttonProps}/>
            <Mobile {...buttonProps}/>
        </>
    );
}

interface ButtonProps {
    isAuthenticated: boolean
    watching: boolean
    watch: () => void
    unwatch: () => void,
    loginWithRedirect: () => void,
}

function Desktop({isAuthenticated, watching, watch, unwatch, loginWithRedirect}: ButtonProps) {

    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        if (!isAuthenticated) {
            loginWithRedirect();
        } else if (watching) {
            unwatch();
        } else {
            watch();
        }
    }

    return (
        <button
            onClick={onClick}
            className={
                `
                hidden lg:flex space-x-1 rounded-3xl paragraph-medium px-2 
                ${watching ? 'bg-lime-100 text-chili-100 hover:bg-avocado-75 hover:text-lightGreen-25' : 'border-lime-100 border text-lime-100 hover:bg-lime-100 hover:text-chili-100'} 
                 shadow-md py-2 items-center justify-center
                `
            }
        >
            <Star/>
            <span>{watching ? 'Watching' : 'Watch Stock'}</span>
        </button>
    );
}

function Mobile({isAuthenticated, watching, watch, unwatch, loginWithRedirect}: ButtonProps) {

    function onClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        event.stopPropagation();
        if (!isAuthenticated) {
            loginWithRedirect();
        } else if (watching) {
            unwatch();
        } else {
            watch();
        }
    }

    return (
        <button
            onClick={onClick}
            className={`lg:hidden ${watching ? "text-navy-100 bg-lime-100" : "text-lime-100 border border-lime-100"} rounded-full p-2`}
        >
            <Star/>
        </button>
    );
}

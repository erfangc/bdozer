import {Nav} from "../components/Nav";
import React, {useState} from "react";
import {PrimaryButton} from "../components/Common/PrimaryButton";
import {useAuth0} from "@auth0/auth0-react";

export default function RequestAnalysis() {
    return (
        <main className="antialiased relative min-h-screen bg-lightGreen-100">
            <Nav/>
            <div className="container mx-auto text-chili-75 mt-24">
                <h2 className="heading3 mb-8">Your request has been submitted. We will keep in touch</h2>
            </div>
        </main>
    );
}
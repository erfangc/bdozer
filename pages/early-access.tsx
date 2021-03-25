import { UnsecuredApp } from "../components/App";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextInput } from "../components/TextInput";

export default function EarlyAccessPage() {
    return (
        <UnsecuredApp>
            <main className="flex-col flex flex-grow min-h-screen items-center justify-center text-blueGray-200">
                <section className="w-full px-4 xl:px-0 xl:w-2/5">
                    <h1 className="text-2xl lg:text-6xl font-extrabold mb-8 w-full">Request Early Access</h1>
                    <p className="text-blueGray-300 mb-8">
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
                        The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts
                        of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                    </p>
                    <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-1 lg:space-y-0">
                        <TextInput type="email" placeholder="Your Email" className="lg:w-96" />
                        <PrimaryButton>Sign Up</PrimaryButton>
                    </div>
                </section>
            </main>
        </UnsecuredApp>
    )
}
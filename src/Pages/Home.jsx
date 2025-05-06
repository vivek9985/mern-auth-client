import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { ChevronDown } from 'lucide-react';
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import Card from "../Components/Card";

function Home() {
    const { user } = useContext(UserContext);
    const AccordionItem = ({ header, initialEntered, ...rest }) => {
        return (
            <Item
                {...rest}
                initialEntered={initialEntered}  // Proper prop for the library
                header={({ state: { isEnter } }) => (
                    <>
                        <h2 className={`text-base md:text-lg lg:text-xl xl:text-[22px] w-[90%]`}>
                            {header}
                        </h2>
                        <div className={`text-2xl md:text-3xl xl:text-4xl absolute right-5 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out ${isEnter && "rotate-180"}`}>
                            <ChevronDown />
                        </div>
                    </>
                )}
                className=''
                buttonProps={{
                    className: ({ isEnter }) => `relative flex w-full py-3 md:py-2 lg:py-3 xl:py-5 text-left rounded-lg px-6 lg:px-10 mb-4 xl:mb-6 bg-purple-500 cursor-pointer ${isEnter && 'text-gray-300'}`
                }}
                contentProps={{ className: `text-sm lg:text-base xl:text-lg px-6 lg:px-10 transition-height duration-300 ease-out` }}
                panelProps={{ className: "pb-2 lg:pb-6" }}
            />
        );
    };

    return (
        <section>
            <div>
                <h3 className="text-8xl text-center text-white mt-30 leading-[120%] tracking-wide flex flex-col">
                    <span>Hi <strong className="text-purple-500 uppercase">
                        {user ? user?.name : "Developers"}
                    </strong> </span>
                    <span>welcome to Menzo</span>
                </h3>
            </div>

            <div className="w-10/12 mx-auto space-y-4 mt-20">
                <Accordion transition transitionTimeout={300}>
                    <AccordionItem header="Do you offer loan services?" initialEntered={true}>
                        Yes, We offer loans with some of the landing banks in the country like Access Bank, GTB Bank, Werma Bank etc.
                    </AccordionItem>

                    <AccordionItem header="What are capital gains on property purchase?">
                        Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
                        Fusce vulputate purus sed tempus feugiat.
                    </AccordionItem>

                    <AccordionItem header="What kind of properties are listed on your website?">
                        Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
                        Fusce vulputate purus sed tempus feugiat.
                    </AccordionItem>

                    <AccordionItem header="How can I negotiate the price of a property?">
                        Suspendisse massa risus, pretium id interdum in, dictum sit amet ante.
                        Fusce vulputate purus sed tempus feugiat.
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="w-full py-[200px] mt-20 bg-[#1B2316] flex items-center justify-center">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-y-20 xl:gap-y-32 gap-x-5">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </section>
    );
}

export default Home;
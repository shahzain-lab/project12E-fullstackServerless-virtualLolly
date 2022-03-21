import React from "react";
import Lolly from '../components/Lolly'
import { Link } from "gatsby";
import Layout from '../layout/Layout'


const isBrowser = () => typeof window !== "undefined";

const LollyPage = ({ pageContext }: any) => {

    return (
        <Layout>
            <Lolly
                fillLollyTop={pageContext.flavorTop}
                fillLollyMiddle={pageContext.flavorBottom}
                fillLollyBottom={pageContext.flavorMiddle}
            />

            <div>
                <div>
                    <h4>Share this link with your frined</h4>
                    <p>{`${isBrowser() ? location.origin : ""}/lollies/${pageContext.slug
                        }`}</p>
                </div>
                <div>
                    <h1>to: {pageContext.recName}</h1>
                    <p>{pageContext.message}</p>
                    <h3>From: {pageContext.senderName}</h3>
                </div>
                <div>
                    <p>
                        {pageContext.from} made this virtual lollipop for you. You
                        can <Link to="/newLolly"> make your own</Link> to send to a
                        friend who deserve some sugary treat which won't rot their
                        teeth...
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default LollyPage;
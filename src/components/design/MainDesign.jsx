import React from 'react';

const MainDesign = ({ header: Header, content: Content, footer: Footer }) => {
    return (
        <div className="h-screen p-4 m-2 grid grid-rows-[auto,1fr,auto]">
            {/* Header Section */}
            <div>
                <Header />
            </div>
            
            {/* Content Section */}
            <div className="overflow-y-auto">
                <Content />
            </div>
            
            {/* Footer Section */}
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default MainDesign;

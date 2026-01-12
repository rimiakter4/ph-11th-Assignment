import React from 'react';
import Banner from './Banner/Banner';

import Production from '../Production/Production';
import Choose from './WhyChoose/Choose';
import WhatGet from './WhatGet/WhatGet';
import Brands from './Brands';
import Work from './Work/Work';
import LatestProducts from './SomeProduct/LatestProducts';
import NewsLetter from './NewsLetter/NewsLetter';
import LatestBlogs from './LatestBlogs/LatestBlogs';
import FaqSection from './FAsECTION/faqSection';






const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProducts></LatestProducts>
            <Work></Work>
            <NewsLetter></NewsLetter>
             <WhatGet></WhatGet>
             <Brands></Brands>
            
             
            {/* <Production></Production> */}
            
         <Choose></Choose>
         <LatestBlogs></LatestBlogs>
  
        <FaqSection></FaqSection>
        </div>
    );
};

export default Home;
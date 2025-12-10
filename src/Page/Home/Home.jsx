import React from 'react';
import Banner from './Banner/Banner';

import Production from '../Production/Production';
import Choose from './WhyChoose/Choose';
import WhatGet from './WhatGet/WhatGet';
import Brands from './Brands';
import Work from './Work/Work';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Work></Work>
             <WhatGet></WhatGet>
             <Brands></Brands>
            
             
            <Production></Production>
            
         <Choose></Choose>
        
        
        </div>
    );
};

export default Home;
import React from 'react';

const Rank =({entries,name}) =>(
    <>
        <div className="white f3 mb3">
            {`${name}, your current entries is ...`}
        </div>
        <div className="white f1">
            #{entries}
        </div>
    </>
    
);
export default Rank;
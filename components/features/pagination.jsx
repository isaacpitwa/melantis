import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/alink';

function Pagination ( props ) {
    const { perPage, total } = props;
    const router = useRouter();
    const query = useRouter().query;
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ lastPage, setLastPage ] = useState( 1 );
    const [ pageNumbers, setPageNumbers ] = useState( [] );

    useEffect( () => {
        setCurrentPage( query.page ? parseInt( query.page ) : 1 );
    }, [ query ] )

    useEffect( () => {
        setLastPage( parseInt( total / perPage ) + ( total % perPage ? 1 : 0 ) );
    }, [ total, perPage ] )

    useEffect( () => {
        let tempArray = [];
        let pageCount = Math.floor( total / perPage ) + ( 0 < total % perPage ? 1 : 0 );

        for ( let i = -1; i < 2 && pageCount >= 3; i++ ) {
            if ( 1 < currentPage && currentPage < pageCount )
                tempArray.push( currentPage + i );
            if ( 1 === currentPage )
                tempArray.push( currentPage + i + 1 );
            if ( currentPage === pageCount )
                tempArray.push( currentPage + i - 1 );
        }

        for ( let i = 0; i < pageCount && pageCount < 3; i++ ) {
            tempArray.push( i + 1 );
        }

        setPageNumbers( tempArray );
    }, [ total, perPage, currentPage ] )

    return (
        <nav>
            log
        </nav>
    )
}

export default Pagination;
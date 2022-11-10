import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';
import 'react-input-range/lib/css/index.css';

import ALink from '~/components/features/alink';
import { shopData } from '~/utils/data';

function ShopSidebarOne ( props ) {
    const { toggle = false } = props;
    const router = useRouter();
    const query = useRouter().query;
    const [ priceRange, setRange ] = useState( { min: 0, max: 1000 } );

    useEffect( () => {
        if ( query.minPrice && query.maxPrice ) {
            setRange( { min: parseInt( query.minPrice ), max: parseInt( query.maxPrice ) } );
        } else {
            setRange( { min: 0, max: 1000 } );
        }
    }, [ query ] )

    function onChangePriceRange ( value ) {
        setRange( value );
    }

    function containsAttrInUrl ( type, value ) {
        const currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        return currentQueries && currentQueries.includes( value );
    }

    function getUrlForAttrs ( type, value ) {
        let currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        currentQueries = containsAttrInUrl( type, value ) ? currentQueries.filter( item => item !== value ) : [ ...currentQueries, value ];

        return {
            pathname: router.pathname,
            query: {
                ...query,
                page: 1,
                [ type ]: currentQueries.join( ',' )
            }
        }
    }

    function onAttrClick ( e, attr, value ) {
        if ( getUrlForAttrs( attr, value ) ) {
            let queryObject = getUrlForAttrs( attr, value ).query;
            let url = router.pathname.replace( '[type]', query.type ) + '?';
            for ( let key in queryObject ) {
                if ( key !== "type" ) {
                    url += key + '=' + queryObject[ key ] + '&';
                }
            }
            router.push( url );
        }
    }

    return (
        <>
            <aside className={ `${toggle ? 'sidebar-filter' : 'sidebar'} sidebar-shop` }>
                <div className={ toggle ? 'sidebar-filter-wrapper' : '' }>
                    <div className="widget widget-clean">
                        <label>Filters:</label>
                        <ALink href={ { pathname: router.pathname, query: {type: query.type} } } className="sidebar-filter-clear" scroll={ false }>Clean All</ALink>
                    </div>

                   
                    
                </div>
            </aside>
        </>
    );
}

export default React.memo( ShopSidebarOne );
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { GET_PRODUCTS } from '~/server/queries';
import withApollo from '~/server/apollo';
import { safeContent } from '~/utils';

function HeaderSearch () {
    const router = useRouter( "" );
    const [ searchTerm, setSearchTerm ] = useState( "" );
    const [ products, setProducts ] = useState( [] );
    const [ searchProducts, { data } ] = useLazyQuery( GET_PRODUCTS );
    const result = data && data.products.data;
    const [ timer, setTimer ] = useState( null );

    useEffect( () => {
        document.querySelector( "body" ).addEventListener( 'click', closeSearchForm );

        return ( () => {
            document.querySelector( "body" ).removeEventListener( 'click', closeSearchForm );
        } )
    }, [] );

    useEffect( () => {
        if ( result && searchTerm.length > 2 )
            setProducts( result.reduce( ( acc, product ) => {
                let max = 0;
                let min = 999999;
                product.variants.map( item => {
                    if ( min > item.price ) min = item.price;
                    if ( max < item.price ) max = item.price;
                }, [] );

                if ( product.variants.length == 0 ) {
                    min = product.sale_price
                        ? product.sale_price
                        : product.price;
                    max = product.price;
                }

                return [
                    ...acc,
                    {
                        ...product,
                        minPrice: min,
                        maxPrice: max
                    }
                ];
            }, [] ) )
    }, [ result, searchTerm ] )

    useEffect( () => {
        if ( searchTerm.length > 2 ) {
            if ( timer ) clearTimeout( timer );
            let timerId = setTimeout( () => {
                searchProducts( {
                    variables: {
                        searchTerm: searchTerm
                    }
                } );
            }, 500 );
            setTimer( timerId );
        }
    }, [ searchTerm ] );

    useEffect( () => {
        document.querySelector( '.header-search.show-results' ) && document.querySelector( '.header-search.show-results' ).classList.remove( 'show-results' );
    }, [ router.pathname ] );

    function matchEmphasize ( name ) {
        let regExp = new RegExp( searchTerm, "i" );
        return name.replace(
            regExp,
            ( match ) => "<strong>" + match + "</strong>"
        );
    }

    function closeSearchForm ( e ) {
        if ( !e.target.closest( '.header-search' ) ) {
            document
                .querySelector( '.header .header-search' )
                .classList.remove( 'show' );
            document
                .querySelector( '.header .header-search-wrapper' )
                .classList.remove( 'show' );
        }
    }

    function onSearchChange ( e ) {
        setSearchTerm( e.target.value );
    }

    function showSearchForm ( e ) {
        document
            .querySelector( '.header .header-search' )
            .classList.add( 'show' );
    }

    function onSubmitSearchForm ( e ) {
        e.preventDefault();
        router.push( {
            pathname: '/shop/sidebar/list',
            query: {
                searchTerm: searchTerm
            }
        } );
    }

    function goProductPage () {
        setSearchTerm( '' );
        setProducts( [] );
    }

    function searchToggle ( e ) {
        e.preventDefault();
        document.querySelector( '.header-search-wrapper' ).classList.toggle( 'show' );
        e.stopPropagation();
    }

    return (
        <div className="header-search">
            <a href="#" className="search-toggle" onClick={ searchToggle }><i className="icon-search"></i></a>

            <form action="#" method="get" onSubmit={ onSubmitSearchForm } onClick={ showSearchForm }>
                <div className="header-search-wrapper">
                    <label htmlFor="q" className="sr-only" value={ searchTerm } required>Search</label>
                    <input type="text" onChange={ onSearchChange } value={ searchTerm } className="form-control" name="q" placeholder="Search product ..." required />
                    <div className="live-search-list" onClick={ goProductPage }>
                        {
                            searchTerm.length > 2 && products.map( ( product, index ) => (
                                <ALink href={ `/product/default/${product.slug}` } className="autocomplete-suggestion" key={ `search-result-${index}` }>
                                    <LazyLoadImage src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 0 ].url } width={ 40 } height={ 40 } alt="product" />
                                    <div className="search-name" dangerouslySetInnerHTML={ safeContent( matchEmphasize( product.name ) ) }></div>
                                    <span className="search-price">
                                        {
                                            product.stock == 0 ?
                                                <div className=" mb-0">
                                                    <span className="out-price">${ product.price.toFixed( 2 ) }</span>
                                                </div>
                                                :
                                                product.minPrice == product.maxPrice ?
                                                    <div className="product-price mb-0">Ugx{ product.minPrice.toFixed( 2 ) }</div>
                                                    :
                                                    product.variants.length == 0 ?
                                                        <div className="product-price mb-0">
                                                            <span className="new-price">Ugx{ product.minPrice.toFixed( 2 ) }</span>
                                                            <span className="old-price">Ugx{ product.maxPrice.toFixed( 2 ) }</span>
                                                        </div>
                                                        :
                                                        <div className="product-price mb-0">Ugx{ product.minPrice.toFixed( 2 ) }&ndash;Ugx{ product.maxPrice.toFixed( 2 ) }</div>
                                        }
                                    </span>
                                </ALink>
                            ) )
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}

export default withApollo( { ssr: typeof window === 'undefined' } )( HeaderSearch );
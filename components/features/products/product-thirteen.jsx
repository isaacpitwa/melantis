import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

import { actions as cartAction } from '~/store/cart';
import { actions as demoAction } from '~/store/demo';

function ProductThirteen ( props ) {
    const { product } = props;
    const [ maxPrice, setMaxPrice ] = useState( 0 );
    const [ minPrice, setMinPrice ] = useState( 99999 );

    useEffect( () => {
        let min = minPrice;
        let max = maxPrice;
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

        setMinPrice( min );
        setMaxPrice( max );
    }, [] )

    function onCartClick ( e ) {
        e.preventDefault();
        props.addToCart( product );
    }

    return (
        <div className="tooltip">
            <figure className="product-media">
                <ALink href={ `/product/default/${product.slug}` }>
                    <LazyLoadImage
                        alt="product"
                        src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 0 ].url }
                        threshold={ 500 }
                        effect="black and white"
                        wrapperClassName="product-image"
                    />
                    {
                        product.sm_pictures.length >= 2 ?
                            <LazyLoadImage
                                alt="product"
                                src={ process.env.NEXT_PUBLIC_ASSET_URI + product.sm_pictures[ 1 ].url }
                                threshold={ 500 }
                                effect="black and white"
                                wrapperClassName="product-image-hover"
                            />
                            : ""
                    }
                </ALink>
            </figure>

            <div className="product-body">
                <h3 className="product-title">
                    <ALink href={ `/product/default/${product.slug}` }>{ product.name }</ALink>
                </h3>

                {
                    !product.stock || product.stock == 0 ?
                        <div className="product-price">
                            <span className="out-price">Ugx{ product.price.toFixed( 2 ) }</span>
                        </div>
                        :
                        minPrice == maxPrice ?
                            <div className="">Ugx{ minPrice.toFixed( 2 ) }</div>
                            :
                            product.variants.length == 0 ?
                                <div className="product-price">
                                    <span className="old-price">Ugx{ maxPrice.toFixed( 2 ) }</span>
                                    <span className="new-price">Ugx{ minPrice.toFixed( 2 ) }</span>
                                </div>
                                :
                                <div className="product-price">Ugx{ minPrice.toFixed( 2 ) }&ndash;Ugx{ maxPrice.toFixed( 2 ) }</div>
                }

                {
                    product.stock && product.stock !== 0 ?
                        product.variants.length > 0 ?
                            <ALink href={ `/product/default/${product.slug}` } className="btn btn-link btn-link-secondary-dark">
                                <span>Select Options</span>
                            </ALink>
                            :
                            <a href="#" className="btn btn-link btn-link-secondary-dark" onClick={ onCartClick }>
                                <span>Add to cart</span>
                            </a>

                        : ""
                }
            </div>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return {
        wishlist: state.wishlist.data,
        comparelist: state.comparelist.data
    }
}

export default connect( mapStateToProps, { ...cartAction, ...demoAction } )( ProductThirteen );
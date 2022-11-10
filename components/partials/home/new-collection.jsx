// Import Custom Component
import ALink from '~/components/features/alink';
import ProductTwelve from '~/components/features/products/product-twelve';
import OwlCarousel from '~/components/features/owl-carousel';

// Import Utils
import { productSlider } from '~/utils/data';

function NewCollection ( props ) {
    const { products } = props;

    return (
        <section className="product-section new-arrivals mb-8">
            <div className="container text-center">
                <div className="heading heading-center">
                    <h2 className="title pt-5">New Arrivals</h2>
                    <p className="title-desc">More Beauty For You</p>
                </div>

                <div className="product-wrapper">
                    <OwlCarousel options={ { ...productSlider, responsive: { ...productSlider.responsive, 1200: { items: 4 } } } }>
                        {
                            products.length > 0 ?
                                products.slice( 0, 6 ).map( ( item, index ) =>
                                    <ProductTwelve product={ item } key={ "Latest:" + index } />
                                )
                                :
                                new Array( 6 ).fill( 1 ).map( ( item, index ) => (
                                    <div className="skel-pro" key={ "Skeleton" + index }></div>
                                ) )
                        }
                    </OwlCarousel>
                </div>

                <ALink href="/shop/sidebar/list" className="btn btn-link btn-link-primary">VIEW MORE<i className="icon-angle-right"></i></ALink>
            </div>
        </section>
    )
}

export default NewCollection;

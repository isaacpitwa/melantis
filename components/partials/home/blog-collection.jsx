import Reveal from 'react-awesome-reveal';
import ALink from '~/components/features/alink';
import OwlCarousel from '~/components/features/owl-carousel';
import PostFour from '~/components/features/posts/post-four';

import { fadeIn, blogSlider } from '~/utils/data';

function BlogCollection ( props ) {
    const { posts } = props;

    return (
        
        <section className="blog-posts">
            <div className="container">
                <div className="heading text-center">
                    <h2 className="title">New Blog Posts</h2>
                    <p className="title-desc">Donec nec justo eget felis facilisis fermentum.</p>
                </div>

                <OwlCarousel adClass="owl-simple carousel-with-shadow cols-lg-3 cols-sm-2 cols-1" options={ blogSlider }>
                    {
                        posts ?
                            posts.map( ( item, index ) => (
                                <Reveal keyframes={ fadeIn } delay={ 100 } duration={ 1000 } triggerOnce
                                    key={ "Blog" + index }>
                                    <PostFour post={ item } />
                                </Reveal>
                            ) )
                            :
                            [ 0, 1, 2, 3, 4 ].map( ( item, index ) =>
                                <div className="skel-pro" key={ "Skeleton" + index }></div>
                            )
                    }
                </OwlCarousel>
                <div className="more-container text-center mt-2">
                    <ALink href="/blog/classic" className="btn btn-outline-darker btn-more"><span>View more articles</span><i className="icon-long-arrow-right"></i></ALink>
                </div>
            </div>
        </section>
    );
}

export default BlogCollection;
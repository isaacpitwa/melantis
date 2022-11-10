import { useRouter } from 'next/router';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/alink';

function BlogSidebar ( props ) {
    const { categories = [], toggle = false } = props;
    const router = useRouter();
    const query = router.query;

    return (
        <div></div>
    );
}

export default React.memo( BlogSidebar );
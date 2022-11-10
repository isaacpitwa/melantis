module.exports = {
    basePath: process.env.NODE_ENV === 'production' ? `` : '',
    trailingSlash: true,
    env: {
        PUBLIC_URL: process.env.NODE_ENV === 'production' ? `/` : '/',
        APP_URL: process.env.NODE_ENV === 'production' ? 'https://melantis.vercel.app/' : 'http://localhost/'
    }
}
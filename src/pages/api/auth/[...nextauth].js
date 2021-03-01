import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        // OAuth authentication providers...
        Providers.GitHub({
            clientId: 'ecc3c41f15c2ffd2d0b1',
            clientSecret: '8eb0216ef9440e65519c77ef09a804f9a017dcb4'
        }),
    ],
}
console.log('opa', options)
export default (req, res) => NextAuth(req, res, options)
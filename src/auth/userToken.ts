import * as jsonwebtoken from 'jsonwebtoken';

/**
 * @param {string} userId
 *
 * @returns a JWT token from userId
 */
export function sign(userId: string) {
    const timestamp = new Date().getTime();
    return jsonwebtoken.sign(
        {
            sub: userId,
            iat: timestamp,
        },
        String(process.env.JWT_SECRET),
        {
            expiresIn: 86400000, // One day
            issuer: String(process.env.JWT_ISSUER),
        },
    );
}

/**
 * @param {string} token JWT token
 *
 * @returns {boolean} weather token is good or not
 */
export function verify(token: string) {
    return jsonwebtoken.verify(token, String(process.env.JWT_SECRET), {
        issuer: String(process.env.JWT_ISSUER),
    });
}

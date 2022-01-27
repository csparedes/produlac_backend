import jwt from 'jsonwebtoken';

const generarJWT = (uid: string[]) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const key = process.env.SECRETKEYJWT;
        //@ts-ignore
        jwt.sign(payload, key, {
            expiresIn: '12h',
        }, (err, token) => {
            if (err) {
                console.log(`Error JWT: ${err}`);
                reject('No se pudo generar')
            } else {
                resolve(token);
        }
    });
    })
}

export default generarJWT;
import jwt from 'jsonwebtoken';

interface DecodedToken {
  [key: string]: any;
}

function verifyToken(token: string, secretKey: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export default verifyToken;
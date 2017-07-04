import * as express from 'express';

export function getBearerToken(req: express.Request): string {
    const authorizationHeader = req.headers.authorization as string;

    if (!authorizationHeader) {
        return '';
    }

    const parts = authorizationHeader.split(' ');

    if (parts.length < 2) {
        return '';
    }

    return parts[1];
}

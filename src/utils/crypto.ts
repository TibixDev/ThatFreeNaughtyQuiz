import pako from 'pako';
import { fromByteArray, toByteArray } from 'base64-js';

export function compressAndEncode(json) {
    const stringData = JSON.stringify(json);
    const compressedData = pako.deflate(stringData);
    const base64Data = fromByteArray(compressedData);
    return encodeURIComponent(base64Data);
}

export function decodeAndDecompress(encodedData) {
    const base64Data = decodeURIComponent(encodedData);
    const compressedData = toByteArray(base64Data);
    const stringData = pako.inflate(compressedData, { to: 'string' });
    return JSON.parse(stringData);
}
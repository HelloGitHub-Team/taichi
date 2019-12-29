import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const isEmptyObject = (value: object) => Object.keys(value).length === 0;

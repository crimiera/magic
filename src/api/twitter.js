import { apiUrl } from '../common/urls';
import { PERPAGE } from '../common/constants';

export const fetchLatest = ({count = PERPAGE}) => {
    const url  = `${apiUrl}?count=${count}`;
    return  fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }).then((response) => {
        return response.json();
    }).catch(error => {
        return false;
    });
}

export const fetchMore = ({after,count = PERPAGE }) => {
    const url =`${apiUrl}?count=${count}&afterId=${after}`;
    return  fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }).then((response) => {
        return response.json();
    }).catch(error => {
        return false;
    });
}
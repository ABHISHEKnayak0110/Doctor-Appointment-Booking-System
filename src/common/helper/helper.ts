export const isEmpty = (value) => {
    if (value == null) {
        return true;
    }
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return Object.keys(value).length === 0;
        }
    }

    if (typeof value === 'string') {

        return value.trim().length === 0;
    }

    if (typeof value === 'number') {

        return value === 0;
    }


    return false;
}



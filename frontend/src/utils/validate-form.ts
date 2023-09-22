import Studio from '../types/studios';
import { flattenObject } from './flatten-object';

export const validateForm = (newStudio: Studio) => {
    const flattenedStudioObj = flattenObject(newStudio);
    const emptyFieldsArr: string[] = [];

    delete flattenedStudioObj.phone_number;
    delete flattenedStudioObj.instagram;
    delete flattenedStudioObj.facebook;

    const nsKeys = Object.keys(flattenedStudioObj);
    const nsValues = Object.values(flattenedStudioObj);

    nsValues.forEach((val: any, i) => {
        val.length === 0 && emptyFieldsArr.push(nsKeys[i]);
    });

    if (emptyFieldsArr.length > 0) {
        const fields = emptyFieldsArr.join(', ');
        throw new Error(`The following fields are empty: ${fields}`);
    } else {
        console.log('form validated');
    }
};

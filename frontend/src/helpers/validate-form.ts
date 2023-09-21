import Studio from '../types/studios';
import { flattenObject } from './flatten-object';

export const validateForm = (newStudio: Studio) => {
    return new Promise<void>((resolve, reject) => {
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
            reject(new Error(`The following fields are empty: ${fields}`)); // Reject the promise if validation fails
        } else {
            resolve();
        }
    });
};

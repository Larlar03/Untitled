export const flattenObject = (initialObj: object) => {
    // https://stackoverflow.com/questions/33036487/one-liner-to-flatten-nested-object
    const flatObj = Object.assign(
        {},
        ...(function _flatten(o: any): any {
            return [].concat(...Object.keys(o).map((k) => (typeof o[k] === 'object' ? _flatten(o[k]) : { [k]: o[k] })));
        })(initialObj)
    );

    return flatObj;
};

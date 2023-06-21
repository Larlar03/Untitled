export const mockHandleOptionClick = (mockselections: string[], mockOptions: string[]): void => {
    const selection: any = mockselections;
    if (mockOptions.includes(selection)) {
        mockOptions.filter((option: string) => option !== selection);
    } else {
        mockOptions.push(selection);
    }
};

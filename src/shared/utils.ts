type option = {
    value: string;
    label: string
}

export function createDictionary(values: option[]): { [key: string]: option } {
    const options = values.reduce((acc: Record<string, any>, option: option) => {
        acc[option.value] = option;
        return acc;
    }, {})
    return options;
}
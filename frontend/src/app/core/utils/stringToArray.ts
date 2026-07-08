export function stringToArray(tags: string | string[] | null | undefined): string[] {
    if (Array.isArray(tags)) {
        return tags;
    }

    if (typeof tags === 'string' && tags.trim() !== '') {
        return tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== '');
    }

    return [];
}
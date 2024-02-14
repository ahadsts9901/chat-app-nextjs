export const toPusherKey = (key: string) => {
    return key.replace(/:/g, '__')
}
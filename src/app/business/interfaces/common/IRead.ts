interface IRead<T> {
    getList: (page: number, limit: number) => Promise<T[]>;
    getCount: () => Promise<number>;
    get: (_id: string) => Promise<T | null>;
}

export default IRead;

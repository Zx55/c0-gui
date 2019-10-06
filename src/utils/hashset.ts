import HashMap from 'hashmap';


export default class HashSet<T> {
    private _map: HashMap<T, boolean>;

    public constructor() {
        this._map = new HashMap();
    }

    public has(key: T): boolean {
        return this._map.has(key);
    }

    public put(key: T): HashSet<T> {
        this._map.set(key, true);
        return this;
    }

    public delete(key: T): HashSet<T> {
        this._map.delete(key);
        return this;
    }

    public size(): Number {
        return this._map.count();
    }

    public keys(): Array<T> {
        return this._map.keys();
    }

    public clear(): HashSet<T> {
        this._map.clear();
        return this;
    }

    public forEach(callback: (key: T) => void): void {
        for (const k of this.keys()) {
            callback(k);
        }
    }

    [Symbol.iterator] = () => {
        const keys = this.keys();
        let i = 0;

        return {
            next: () => {
                if (i < this.size()) {
                    return {
                        value: keys[i++],
                        done: false,
                    };
                } else {
                    return {
                        value: null,
                        done: true,
                    };
                }
            },
        };
    }
};

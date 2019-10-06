/// <reference types="@types/jest" />

import HashSet from '../src/utils/hashset';


describe('hashset: ', () => {
    const s = new HashSet<string>();

    test('put string: \'hello\' in hashset', () => {
        s.put('hello');
        expect(s).toContain('hello');
    });

    test('contains string: \'hello\'', () => {
        expect(s.has('hello')).toBeTruthy();
    });

    test('does not contain string: \'world\'', () => {
        expect(s.has('world')).toBeFalsy();
    });

    test('now has three items after putting \'world\' and \'Typescript\'', () => {
        s.put('world').put('Typescript');
        expect(s.keys()).toEqual(['hello', 'world', 'Typescript']);
    });

    test('delete string: \'world\'', () => {
        s.delete('world');
        expect(s).not.toContain('world');
    });

    test('iteration', () => {
        let keys = Array<string>();
        for (const k of s) {
            keys.push(k);
        }
        expect(keys).toEqual(['hello', 'Typescript']);
    });

    test('clear', () => {
        s.clear();
        expect(s.size()).toBe(0);
    });
});

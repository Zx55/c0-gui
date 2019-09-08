/// <reference types="@types/jest" />
import sum from './sum';


test('add', () => expect(sum(1, 2)).toBe(3));

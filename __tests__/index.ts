import { test, expect, beforeEach, afterEach } from '@jest/globals'
import lazySingleton from '../src/index';

class TestClass {
  constructor(public greeting: string) {
  } 

  sayHello() {
    return 'hello:' + this.greeting;
  }
}

let TestSingletone: any;

beforeEach(() => {
  TestSingletone = lazySingleton(TestClass);
});

afterEach(() => {
  TestSingletone = null;
});

test('Signleton has init method', () => {
  expect(TestSingletone.init).not.toBeUndefined();
  expect(typeof TestSingletone.init).toBe('function');
});

test('Signleton#init returns class instance', () => {
  const instance = TestSingletone.init();
  expect(instance instanceof TestClass).toBeTruthy();
});

test('Signleton#init returns the same instance after second call', () => {
  const instance1 = TestSingletone.init();
  const instance2 = TestSingletone.init();
  expect(instance1 === instance2).toBeTruthy();
});

test('Sigleton cannot be used before initialization', () => {
  expect(() => TestSingletone.sayHello()).toThrow(/not initialized/);
});


test('Sigleton works good after initialization', () => {
  const instance = TestSingletone.init('test');

  expect(instance.greeting).toBe('test');
  expect(TestSingletone.greeting).toBe('test');
  expect(instance.sayHello()).toBe('hello:test');
  expect(TestSingletone.sayHello()).toBe('hello:test');
});
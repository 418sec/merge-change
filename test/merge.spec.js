const mc = require('../index.js');

describe('merge', () => {

  test('custom merge array', () => {
    mc.addons.mergeArrayArray = function(first, second){
      return [...first]
    };
    const obj1 = {a: 1, b: [1,2,3]};
    const obj2 = {a: 2, b: [3,4,5], c: 3};
    const result = mc.merge(obj1, obj2);
    expect(result).toEqual({a:2, b: [1,2,3], c: 3});
  });

  test('default', () => {
    delete mc.addons.mergeArrayArray;
    const obj1 = {
      'a': 10,
      'b': {
        c: 1,
        d: [1, 2, 3],
        e: [{m: 1}, {m: 2}],
        i: [{_id: 1, _type: 'user'}, {_id: 2, _type: 'news'}]
      }
    };
    const obj2 = {
      'a': 2,
      'b': {
        d: [3, 4, 5],
        e: [{m: 2}, {m: 3}],
        i: [{_id: 1, prop: 'v1'}, {_id: 3, _type: 'news', prop: 'v2'}]
      },
      'n': 3
    };
    const result = mc.merge(obj1, obj2);

    expect(result).toEqual({
      'a': 2,
      'b': {
        c: 1,
        d: [/*1,2,*/3, 4, 5],
        e: [/*{m:1}, {m:2},*/ {m: 2}, {m: 3}],
        i: [{_id: 1, /*_type: 'user',*/ prop: 'v1'}, /*{_id: 2, _type: 'news'}, */{
          _id: 3,
          _type: 'news',
          prop: 'v2'
        }]
      },
      'n': 3
    });
  });

  test('not object with object', () => {
    const obj1 = null;
    const obj2 = {a: 1};
    const result = mc.merge(obj1, obj2);
    expect(result).toEqual({a:1});
  });


});

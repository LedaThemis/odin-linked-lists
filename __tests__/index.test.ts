import { LinkedList } from '..';

test('should be initiated with null', () => {
  const list = LinkedList();
  expect(list.toString()).toBe('( null ) -> null');
});

test('should be initiated with data if provided', () => {
  const list = LinkedList('A');
  expect(list.toString()).toBe('( A ) -> null');
});

test('should be append data', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.toString()).toBe('( A ) -> ( B ) -> null');
});

test('should be prepend data', () => {
  const list = LinkedList('B');

  list.prepend('A');

  expect(list.toString()).toBe('( A ) -> ( B ) -> null');
});

test('should be have correct size', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.size).toBe(2);
});

test('should be have correct head', () => {
  const list = LinkedList('A');

  const headValue = 'NEW HEAD';

  list.prepend(headValue);

  expect(list.head?.value).toBe(headValue);
});

test('should be have correct tail', () => {
  const list = LinkedList('A');

  const tailValue = 'NEW TAIL';

  list.append(tailValue);

  expect(list.tail?.value).toBe(tailValue);
});

test('should give correct node at index', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.at(1)?.value).toBe('B');
});

test('should pop tail', () => {
  const list = LinkedList('A');

  list.append('B');
  list.pop();

  expect(list.tail?.value).toBe('A');
});

test('should return true if value exists', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.contains('B')).toBe(true);
});

test('should return false if value does not exist', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.contains('C')).toBe(false);
});

test('should return index if value is found', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.find('B')).toBe(1);
});

test('should return null if value is not found', () => {
  const list = LinkedList('A');

  list.append('B');

  expect(list.find('C')).toBe(null);
});

test('should return string representation of list', () => {
  const list = LinkedList('A');

  list.append('B');
  list.append('C');

  expect(list.toString()).toBe('( A ) -> ( B ) -> ( C ) -> null');
});

test('should insert node at index', () => {
  const list = LinkedList('A');

  list.insertAt(1, 'B');

  expect(list.tail?.value).toBe('B');
});

test('should throw error on insert if index is out of list', () => {
  const list = LinkedList('A');

  try {
    list.insertAt(2, 'B');
  } catch (e) {
    expect(e as Error).toMatchObject({
      message: 'Index outside of list',
    });
  }
});

test('should remove node at index', () => {
  const list = LinkedList('A');

  list.append('B');

  list.removeAt(1);

  expect(list.tail?.value).toBe('A');
});

test('should throw error on remove if index is out of list', () => {
  const list = LinkedList('A');

  try {
    list.removeAt(1);
  } catch (e) {
    expect(e as Error).toMatchObject({
      message: 'Index outside of list',
    });
  }
});

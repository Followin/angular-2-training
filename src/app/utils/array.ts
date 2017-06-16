interface Selector<TInput, TOutput> {
  (input: TInput): TOutput;
}

class Grouping<T, TKey> {
  public items: T[];
  public key: TKey;
}

export function groupBy<T, TKey>(items: T[], selector: Selector<T, TKey>): Grouping<T, TKey>[] {
  return items.reduce((result, item) => {
    const key = selector(item);
    const grouping = result.find(group => group.key === key);
    if (grouping) {
      grouping.items.push(item);
    } else {
      result.push({ items: [ item ], key });
    }

    return result;
  }, []);
}

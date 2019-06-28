# Data flow

## Interaction with redux

```
TODO
```

## Retrieving a resource from a the current state

```
      +---------+
      |  start  |
      +----+----+
           |
           |
     +-----v--------+
     | get resource |
     +-----+--------+
           |
           |
           v                                +-----------------+
       IS IN STORE? +--------->IS CACHED?+->+ get initialised |
           +                         +      +------------+----+
           |                         |                   |
           v                         v                   |
+----------+--------------+   +------+-----+             |
| get structured resource |   | get cached |             |
+----------+--------------+   +------+-----+             |
           |                         |                   |
           |                         |                   |
           |                         |                   |
           v                         |                   |
      +----+--+                      |                   |
      |  end  +<---------------------v-------------------+
      +-------+

```

---

[back](../README.md)

[asciiflow](http://asciiflow.com/)

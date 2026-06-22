CREATE TABLE IF NOT EXISTS products(
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  price       INTEGER NOT NULL,
  image       TEXT NOT NULL,
  category    TEXT NOT NULL,
  stock       INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items(
    product_id  TEXT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    quantity    INTEGER NOT NULL
);
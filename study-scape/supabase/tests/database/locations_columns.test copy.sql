begin;
select plan(4);

SELECT has_column(
    'public',
    'locations',
    'name',
    'name column should exist'
);

SELECT has_column(
    'public',
    'locations',
    'address',
    'address column should exist'
);

SELECT has_column(
    'public',
    'locations',
    'avgRating',
    'avgRating column should exist'
);

SELECT has_column(
    'public',
    'locations',
    'soundLevel',
    'soundLevel column should exist'
);

select * from finish();
rollback;

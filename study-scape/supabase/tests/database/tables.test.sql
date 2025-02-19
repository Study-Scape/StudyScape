begin;
select plan(3);

SELECT has_table(
    'public',
    'locations',
    'locations table should exist'
);

SELECT has_table(
    'public',
    'reviews',
    'reviews table should exist'
);

SELECT has_table(
    'public',
    'users',
    'users table should exist'
);

select * from finish();
rollback;

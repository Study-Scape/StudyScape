begin;
select plan(5);

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

SELECT has_column(
    'public',
    'locations',
    'imagine',
    'imagine column shouldnt exist'
);

select * from finish();
rollback;

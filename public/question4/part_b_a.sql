use bookazon;

# source Bookazon.sql;

# Who is the best-selling author in each of the last 5 years, by unit volume (the number of books sold),

select  a1.name, a1.yr, a1.totalAuthorUnits as units
From salesByAuthor a1
join (
select yr, max(totalAuthorUnits) as units
    from salesByAuthor
    where yr >= (YEAR(CURDATE()) -5)
    group by yr
) as a2
on a1.yr = a2.yr and a1.totalAuthorUnits = a2.units
order by yr DESC
;

select  a1.name, a1.yr, a1.totalAuthorSales as sales
From salesByAuthor a1
join (
select yr, max(totalAuthorSales) as sales
    from salesByAuthor
    where yr >= (YEAR(CURDATE()) -5)
    group by yr
) as a2
on a1.yr = a2.yr and a1.totalAuthorSales = a2.sales
order by yr DESC
;


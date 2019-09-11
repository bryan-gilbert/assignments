# use bookazon;
# source Bookazon.sql;
# c.	What city and region (state or province) had the largest sales and unit growth over the past 5 years?

SELECT City, sum(total) as grandTotal from customersOrders as c2 where yr >= (YEAR(CURDATE()) -5) group by City order by grandTotal desc limit 1;

SELECT State, sum(total) as grandTotal from customersOrders as c2 where yr >= (YEAR(CURDATE()) -5) group by State order by grandTotal desc limit 1;

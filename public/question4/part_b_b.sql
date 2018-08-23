# use bookazon;
# source Bookazon.sql;
# b.	Who is the best-selling author in each of the last 5 years, by unit volume (the number of books sold),
# and by sales volume (the total value of their sales) in the category Fiction > Thrillers > Spy Novels

SET @cat = 'Fiction > Thrillers > Spy Novels';
#SET @cat = 'Fiction';

select bookTitle, b1.category, b1.Author, format, b1.yr, b2.sales From bookssold b1
join (
    select yr, b2.Author, max(totalSales) as sales from bookssold b2
    where yr >= (YEAR(CURDATE()) -5) && category = @cat  group by yr, Author
) as b2
on b1.yr = b2.yr and b1.totalSales = b2.sales and b1.Author = b2.Author order by b1.yr DESC;

select bookTitle, b1.category, b1.Author, format, b1.yr, b2.units From bookssold b1
join (
    select yr, b2.Author, max(totalUnits) as units from bookssold b2
    where yr >= (YEAR(CURDATE()) -5) && category = @cat  group by yr, Author
) as b2
on b1.yr = b2.yr and b1.totalUnits = b2.units and b1.Author = b2.Author order by b1.yr DESC;
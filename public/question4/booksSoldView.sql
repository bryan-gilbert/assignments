DROP VIEW IF EXISTS  `bookazon`.`booksSold` ;
CREATE VIEW `booksSold` AS
select title as bookTitle, cat.category, auth.Name as Author, format, b2.yr, b2.totalSales,  b2.totalUnits from books AS b1
INNER JOIN ( SELECT c.id, c.category from Categories c) as cat ON b1.category = cat.id
INNER JOIN ( SELECT a.id, a.Name from Authors a ) as auth ON auth.id = b1.authorId
INNER JOIN ( SELECT bookId, yr, totalSales, totalUnits from booksSoldByYear b2 ) as b2 ON b1.id = b2.bookId
;
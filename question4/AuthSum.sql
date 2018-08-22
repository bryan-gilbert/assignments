use bookazon;

SELECT a.Name, d.total 
FROM Authors a 
INNER JOIN ( 
Select b.id as bookId, b.authorId, b.title, c.total FROM Books b 
Inner Join ( 
	select bookId,  Format(sum(cost * quantity),2) as total
	FROM LineItems as item 
	Group By item.bookid
	Order By Sum(cost * quantity) desc
) c ON c.bookId = b.id
) d
ON d.authorId = a.id





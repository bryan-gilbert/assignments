use bookazon;

SELECT author.name, sales.totalUnitsByAuthor, sales.totalSalesByAuthor
FROM Authors author
INNER JOIN 
(

	SELECT b.authorId, 
			sum(c.qty) as totalUnitsByAuthor,
			sum(c.totalSales) as totalSalesByAuthor
	FROM Books b
	INNER JOIN (
		SELECT 
			bookId, 
			SUM(quantity) as qty,
			SUM(quantity * cost) as totalSales
		FROM LineItems    
        GROUP BY bookId
	) c ON b.id = c.bookId 
    		GROUP BY b.authorId
        ORDER BY sum(c.qty), sum(c.totalSales)  
    
    
) sales ON sales.authorId = author.id
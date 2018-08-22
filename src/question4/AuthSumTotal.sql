use bookazon;

SELECT authors.Name, sum(bookSales.total) as totalBookSales
FROM Books bookAuthor 
INNER JOIN Authors authors on authors.id = bookAuthor.authorId
INNER JOIN (

SELECT book.id bookId, Format(sum(book.price * cmb.cnt),2) as total FROM Books book 
INNER JOIN ( 
	select bookId, sum(quantity) as cnt
	FROM LineItems as item 
	Group By item.bookid
    Order By sum(item.quantity) desc
) cmb ON cmb.bookId = book.id
GROUP BY book.id
Order By sum(book.price * cmb.cnt) desc

) as bookSales
ON bookSales.bookId = bookAuthor.id
Group By bookAuthor.authorId
Order By sum(bookSales.total) desc

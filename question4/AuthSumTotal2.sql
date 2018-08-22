
SELECT
    authors.Name, SUM(bookSales.totalBookUnits) AS totalAuthorUnits,  SUM(bookSales.totalBookSales) AS totalAuthorSales,  bookSales.yr
FROM  Books bookAuthor
INNER JOIN  Authors authors
ON authors.id = bookAuthor.authorId
INNER JOIN (
    SELECT
        book.id bookId, FORMAT(SUM(cmb.totalUnits), 2) AS totalBookUnits, FORMAT(SUM(cmb.totalSales), 2) AS totalBookSales, yr
    FROM Books book
    INNER JOIN (
        SELECT bookId, yr, SUM(quantity * cost) AS totalSales, SUM(quantity ) AS totalUnits
		FROM  LineItems item
        INNER JOIN
		(
			SELECT id, custId, YEAR(STR_TO_DATE(date, '%Y-%m-%d')) AS yr
			FROM Orders
        ) orders
        ON orders.id = item.orderId
		GROUP BY bookId, yr
		ORDER BY SUM(quantity * cost), SUM(quantity)


	) AS cmb
    ON cmb.bookId = book.id
    GROUP BY book.id, yr
    ORDER BY SUM(book.price * cmb.totalUnits) DESC

) AS bookSales
ON bookSales.bookId = bookAuthor.id
GROUP BY bookAuthor.authorId, bookSales.yr
ORDER BY SUM(bookSales.totalBookUnits) DESC
